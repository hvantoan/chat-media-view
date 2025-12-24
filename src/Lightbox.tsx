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
  /** Show thumbnail strip at bottom (default: true) */
  showThumbnails?: boolean
  /** Show zoom controls (default: true) */
  showZoomControls?: boolean
}

/** Download icon SVG */
function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

/** Close icon SVG */
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/** Chevron left icon SVG */
function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  )
}

/** Chevron right icon SVG */
function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,6 15,12 9,18" />
    </svg>
  )
}

/**
 * Lightbox component for full-screen media viewing
 * Features glassmorphism UI, blurred background, and gradient overlays
 */
export function Lightbox({
  items,
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
  onDownload,
  showDownload = true,
  showThumbnails = true,
  showZoomControls = true
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
  const bgImageUrl = current.thumbnail || current.src

  return (
    <div
      className="chat-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={isVideo ? 'Video lightbox' : 'Image lightbox'}
      onClick={onClose}
    >
      {/* Blurred background */}
      <div
        className="chat-lightbox__blur-bg"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="chat-lightbox__gradient chat-lightbox__gradient--top" aria-hidden="true" />
      <div className="chat-lightbox__gradient chat-lightbox__gradient--bottom" aria-hidden="true" />

      {/* Main stage */}
      <div className="chat-lightbox__stage" onClick={e => e.stopPropagation()}>
        {/* Media content */}
        <div className="chat-lightbox__media-wrapper">
          {isVideo ? (
            <LightboxVideo video={current} isActive={true} />
          ) : (
            <img
              src={current.src}
              alt={current.alt ?? ''}
              className="chat-lightbox__media"
            />
          )}
        </div>

        {/* Top toolbar */}
        <div className="chat-lightbox__toolbar">
          {showDownload && (
            <button
              className="chat-lightbox__glass-btn chat-lightbox__glass-btn--rect"
              onClick={handleDownload}
              aria-label="Download"
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
          <button
            className="chat-lightbox__glass-btn chat-lightbox__glass-btn--rect"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        {mediaItems.length > 1 && (
          <>
            <button
              className="chat-lightbox__nav chat-lightbox__nav--prev chat-lightbox__glass-btn chat-lightbox__glass-btn--circle"
              onClick={goPrev}
              aria-label="Previous"
              type="button"
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="chat-lightbox__nav chat-lightbox__nav--next chat-lightbox__glass-btn chat-lightbox__glass-btn--circle"
              onClick={goNext}
              aria-label="Next"
              type="button"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        {/* Bottom controls */}
        <div className="chat-lightbox__bottom">
          <div className="chat-lightbox__controls">
            {/* Counter */}
            {mediaItems.length > 1 && (
              <div className="chat-lightbox__pill">
                {currentIndex + 1} / {mediaItems.length}
              </div>
            )}

            {/* Zoom controls placeholder - Phase 4 */}
            {showZoomControls && !isVideo && null}
          </div>

          {/* Thumbnails placeholder - Phase 5 */}
          {showThumbnails && mediaItems.length > 1 && null}
        </div>
      </div>
    </div>
  )
}
