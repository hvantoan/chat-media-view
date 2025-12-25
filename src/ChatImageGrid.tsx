import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { calculateLayout } from './GridLayoutEngine'
import { MediaCell } from './MediaCell'
import type { ChatImageGridProps, MediaItem, ImageItem } from './types'
import './styles/chat-image-grid.css'

/**
 * Normalize legacy ImageItem to MediaItem
 * Infers type: 'image' when type field is missing
 */
function normalizeMediaItem(item: ImageItem | MediaItem): MediaItem {
  if ('type' in item) return item
  return { ...item, type: 'image' as const }
}

export function ChatImageGrid({
  items,
  images,
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onMediaClick,
  onImageClick,
  lazyLoad = true,
  className,
  rtl = false
}: ChatImageGridProps): ReactNode {
  // Normalize items for backwards compatibility
  const mediaItems = useMemo(() => {
    const source = items ?? images ?? []
    return source.map(normalizeMediaItem)
  }, [items, images])

  const layout = useMemo(
    () => calculateLayout(mediaItems, { maxWidth, gap, borderRadius, rtl }),
    [mediaItems, maxWidth, gap, borderRadius, rtl]
  )

  if (mediaItems.length === 0) return null

  const handleClick = (index: number, item: MediaItem): void => {
    onMediaClick?.(index, item)
    // Backwards compat: also call onImageClick
    onImageClick?.(index, item)
  }

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
            onClick={() => { handleClick(cell.index, item); }}
          />
        )
      })}
    </div>
  )
}
