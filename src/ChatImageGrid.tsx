import { useMemo } from 'react'
import { calculateLayout } from './GridLayoutEngine'
import { ImageCell } from './ImageCell'
import type { ChatImageGridProps } from './types'
import './styles/chat-image-grid.css'

export function ChatImageGrid({
  images,
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onImageClick,
  lazyLoad = true,
  className
}: ChatImageGridProps) {
  const layout = useMemo(
    () => calculateLayout(images, { maxWidth, gap, borderRadius }),
    [images, maxWidth, gap, borderRadius]
  )

  if (images.length === 0) return null

  return (
    <div
      className={`chat-image-grid ${className ?? ''}`}
      style={{
        width: layout.totalWidth,
        height: layout.totalHeight,
        position: 'relative'
      }}
    >
      {layout.cells.map((cell) => (
        <ImageCell
          key={cell.index}
          image={images[cell.index]}
          layout={cell}
          lazyLoad={lazyLoad}
          onClick={() => onImageClick?.(cell.index, images[cell.index])}
        />
      ))}
    </div>
  )
}
