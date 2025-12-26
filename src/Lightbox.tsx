import type { ReactNode } from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { MediaItem } from './types'
import { handleKeyboardNav } from './accessibility'
import { LightboxVideo } from './LightboxVideo'
import { useDownload } from './hooks/useDownload'
import { useZoom } from './hooks/useZoom'
import { LightboxZoomControls } from './LightboxZoomControls'
import {
  CloseIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from './LightboxIcons'
import { LightboxThumbnails } from './LightboxThumbnails'
import './styles/lightbox.css'

export interface LightboxProps {
  /** Array of media items to display */
  items?: MediaItem[]
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
  /** Show zoom controls for images (default: true) */
  showZoomControls?: boolean
  /** Minimum zoom level (default: 0.5) */
  minZoom?: number
  /** Maximum zoom level (default: 3) */
  maxZoom?: number
  /** Zoom step increment (default: 0.25) */
  zoomStep?: number
}

/**
 * Lightbox component for full-screen media viewing
 * Features glassmorphism UI, blurred background, and gradient overlays
 */
export function Lightbox({
  items,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
  onDownload,
  showDownload = true,
  showThumbnails = true,
  showZoomControls = true,
  minZoom = 0.5,
  maxZoom = 3,
  zoomStep = 0.25
}: LightboxProps): ReactNode {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const { download, progress, status, reset } = useDownload()
  const prevIndexRef = useRef(initialIndex)

  // Zoom state management
  const zoom = useZoom({
    min: minZoom,
    max: maxZoom,
    step: zoomStep
  })

  const mediaItems = items ?? []

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

  // Reset zoom when image changes
  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      zoom.resetZoom()
      prevIndexRef.current = currentIndex
    }
    // zoom.resetZoom is stable from useCallback, safe to exclude zoom object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    // Zoom keyboard shortcuts (images only)
    const current = mediaItems[currentIndex]
    const isCurrentVideo = current?.type === 'video'
    if (!isCurrentVideo) {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoom.zoomIn()
        return
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        zoom.zoomOut()
        return
      }
      if (e.key === '0') {
        e.preventDefault()
        zoom.resetZoom()
        return
      }
    }

    handleKeyboardNav(e, currentIndex, mediaItems.length, setCurrentIndex)
  }, [currentIndex, mediaItems, onClose, zoom])

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
      link.download = current.alt ?? `media-${currentIndex + 1}.${ext}`
      link.click()
    } catch {
      // Download failed or cancelled
    }
  }, [currentIndex, mediaItems, download, onDownload])

  if (!isOpen || mediaItems.length === 0) return null

  const current = mediaItems[currentIndex]
  if (!current) return null

  const goPrev = (): void => { setCurrentIndex(i => (i - 1 + mediaItems.length) % mediaItems.length); }
  const goNext = (): void => { setCurrentIndex(i => (i + 1) % mediaItems.length); }

  const isVideo = current.type === 'video'
  const bgImageUrl = current.thumbnail ?? current.src

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
      <div className="chat-lightbox__stage" onClick={e => { e.stopPropagation(); }}>
        {/* Media content */}
        <div className="chat-lightbox__media-wrapper">
          {isVideo ? (
            <LightboxVideo video={current} isActive={true} />
          ) : (
            <img
              src={current.src}
              alt={current.alt ?? ''}
              className={`chat-lightbox__media${zoom.isZoomed ? ' chat-lightbox__media--zoomed' : ''}`}
              style={{ transform: `scale(${zoom.zoom})` }}
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

            {/* Zoom controls (images only) */}
            {showZoomControls && !isVideo && (
              <LightboxZoomControls zoom={zoom} />
            )}
          </div>

          {/* Thumbnail strip */}
          {showThumbnails && mediaItems.length > 1 && (
            <LightboxThumbnails
              items={mediaItems}
              currentIndex={currentIndex}
              onSelect={setCurrentIndex}
            />
          )}
        </div>
      </div>
    </div>
  )
}
