import { useEffect, useRef, memo } from 'react'
import { thumbHashToRGBA, base64ToBytes } from './thumbhash'

interface PlaceholderCanvasProps {
  /** ThumbHash or BlurHash string */
  hash: string
  /** Hash type - currently only 'thumbhash' is supported natively */
  hashType: 'thumbhash' | 'blurhash'
  /** Target width in pixels */
  width: number
  /** Target height in pixels */
  height: number
  /** Optional CSS class */
  className?: string
}

/**
 * Canvas-based placeholder renderer for ThumbHash
 * BlurHash requires optional blurhash package - falls back to solid color
 */
export const PlaceholderCanvas = memo(function PlaceholderCanvas({
  hash,
  hashType,
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
      if (hashType === 'thumbhash') {
        const bytes = base64ToBytes(hash)
        const { w, h, rgba } = thumbHashToRGBA(bytes)
        canvas.width = w
        canvas.height = h
        const imageData = new ImageData(new Uint8ClampedArray(rgba), w, h)
        ctx.putImageData(imageData, 0, 0)
      } else {
        // BlurHash not included to keep bundle small
        // Fill with average gray as fallback
        ctx.fillStyle = '#e0e0e0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    } catch (e) {
      console.warn('Failed to decode hash:', e)
      // Fallback to gray
      ctx.fillStyle = '#e0e0e0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [hash, hashType])

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
