import { useState, useEffect, useCallback } from 'react'
import type { ImageItem } from './types'
import { handleKeyboardNav } from './accessibility'
import './styles/lightbox.css'

export interface LightboxProps {
  /** Array of images to display */
  images: ImageItem[]
  /** Initial image index */
  initialIndex?: number
  /** Whether lightbox is open */
  isOpen: boolean
  /** Callback when lightbox closes */
  onClose: () => void
  /** Callback when index changes */
  onIndexChange?: (index: number) => void
}

/**
 * Optional lightbox component for full-screen image viewing
 * Tree-shakeable - only included if imported
 */
export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    handleKeyboardNav(e, currentIndex, images.length, setCurrentIndex)
  }, [currentIndex, images.length, onClose])

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

  if (!isOpen || images.length === 0) return null

  const current = images[currentIndex]
  if (!current) return null

  const goPrev = () => setCurrentIndex(i => (i - 1 + images.length) % images.length)
  const goNext = () => setCurrentIndex(i => (i + 1) % images.length)

  return (
    <div
      className="chat-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      <div className="chat-lightbox__content" onClick={e => e.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt ?? ''}
          className="chat-lightbox__image"
        />
        <button
          className="chat-lightbox__close"
          onClick={onClose}
          aria-label="Close lightbox"
          type="button"
        >
          &times;
        </button>
        {images.length > 1 && (
          <>
            <button
              className="chat-lightbox__prev"
              onClick={goPrev}
              aria-label="Previous image"
              type="button"
            >
              &#8249;
            </button>
            <button
              className="chat-lightbox__next"
              onClick={goNext}
              aria-label="Next image"
              type="button"
            >
              &#8250;
            </button>
            <div className="chat-lightbox__counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
