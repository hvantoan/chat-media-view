# Phase 4: Enhanced UX

**Status:** Done (251222)
**Estimated Effort:** 4-5 hours
**Dependencies:** Phase 3 complete

## Context

- [Main Plan](./plan.md)
- [Phase 3: Core Components](./phase-03-core-components.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Add BlurHash/ThumbHash placeholder rendering, download progress tracking via ReadableStream, improved loading states, and smooth fade-in animations. Enhances perceived performance.

## Key Insights

- ThumbHash preferred over BlurHash (better color reproduction, smaller)
- ReadableStream API for download progress (fetch streaming)
- Canvas-based placeholder rendering (small bundle)
- CSS opacity transitions for smooth reveal

## Requirements

1. BlurHashCanvas renders placeholder from hash string
2. ThumbHash support (decode + render)
3. DownloadManager tracks progress via ReadableStream
4. Loading state shows placeholder until image ready
5. Smooth fade from placeholder to image
6. Error state with retry capability

## Architecture

```
src/
├── BlurHashCanvas.tsx      # BlurHash/ThumbHash renderer
├── DownloadManager.ts      # Fetch + progress tracking
├── hooks/
│   ├── useImageLoad.ts     # Combined load + placeholder
│   └── useDownload.ts      # Download with progress
└── ImageCell.tsx           # Updated with placeholder
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/BlurHashCanvas.tsx` | Canvas placeholder |
| `src/DownloadManager.ts` | Progress tracking |
| `src/hooks/useImageLoad.ts` | Image loading logic |
| `src/hooks/useDownload.ts` | Download hook |
| `src/ImageCell.tsx` | Integrate placeholders |

## Implementation Steps

### Step 1: ThumbHash Decoder

ThumbHash is preferred - smaller payload, better colors. Decode from base64 to RGBA pixels.

```typescript
// src/thumbhash.ts
// Minimal ThumbHash decoder (~1KB)
export function thumbHashToRGBA(hash: Uint8Array): {
  w: number
  h: number
  rgba: Uint8Array
} {
  // Decode header
  const header = hash[0] | (hash[1] << 8) | (hash[2] << 16)
  const hasAlpha = (header & 0x80) !== 0
  const lx = Math.max(3, (header & 0x7) !== 0 ? (header & 0x7) : (header >> 3) & 0x7)
  const ly = Math.max(3, hasAlpha ? 5 : (header >> 3) & 0x7)

  // Simplified decode - actual implementation more complex
  const w = Math.round(lx * 32 / Math.max(lx, ly))
  const h = Math.round(ly * 32 / Math.max(lx, ly))
  const rgba = new Uint8Array(w * h * 4)

  // Decode AC coefficients to pixels
  // ... (full decode logic)

  return { w, h, rgba }
}

export function thumbHashToDataURL(hash: string): string {
  const bytes = base64ToBytes(hash)
  const { w, h, rgba } = thumbHashToRGBA(bytes)
  return rgbaToDataURL(w, h, rgba)
}
```

### Step 2: BlurHash Canvas Component

```typescript
// src/BlurHashCanvas.tsx
import { useEffect, useRef } from 'react'
import { decode as decodeBlurHash } from 'blurhash'
import { thumbHashToRGBA } from './thumbhash'

interface BlurHashCanvasProps {
  hash: string
  hashType: 'blurhash' | 'thumbhash'
  width: number
  height: number
  className?: string
}

export function BlurHashCanvas({
  hash,
  hashType,
  width,
  height,
  className
}: BlurHashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hash) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      let pixels: Uint8ClampedArray

      if (hashType === 'blurhash') {
        // BlurHash decode (32x32 is sufficient for placeholder)
        pixels = decodeBlurHash(hash, 32, 32)
      } else {
        // ThumbHash decode
        const { rgba } = thumbHashToRGBA(base64ToBytes(hash))
        pixels = new Uint8ClampedArray(rgba)
      }

      const imageData = new ImageData(pixels, 32, 32)
      ctx.putImageData(imageData, 0, 0)
    } catch (e) {
      console.warn('Failed to decode hash:', e)
    }
  }, [hash, hashType])

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  )
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
```

### Step 3: Download Manager

```typescript
// src/DownloadManager.ts
export interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

export async function downloadWithProgress(
  url: string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentLength = response.headers.get('Content-Length')
  const total = contentLength ? parseInt(contentLength, 10) : 0

  // Fallback if no Content-Length or no ReadableStream
  if (!total || !response.body) {
    return response.blob()
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let loaded = 0

  while (true) {
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

  return new Blob(chunks, {
    type: response.headers.get('Content-Type') || 'image/jpeg'
  })
}
```

### Step 4: useDownload Hook

```typescript
// src/hooks/useDownload.ts
import { useState, useCallback } from 'react'
import { downloadWithProgress, DownloadProgress } from '../DownloadManager'

interface UseDownloadResult {
  download: (url: string) => Promise<string>
  progress: DownloadProgress | null
  isDownloading: boolean
  error: Error | null
}

export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const download = useCallback(async (url: string): Promise<string> => {
    setIsDownloading(true)
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const blob = await downloadWithProgress(url, setProgress)
      const objectUrl = URL.createObjectURL(blob)
      return objectUrl
    } catch (e) {
      setError(e as Error)
      throw e
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { download, progress, isDownloading, error }
}
```

### Step 5: Updated ImageCell

```typescript
// src/ImageCell.tsx (updated)
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { BlurHashCanvas } from './BlurHashCanvas'
import type { ImageItem, CellLayout } from './types'

interface ImageCellProps {
  image: ImageItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
  onDownload?: (image: ImageItem, progress: number) => void
}

export function ImageCell({
  image,
  layout,
  lazyLoad,
  onClick,
  onDownload
}: ImageCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const isVisible = useIntersectionObserver(ref, {
    rootMargin: '100px',
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible
  const hasPlaceholder = image.blurhash || image.thumbhash

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
  }, [])

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  return (
    <div
      ref={ref}
      className="chat-image-cell"
      style={{
        position: 'absolute',
        left: layout.x,
        top: layout.y,
        width: layout.width,
        height: layout.height,
        borderRadius: radiusStyle,
        overflow: 'hidden'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Placeholder layer */}
      {hasPlaceholder && !loaded && (
        <BlurHashCanvas
          hash={(image.thumbhash || image.blurhash)!}
          hashType={image.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-image-cell__placeholder"
        />
      )}

      {/* Image layer */}
      {shouldLoad && !error && (
        <img
          src={image.thumbnail || image.src}
          alt={image.alt ?? ''}
          className={`chat-image-cell__img ${loaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}

      {/* Error state */}
      {error && (
        <div className="chat-image-cell__error">
          <span>Failed to load</span>
          <button
            onClick={(e) => { e.stopPropagation(); setError(false); }}
            className="chat-image-cell__retry"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Enhanced CSS

```css
/* styles/chat-image-grid.css (additions) */

.chat-image-cell__placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.chat-image-cell__img {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--cmv-transition-duration) ease;
}

.chat-image-cell__img.loaded {
  opacity: 1;
}

.chat-image-cell__error {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 12px;
  background-color: #f5f5f5;
}

.chat-image-cell__retry {
  padding: 4px 12px;
  font-size: 11px;
  color: #007bff;
  background: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
}

.chat-image-cell__retry:hover {
  background: #007bff;
  color: white;
}

/* Progress indicator (optional) */
.chat-image-cell__progress {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 3px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  overflow: hidden;
  z-index: 4;
}

.chat-image-cell__progress-bar {
  height: 100%;
  background: #007bff;
  transition: width 0.1s ease;
}
```

### Step 7: Tests

```typescript
// src/__tests__/BlurHashCanvas.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BlurHashCanvas } from '../BlurHashCanvas'

describe('BlurHashCanvas', () => {
  it('renders canvas element', () => {
    const { container } = render(
      <BlurHashCanvas
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        hashType="blurhash"
        width={100}
        height={100}
      />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })
})

// src/__tests__/DownloadManager.test.ts
import { describe, it, expect, vi } from 'vitest'
import { downloadWithProgress } from '../DownloadManager'

describe('DownloadManager', () => {
  it('tracks download progress', async () => {
    const progress = vi.fn()
    // Mock fetch with ReadableStream
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'Content-Length': '1000' }),
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(500))
          controller.enqueue(new Uint8Array(500))
          controller.close()
        }
      })
    })

    await downloadWithProgress('https://example.com/image.jpg', progress)
    expect(progress).toHaveBeenCalled()
  })
})
```

## Todo List

- [ ] Implement ThumbHash decoder (minimal version)
- [ ] Create BlurHashCanvas component
- [ ] Add blurhash package as optional peer dep
- [ ] Implement DownloadManager with ReadableStream
- [ ] Create useDownload hook
- [ ] Update ImageCell with placeholder layer
- [ ] Add fade transition CSS
- [ ] Implement error state with retry
- [ ] Add progress bar component (optional)
- [ ] Write unit tests
- [ ] Update Storybook with placeholder demos
- [ ] Test fallback for non-streaming responses

## Success Criteria

- [x] Placeholder renders immediately from hash
- [x] Smooth fade from placeholder to image
- [x] Download progress reports accurate percentage
- [x] Error state shows retry button
- [x] Works without placeholder (graceful degradation)
- [x] Bundle stays under 5KB

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| BlurHash bundle size | Use optional peer dep |
| ReadableStream support | Fallback to blob() |
| Canvas performance | Keep decode size small (32x32) |

## Security Considerations

- Validate hash format before decode
- Sanitize blob MIME type
- No arbitrary code execution from hashes

## Next Steps

After Phase 4 complete, proceed to [Phase 5: Polish & Docs](./phase-05-polish-docs.md)
