import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { calculateLayout } from './GridLayoutEngine'
import { MediaCell } from './MediaCell'
import type { ChatMediaGridProps } from './types'
import './styles/chat-media-grid.css'

export function ChatMediaGrid({
  items,
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onMediaClick,
  lazyLoad = true,
  className,
  rtl = false
}: ChatMediaGridProps): ReactNode {
  const mediaItems = items ?? []

  const layout = useMemo(
    () => calculateLayout(mediaItems, { maxWidth, gap, borderRadius, rtl }),
    [mediaItems, maxWidth, gap, borderRadius, rtl]
  )

  if (mediaItems.length === 0) return null

  return (
    <div
      className={`chat-media-grid ${className ?? ''}`}
      style={{
        width: layout.totalWidth,
        height: layout.totalHeight,
        position: 'relative'
      }}
      dir={rtl ? 'rtl' : undefined}
      role="group"
      aria-label={`Media gallery with ${mediaItems.length} item${mediaItems.length > 1 ? 's' : ''}`}
    >
      {layout.cells.map((cell) => {
        const item = mediaItems[cell.index]
        if (!item) return null

        return (
          <MediaCell
            key={cell.index}
            item={item}
            layout={cell}
            lazyLoad={lazyLoad}
            onClick={() => { onMediaClick?.(cell.index, item); }}
          />
        )
      })}
    </div>
  )
}
