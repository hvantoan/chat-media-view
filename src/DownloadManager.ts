/**
 * Download progress information
 */
export interface DownloadProgress {
  /** Bytes loaded so far */
  loaded: number
  /** Total bytes (0 if unknown) */
  total: number
  /** Percentage complete (0-100) */
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

/**
 * Options for download with progress
 */
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

/**
 * Result of download operation
 */
export interface DownloadResult {
  blob: Blob
  /** True if succeeded after retry */
  retried: boolean
  /** Number of attempts made */
  attempts: number
}

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
    }, { once: true })
  })
}

/**
 * Download file with progress tracking, abort support, and retry logic
 * Falls back to regular blob() if Content-Length missing or no stream support
 */
export async function downloadWithProgress(
  url: string,
  optionsOrCallback?: DownloadOptions | ProgressCallback
): Promise<DownloadResult> {
  // Support legacy signature: (url, onProgress?)
  const options: DownloadOptions = typeof optionsOrCallback === 'function'
    ? { onProgress: optionsOrCallback }
    : optionsOrCallback ?? {}

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

      // Combine all chunks into a single Uint8Array
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

/**
 * Create object URL from downloaded blob and revoke on cleanup
 */
export function createImageUrl(blob: Blob): string {
  return URL.createObjectURL(blob)
}

/**
 * Revoke object URL to free memory
 */
export function revokeImageUrl(url: string): void {
  URL.revokeObjectURL(url)
}
