import { useState, useEffect, useCallback, useMemo } from 'react'
import type { MediaItem, ImageItem } from './types'
import { handleKeyboardNav } from './accessibility'
import { LightboxVideo } from './LightboxVideo'
import { useDownload } from './hooks/useDownload'
import './styles/lightbox.css'

/**
 * Normalize legacy ImageItem to MediaItem
 */
function normalizeMediaItem(item: ImageItem | MediaItem): MediaItem {
  if ('type' in item) return item as MediaItem
  return { ...item, type: 'image' as const }
}

export interface LightboxProps {
  /** Array of media items to display */
  items?: MediaItem[]
  /** @deprecated Use `items` instead */
  images?: ImageItem[]
  /** Initial media index */
  initialIndex?: number
  /** Whether lightbox is open */
  isOpen: boolean
  /** Callback when lightbox closes */
  onClose: () => void
  /** Callback when index changes */
  onIndexChange?: (index: number) => void
  /** Callback when download requested */
  onDownload?: (item: MediaItem, index: number) => void
  /** Show download button (default: true) */
  showDownload?: boolean
}

/**
 * Simple download icon SVG
 */
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

/**
 * Optional lightbox component for full-screen media viewing
 * Tree-shakeable - only included if imported
 */
export function Lightbox({
  items,
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
  onDownload,
  showDownload = true
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const { download, progress, status, reset } = useDownload()

  // Normalize items (backwards compat)
  const mediaItems = useMemo(() => {
    const source = items ?? images ?? []
    return source.map(normalizeMediaItem)
  }, [items, images])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  // Reset download state on index change
  useEffect(() => {
    reset()
  }, [currentIndex, reset])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    handleKeyboardNav(e, currentIndex, mediaItems.length, setCurrentIndex)
  }, [currentIndex, mediaItems.length, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
    return undefined
  }, [isOpen, handleKeyDown])

  const handleDownload = useCallback(async () => {
    const current = mediaItems[currentIndex]
    if (!current) return

    if (onDownload) {
      onDownload(current, currentIndex)
      return
    }

    try {
      const objectUrl = await download(current.src)
      // Trigger browser download
      const link = document.createElement('a')
      link.href = objectUrl
      const ext = current.type === 'video' ? 'mp4' : 'jpg'
      link.download = current.alt || `media-${currentIndex + 1}.${ext}`
      link.click()
    } catch {
      // Download failed or cancelled
    }
  }, [currentIndex, mediaItems, download, onDownload])

  if (!isOpen || mediaItems.length === 0) return null

  const current = mediaItems[currentIndex]
  if (!current) return null

  const goPrev = () => setCurrentIndex(i => (i - 1 + mediaItems.length) % mediaItems.length)
  const goNext = () => setCurrentIndex(i => (i + 1) % mediaItems.length)

  const isVideo = current.type === 'video'

  return (
    <div
      className="chat-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={isVideo ? 'Video lightbox' : 'Image lightbox'}
      onClick={onClose}
    >
      <div className="chat-lightbox__content" onClick={e => e.stopPropagation()}>
        {/* Media content */}
        {isVideo ? (
          <LightboxVideo video={current} isActive={true} />
        ) : (
          <img
            src={current.src}
            alt={current.alt ?? ''}
            className="chat-lightbox__image"
          />
        )}

        {/* Close button */}
        <button
          className="chat-lightbox__close"
          onClick={onClose}
          aria-label="Close lightbox"
          type="button"
        >
          &times;
        </button>

        {/* Download button */}
        {showDownload && (
          <button
            className="chat-lightbox__download"
            onClick={handleDownload}
            aria-label={`Download ${isVideo ? 'video' : 'image'}`}
            type="button"
            disabled={status === 'downloading'}
          >
            {status === 'downloading' ? (
              <span>{progress?.percentage ?? 0}%</span>
            ) : (
              <DownloadIcon />
            )}
          </button>
        )}

        {/* Navigation */}
        {mediaItems.length > 1 && (
          <>
            <button
              className="chat-lightbox__prev"
              onClick={goPrev}
              aria-label="Previous"
              type="button"
            >
              &#8249;
            </button>
            <button
              className="chat-lightbox__next"
              onClick={goNext}
              aria-label="Next"
              type="button"
            >
              &#8250;
            </button>
            <div className="chat-lightbox__counter">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
