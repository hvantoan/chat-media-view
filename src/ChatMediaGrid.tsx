import type { ReactNode } from 'react'
import { useMemo, useState, useCallback } from 'react'
import { calculateLayout } from './GridLayoutEngine'
import { MediaCell } from './MediaCell'
import { Lightbox } from './Lightbox'
import type { ChatMediaGridProps, MediaItem } from './types'
import './styles/chat-media-grid.css'

export function ChatMediaGrid({
  items,
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onMediaClick,
  lazyLoad = true,
  className,
  rtl = false,
  enableLightbox = true,
  lightboxShowDownload = true,
  lightboxShowThumbnails = true,
  lightboxShowZoomControls = true
}: ChatMediaGridProps): ReactNode {
  const mediaItems = useMemo(() => items ?? [], [items])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const layout = useMemo(
    () => calculateLayout(mediaItems, { maxWidth, gap, borderRadius, rtl }),
    [mediaItems, maxWidth, gap, borderRadius, rtl]
  )

  const handleMediaClick = useCallback((index: number, item: MediaItem) => {
    onMediaClick?.(index, item)
    if (enableLightbox) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }, [onMediaClick, enableLightbox])

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  if (mediaItems.length === 0) return null

  return (
    <>
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
              onClick={() => { handleMediaClick(cell.index, item); }}
            />
          )
        })}
      </div>
      {enableLightbox && (
        <Lightbox
          items={mediaItems}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={handleLightboxClose}
          showDownload={lightboxShowDownload}
          showThumbnails={lightboxShowThumbnails}
          showZoomControls={lightboxShowZoomControls}
        />
      )}
    </>
  )
}
