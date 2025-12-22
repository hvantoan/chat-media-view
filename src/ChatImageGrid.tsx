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
  className,
  rtl = false
}: ChatImageGridProps) {
  const layout = useMemo(
    () => calculateLayout(images, { maxWidth, gap, borderRadius, rtl }),
    [images, maxWidth, gap, borderRadius, rtl]
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
      dir={rtl ? 'rtl' : undefined}
      role="group"
      aria-label={`Image gallery with ${images.length} image${images.length > 1 ? 's' : ''}`}
    >
      {layout.cells.map((cell) => {
        const image = images[cell.index]
        if (!image) return null
        return (
          <ImageCell
            key={cell.index}
            image={image}
            layout={cell}
            lazyLoad={lazyLoad}
            onClick={() => onImageClick?.(cell.index, image)}
          />
        )
      })}
    </div>
  )
}
