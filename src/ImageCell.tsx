import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { PlaceholderCanvas } from './PlaceholderCanvas'
import type { ImageItem, CellLayout } from './types'

interface ImageCellProps {
  image: ImageItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
}

export function ImageCell({
  image,
  layout,
  lazyLoad,
  onClick
}: ImageCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const isVisible = useIntersectionObserver(ref, {
    rootMargin: '100px',
    threshold: 0,
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible
  const hasPlaceholder = image.blurhash || image.thumbhash

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])
  const handleRetry = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setError(false)
    setLoaded(false)
  }, [])

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  return (
    <div
      ref={ref}
      className="chat-image-cell"
      style={{
        position: 'absolute',
        left: layout.x,
        top: layout.y,
        width: layout.width,
        height: layout.height,
        borderRadius: radiusStyle,
        overflow: 'hidden'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={image.alt || 'Image'}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      {/* Placeholder layer - shown until image loads */}
      {hasPlaceholder && !loaded && !error && (
        <PlaceholderCanvas
          hash={(image.thumbhash || image.blurhash)!}
          hashType={image.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-image-cell__placeholder"
        />
      )}

      {/* Image layer */}
      {shouldLoad && !error && (
        <img
          src={image.thumbnail || image.src}
          alt={image.alt ?? ''}
          className={`chat-image-cell__img ${loaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}

      {/* Error state with retry */}
      {error && (
        <div className="chat-image-cell__error">
          <span>Failed to load</span>
          <button
            onClick={handleRetry}
            className="chat-image-cell__retry"
            type="button"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
