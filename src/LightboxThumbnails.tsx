import type { ReactNode } from 'react'
import { useRef, useEffect, useCallback } from 'react'
import type { MediaItem } from './types'

export interface LightboxThumbnailsProps {
  items: MediaItem[]
  currentIndex: number
  onSelect: (index: number) => void
}

/**
 * Small play icon for video thumbnails
 */
function VideoIndicator(): ReactNode {
  return (
    <div className="chat-lightbox__thumb-video-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
}

/**
 * Horizontal scrollable thumbnail strip
 */
export function LightboxThumbnails({
  items,
  currentIndex,
  onSelect
}: LightboxThumbnailsProps): ReactNode {
  const scrollRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = thumbRefs.current[currentIndex]
    if (activeThumb && scrollRef.current) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [currentIndex])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(index)
    }
    // Arrow key navigation within thumbnails
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      thumbRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < items.length - 1) {
      e.preventDefault()
      thumbRefs.current[index + 1]?.focus()
    }
  }, [items.length, onSelect])

  const getThumbnailUrl = (item: MediaItem): string => {
    // Prefer thumbnail, fallback to src
    return item.thumbnail ?? item.src
  }

  return (
    <div className="chat-lightbox__thumbnails">
      <div
        ref={scrollRef}
        className="chat-lightbox__thumbnails-scroll"
        role="listbox"
        aria-label="Image thumbnails"
      >
        <div className="chat-lightbox__thumbnails-list">
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isVideo = item.type === 'video'

            return (
              <button
                key={index}
                ref={el => { thumbRefs.current[index] = el }}
                className={`chat-lightbox__thumb ${isActive ? 'chat-lightbox__thumb--active' : ''}`}
                onClick={() => { onSelect(index); }}
                onKeyDown={(e) => { handleKeyDown(e, index); }}
                role="option"
                aria-selected={isActive}
                aria-label={item.alt ?? `${isVideo ? 'Video' : 'Image'} ${index + 1}`}
                type="button"
              >
                <img
                  src={getThumbnailUrl(item)}
                  alt=""
                  className="chat-lightbox__thumb-img"
                  loading="lazy"
                />
                {isVideo && <VideoIndicator />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
