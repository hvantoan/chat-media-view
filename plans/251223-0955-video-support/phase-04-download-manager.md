# Phase 4: Enhanced Download Manager

## Context

- [Plan Overview](./plan.md)
- [Research: Download Patterns](./research/researcher-02-download-patterns.md)
- Current: [DownloadManager.ts](../../src/DownloadManager.ts)

## Overview

Enhance DownloadManager with AbortController for cancellation and exponential backoff retry. Applies to both image and video downloads.

## Key Insights

1. **AbortController**: Native API for fetch cancellation, signal per request
2. **AbortError**: Distinct from network errors, check `error.name === 'AbortError'`
3. **Retry only transient**: 5xx, 429, network errors; NOT 4xx
4. **Exponential backoff**: 1s, 2s, 4s with jitter, cap at 10s
5. **Memory safety**: Revoke blob URLs on cancel/unmount
6. **Progress UI**: Overlay indicator showing percentage + MB/MB format (e.g., "45% • 2.3 MB / 5.1 MB")

## Requirements

- US-04: Download with progress, cancel, and retry for images AND videos

## Architecture

```typescript
interface DownloadOptions {
  signal?: AbortSignal
  onProgress?: ProgressCallback
  maxRetries?: number
}

// Enhanced download function
downloadWithProgress(url, options) → Promise<Blob>
  ├── Creates internal AbortController if signal not provided
  ├── Fetches with signal
  ├── Tracks progress via ReadableStream
  ├── On failure: retry with exponential backoff
  └── On abort: throws AbortError

// Hook state
useDownload() → {
  download, cancel, retry, progress, status, error
}
```

## Related Files

| File | Action |
|------|--------|
| `src/DownloadManager.ts` | Update - add abort/retry support |
| `src/hooks/useDownload.ts` | Update - add cancel/retry methods |
| `src/DownloadManager.test.ts` | Update - test cancel/retry |

## Implementation Steps

### Step 1: Update DownloadManager types

```typescript
// src/DownloadManager.ts

export interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

export interface DownloadOptions {
  /** AbortSignal for cancellation */
  signal?: AbortSignal
  /** Progress callback */
  onProgress?: ProgressCallback
  /** Max retry attempts (default: 3) */
  maxRetries?: number
  /** Base delay for exponential backoff in ms (default: 1000) */
  baseDelay?: number
  /** Max delay cap in ms (default: 10000) */
  maxDelay?: number
}

export interface DownloadResult {
  blob: Blob
  /** True if succeeded after retry */
  retried: boolean
  /** Number of attempts made */
  attempts: number
}
```

### Step 2: Add retry utility

```typescript
// src/DownloadManager.ts

/** Check if error is retryable */
function isRetryableError(error: unknown, response?: Response): boolean {
  // Network errors are retryable
  if (error instanceof TypeError) return true

  // Check response status
  if (response) {
    const status = response.status
    // Retry 5xx and 429 (rate limit)
    return status >= 500 || status === 429
  }

  return false
}

/** Calculate delay with jitter */
function getRetryDelay(
  attempt: number,
  baseDelay: number,
  maxDelay: number
): number {
  const exponentialDelay = baseDelay * Math.pow(2, attempt)
  const jitter = Math.random() * 1000
  return Math.min(exponentialDelay + jitter, maxDelay)
}

/** Wait for delay, respecting abort signal */
async function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}
```

### Step 3: Update downloadWithProgress

```typescript
// src/DownloadManager.ts

export async function downloadWithProgress(
  url: string,
  options: DownloadOptions = {}
): Promise<DownloadResult> {
  const {
    signal,
    onProgress,
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000
  } = options

  let lastError: Error | null = null
  let attempts = 0

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    attempts = attempt + 1

    // Check if aborted before attempt
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError')
    }

    try {
      const response = await fetch(url, { signal })

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`)
        if (isRetryableError(error, response) && attempt < maxRetries) {
          lastError = error
          const delay = getRetryDelay(attempt, baseDelay, maxDelay)
          await wait(delay, signal)
          continue
        }
        throw error
      }

      const contentLength = response.headers.get('Content-Length')
      const total = contentLength ? parseInt(contentLength, 10) : 0

      // Fallback if no Content-Length or no ReadableStream
      if (!total || !response.body) {
        const blob = await response.blob()
        return { blob, retried: attempt > 0, attempts }
      }

      // Stream with progress
      const reader = response.body.getReader()
      const chunks: Uint8Array[] = []
      let loaded = 0

      while (true) {
        // Check abort during streaming
        if (signal?.aborted) {
          reader.cancel()
          throw new DOMException('Aborted', 'AbortError')
        }

        const { done, value } = await reader.read()
        if (done) break

        chunks.push(value)
        loaded += value.length

        onProgress?.({
          loaded,
          total,
          percentage: Math.round((loaded / total) * 100)
        })
      }

      // Combine chunks
      const combined = new Uint8Array(loaded)
      let offset = 0
      for (const chunk of chunks) {
        combined.set(chunk, offset)
        offset += chunk.length
      }

      const blob = new Blob([combined], {
        type: response.headers.get('Content-Type') || 'application/octet-stream'
      })

      return { blob, retried: attempt > 0, attempts }

    } catch (error) {
      // Don't retry abort errors
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }

      // Check if retryable
      if (isRetryableError(error, undefined) && attempt < maxRetries) {
        lastError = error instanceof Error ? error : new Error(String(error))
        const delay = getRetryDelay(attempt, baseDelay, maxDelay)
        await wait(delay, signal)
        continue
      }

      throw error
    }
  }

  // Should not reach here, but handle just in case
  throw lastError || new Error('Download failed')
}
```

### Step 4: Update useDownload hook

```typescript
// src/hooks/useDownload.ts
import { useState, useCallback, useRef, useEffect } from 'react'
import {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  DownloadProgress,
  DownloadOptions
} from '../DownloadManager'

export type DownloadStatus = 'idle' | 'downloading' | 'completed' | 'cancelled' | 'error'

export interface UseDownloadResult {
  /** Start download and return object URL */
  download: (url: string, options?: Omit<DownloadOptions, 'signal' | 'onProgress'>) => Promise<string>
  /** Cancel current download */
  cancel: () => void
  /** Retry last failed download */
  retry: () => Promise<string | null>
  /** Current download progress */
  progress: DownloadProgress | null
  /** Download status */
  status: DownloadStatus
  /** Error if download failed */
  error: Error | null
  /** Reset state */
  reset: () => void
}

export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [status, setStatus] = useState<DownloadStatus>('idle')
  const [error, setError] = useState<Error | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const lastUrlRef = useRef<string | null>(null)
  const lastOptionsRef = useRef<Omit<DownloadOptions, 'signal' | 'onProgress'> | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
      if (objectUrlRef.current) {
        revokeImageUrl(objectUrlRef.current)
      }
    }
  }, [])

  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    if (objectUrlRef.current) {
      revokeImageUrl(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setProgress(null)
    setStatus('idle')
    setError(null)
    lastUrlRef.current = null
    lastOptionsRef.current = null
  }, [])

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort()
    setStatus('cancelled')
    setProgress(null)
  }, [])

  const download = useCallback(async (
    url: string,
    options?: Omit<DownloadOptions, 'signal' | 'onProgress'>
  ): Promise<string> => {
    // Cancel any existing download
    abortControllerRef.current?.abort()

    // Revoke previous object URL
    if (objectUrlRef.current) {
      revokeImageUrl(objectUrlRef.current)
      objectUrlRef.current = null
    }

    // Store for retry
    lastUrlRef.current = url
    lastOptionsRef.current = options ?? null

    // Create new abort controller
    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus('downloading')
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const result = await downloadWithProgress(url, {
        ...options,
        signal: controller.signal,
        onProgress: setProgress
      })

      const objectUrl = createImageUrl(result.blob)
      objectUrlRef.current = objectUrl
      setStatus('completed')
      return objectUrl

    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setStatus('cancelled')
        throw e
      }

      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      setStatus('error')
      throw err
    }
  }, [])

  const retry = useCallback(async (): Promise<string | null> => {
    if (!lastUrlRef.current) return null
    return download(lastUrlRef.current, lastOptionsRef.current ?? undefined)
  }, [download])

  return {
    download,
    cancel,
    retry,
    progress,
    status,
    error,
    reset
  }
}
```

### Step 5: Backwards compatibility wrapper

```typescript
// At end of DownloadManager.ts - deprecated wrapper

/**
 * @deprecated Use downloadWithProgress with options object instead
 */
export async function downloadWithProgressLegacy(
  url: string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const result = await downloadWithProgress(url, { onProgress })
  return result.blob
}
```

## Todo List

- [ ] Add DownloadOptions interface
- [ ] Add DownloadResult interface with retry info
- [ ] Implement isRetryableError helper
- [ ] Implement getRetryDelay with jitter
- [ ] Implement wait with abort support
- [ ] Update downloadWithProgress with retry loop
- [ ] Update useDownload with cancel/retry/status
- [ ] Add backwards compat wrapper
- [ ] Update DownloadManager.test.ts
- [ ] Update useDownload.test.ts
- [ ] Update index.ts exports

## Success Criteria

- [ ] Download can be cancelled mid-progress
- [ ] AbortError thrown on cancel (distinct from network error)
- [ ] Retry works for 5xx and network errors
- [ ] No retry for 4xx errors
- [ ] Exponential backoff with jitter observed
- [ ] Object URLs revoked on cancel
- [ ] Existing code works (backwards compat)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking existing download calls | Backwards compat wrapper, options are optional |
| Memory leak on abort | Revoke blob URL in cancel, cleanup on unmount |
| Infinite retry loop | Cap maxRetries=3 by default |
| Retry delays too long | Cap maxDelay=10s, add jitter |

## Security Considerations

- AbortController is native, no security concerns
- Same CORS rules apply for fetch

## Next Steps

After completion:
1. Proceed to [Phase 5: Lightbox Video](./phase-05-lightbox-video.md)
2. Apply download enhancements to lightbox
