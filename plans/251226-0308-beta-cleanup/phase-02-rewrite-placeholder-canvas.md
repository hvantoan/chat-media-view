# Phase 2: Rewrite PlaceholderCanvas

## Overview

Replace ThumbHash decoder with BlurHash decoder. Simplify API by removing `hashType` prop.

## Changes

### 2.1 Update PlaceholderCanvas.tsx

**File:** `src/PlaceholderCanvas.tsx`

**Before:**
```tsx
import { useEffect, useRef, memo } from 'react'
import { thumbHashToRGBA, base64ToBytes } from './thumbhash'

interface PlaceholderCanvasProps {
  hash: string
  hashType: 'thumbhash' | 'blurhash'
  width: number
  height: number
  className?: string
}
```

**After:**
```tsx
import { useEffect, useRef, memo } from 'react'
import { decode } from 'blurhash'

interface PlaceholderCanvasProps {
  /** BlurHash string for placeholder */
  hash: string
  /** Target width in pixels */
  width: number
  /** Target height in pixels */
  height: number
  /** Optional CSS class */
  className?: string
}

/**
 * Canvas-based placeholder renderer for BlurHash
 */
export const PlaceholderCanvas = memo(function PlaceholderCanvas({
  hash,
  width,
  height,
  className
}: PlaceholderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hash) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      // Decode to small size for performance (32x32 typical)
      const decodeWidth = 32
      const decodeHeight = 32
      const pixels = decode(hash, decodeWidth, decodeHeight)

      canvas.width = decodeWidth
      canvas.height = decodeHeight
      const imageData = new ImageData(pixels, decodeWidth, decodeHeight)
      ctx.putImageData(imageData, 0, 0)
    } catch (e) {
      console.warn('Failed to decode BlurHash:', e)
      // Fallback to gray
      ctx.fillStyle = '#e0e0e0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [hash])

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className={className}
      style={{
        width: width || '100%',
        height: height || '100%',
        objectFit: 'cover'
      }}
      aria-hidden="true"
    />
  )
})
```

## Key Changes

1. Import `decode` from `blurhash` instead of thumbhash utilities
2. Remove `hashType` prop - only BlurHash supported now
3. Use `decode(hash, width, height)` which returns `Uint8ClampedArray`
4. Simplified error handling

## Verification

```bash
npm run typecheck
```
