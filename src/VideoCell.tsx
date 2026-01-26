import type { ReactNode } from 'react'
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { useVideoVisibility } from './hooks/useVideoVisibility'
import { PlaceholderCanvas } from './PlaceholderCanvas'
import { PlayIcon } from './PlayIcon'
import type { VideoMediaItem, CellLayout } from './types'
import './styles/video-cell.css'

type VideoState = 'thumbnail' | 'loading' | 'playing' | 'paused' | 'error'

interface VideoCellProps {
  video: VideoMediaItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
}

/**
 * Format duration in seconds to M:SS format
 */
function formatDuration(seconds?: number): string | null {
  if (seconds == null || seconds === 0) return null
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoCell({
  video,
  layout,
  lazyLoad,
  onClick
}: VideoCellProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<VideoState>('thumbnail')
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)

  const isVisible = useIntersectionObserver(containerRef, {
    rootMargin: '100px',
    threshold: 0,
    skip: !lazyLoad
  })

  // Auto-pause on scroll out of view
  useVideoVisibility(containerRef, videoRef, {
    threshold: 0.1,
    enabled: state === 'playing' || state === 'paused'
  })

  const shouldLoadThumbnail = !lazyLoad || isVisible
  const hasPlaceholder = !!video.blurhash
  const showThumbnail = state === 'thumbnail' || state === 'loading'
  // Only render video element during loading (hidden), playing, or paused states
  const shouldRenderVideo = state === 'loading' || state === 'playing' || state === 'paused'
  // Only show video visually after it's ready (playing or paused)
  const showVideo = state === 'playing' || state === 'paused'

  const handleThumbnailLoad = useCallback(() => { setThumbnailLoaded(true); }, [])

  const handleThumbnailError = useCallback(() => {
    if (state === 'thumbnail') setState('error')
  }, [state])

  const handlePlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setState('loading')
  }, [])

  const handleVideoCanPlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => { setState('playing'); })
        .catch(() => { setState('error'); })
    }
  }, [])

  const handleVideoError = useCallback(() => {
    setState('error')
  }, [])

  const handleVideoPause = useCallback(() => {
    if (state === 'playing') setState('paused')
  }, [state])

  const handleVideoPlay = useCallback(() => {
    setState('playing')
  }, [])

  const handleRetry = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setState('thumbnail')
    setThumbnailLoaded(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (state === 'thumbnail') {
        e.preventDefault()
        setState('loading')
      } else {
        onClick?.()
      }
    }
  }, [state, onClick])

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  return (
    <div
      ref={containerRef}
      className={`chat-video-cell chat-video-cell--${state}`}
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
      aria-label={video.alt ?? 'Video'}
      onKeyDown={handleKeyDown}
    >
      {/* Placeholder layer */}
      {hasPlaceholder && !thumbnailLoaded && state !== 'error' && (
        <PlaceholderCanvas
          hash={video.blurhash!}
          width={layout.width}
          height={layout.height}
          className="chat-video-cell__placeholder"
        />
      )}

      {/* Thumbnail layer */}
      {shouldLoadThumbnail && showThumbnail && (
        <img
          src={video.thumbnail ?? video.src}
          alt=""
          className={`chat-video-cell__thumbnail ${thumbnailLoaded ? 'loaded' : ''}`}
          onLoad={handleThumbnailLoad}
          onError={handleThumbnailError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}

      {/* Video element - rendered during loading but hidden until ready */}
      {shouldRenderVideo && (
        <video
          ref={videoRef}
          className={`chat-video-cell__video${showVideo ? ' chat-video-cell__video--visible' : ''}`}
          src={video.src}
          poster={video.thumbnail ?? video.src}
          controls
          playsInline
          muted={video.muted ?? true}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
          onClick={(e) => { e.stopPropagation(); }}
        />
      )}

      {/* Play icon overlay - only in thumbnail state */}
      {state === 'thumbnail' && (
        <button
          className="chat-video-cell__play-btn"
          onClick={handlePlayClick}
          aria-label="Play video"
          type="button"
        >
          <PlayIcon size={Math.min(48, layout.width * 0.3)} />
        </button>
      )}

      {/* Loading spinner */}
      {state === 'loading' && (
        <div className="chat-video-cell__loading">
          <div className="chat-video-cell__spinner" />
        </div>
      )}

      {/* Duration badge - only in thumbnail state */}
      {state === 'thumbnail' && video.duration && (
        <div className="chat-video-cell__duration">
          {formatDuration(video.duration)}
        </div>
      )}

      {/* Error state */}
      {state === 'error' && (
        <div className="chat-video-cell__error">
          <span>Failed to load</span>
          <button onClick={handleRetry} type="button">
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
