import { useEffect, useRef, memo } from 'react'
import { decode } from 'blurhash'

interface PlaceholderCanvasProps {
  /** BlurHash string */
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
      // Decode BlurHash to pixels (32x32 is optimal for placeholder)
      const pixels = decode(hash, 32, 32)
      canvas.width = 32
      canvas.height = 32
      // Create ImageData with the decoded pixels
      const imageData = ctx.createImageData(32, 32)
      imageData.data.set(pixels)
      ctx.putImageData(imageData, 0, 0)
    } catch (e) {
      console.warn('Failed to decode blurhash:', e)
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
