import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
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

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])

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
      {error && (
        <div className="chat-image-cell__error">
          Failed to load
        </div>
      )}
    </div>
  )
}
