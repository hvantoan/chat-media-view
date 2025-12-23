# Phase 3: Video Playback

## Context

- [Plan Overview](./plan.md)
- [Phase 2: VideoCell](./phase-02-video-cell.md)
- [Research: Video Player](./research/researcher-01-video-player.md)

## Overview

Implement inline video playback within VideoCell. User taps thumbnail to start playback (no autoplay). Custom minimal controls overlay (play/pause, seek bar, mute). Auto-pause when scrolled out of view via IntersectionObserver.

## Key Insights

1. **Tap to play**: No autoplay - user must tap thumbnail to start
2. **Custom controls**: Minimal overlay controls (play/pause, seek, mute) - consistent UI
3. **IntersectionObserver**: Pause video when <10% visible (performance/UX)
4. **Play promise**: `.play()` returns promise that can reject
5. **Memory**: Pause + remove src when far out of view

## Requirements

- US-02: Play video inline with controls (play/pause, seek, mute)
- Auto-pause when video scrolls out of viewport

## Architecture

```
VideoCell States:
1. THUMBNAIL - Show thumbnail + play icon (default)
2. PLAYING - Show <video> with controls
3. PAUSED - Show <video> paused (still visible)
4. ERROR - Show error state with retry

State Transitions:
- THUMBNAIL → PLAYING: User clicks play
- PLAYING → PAUSED: User clicks pause OR scrolls out
- PAUSED → PLAYING: User clicks play OR scrolls back in (if was playing)
- ANY → ERROR: Video load fails
- ERROR → THUMBNAIL: User clicks retry
```

## Related Files

| File | Action |
|------|--------|
| `src/VideoCell.tsx` | Update - add video element and playback logic |
| `src/hooks/useVideoVisibility.ts` | Create - visibility-based play/pause |
| `src/styles/video-cell.css` | Update - video element styles |

## Implementation Steps

### Step 1: Create useVideoVisibility hook

```typescript
// src/hooks/useVideoVisibility.ts
import { useRef, useEffect, RefObject } from 'react'

interface UseVideoVisibilityOptions {
  /** Threshold below which video pauses (0-1). Default 0.1 */
  threshold?: number
  /** Whether playback is enabled */
  enabled?: boolean
}

/**
 * Hook to auto-pause/resume video based on visibility
 * Returns ref to attach to video element
 */
export function useVideoVisibility(
  containerRef: RefObject<Element>,
  options: UseVideoVisibilityOptions = {}
): RefObject<HTMLVideoElement> {
  const { threshold = 0.1, enabled = true } = options
  const videoRef = useRef<HTMLVideoElement>(null)
  const wasPlayingRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !videoRef.current) return

        const isVisible = entry.intersectionRatio >= threshold

        if (isVisible) {
          // Resume if was playing before scrolling away
          if (wasPlayingRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {
              // Autoplay blocked - user must interact
            })
          }
        } else {
          // Pause if playing and scrolled out
          if (!videoRef.current.paused) {
            wasPlayingRef.current = true
            videoRef.current.pause()
          }
        }
      },
      { threshold: [0, threshold, 0.5, 1] }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [containerRef, threshold, enabled])

  return videoRef
}
```

### Step 2: Update VideoCell with playback

```typescript
// src/VideoCell.tsx - Updated version
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

export function VideoCell({
  video,
  layout,
  lazyLoad,
  onClick
}: VideoCellProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<VideoState>('thumbnail')
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)

  // Lazy load visibility
  const isVisible = useIntersectionObserver(containerRef, {
    rootMargin: '100px',
    threshold: 0,
    skip: !lazyLoad
  })

  // Auto-pause on scroll
  const videoRef = useVideoVisibility(containerRef, {
    threshold: 0.1,
    enabled: state === 'playing' || state === 'paused'
  })

  const shouldLoadThumbnail = !lazyLoad || isVisible
  const hasPlaceholder = video.blurhash || video.thumbhash
  const showThumbnail = state === 'thumbnail' || state === 'loading'
  const showVideo = state === 'playing' || state === 'paused' || state === 'loading'

  const handleThumbnailLoad = useCallback(() => setThumbnailLoaded(true), [])

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
        .then(() => setState('playing'))
        .catch(() => setState('error'))
    }
  }, [videoRef])

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

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

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
      aria-label={video.alt || 'Video'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (state === 'thumbnail') {
            e.preventDefault()
            handlePlayClick(e as unknown as React.MouseEvent)
          } else {
            onClick?.()
          }
        }
      }}
    >
      {/* Placeholder layer */}
      {hasPlaceholder && !thumbnailLoaded && state !== 'error' && (
        <PlaceholderCanvas
          hash={(video.thumbhash || video.blurhash)!}
          hashType={video.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-video-cell__placeholder"
        />
      )}

      {/* Thumbnail layer (visible in thumbnail/loading states) */}
      {shouldLoadThumbnail && showThumbnail && state !== 'error' && (
        <img
          src={video.thumbnail || video.src}
          alt=""
          className={`chat-video-cell__thumbnail ${thumbnailLoaded ? 'loaded' : ''}`}
          onLoad={handleThumbnailLoad}
          onError={handleThumbnailError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}

      {/* Video element */}
      {showVideo && (
        <video
          ref={videoRef}
          className="chat-video-cell__video"
          src={video.src}
          controls
          playsInline
          muted={video.muted ?? true}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Play icon overlay - only in thumbnail state */}
      {state === 'thumbnail' && !state.includes('error') && (
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
```

### Step 3: Update video-cell.css

```css
/* Add to src/styles/video-cell.css */

.chat-video-cell__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

.chat-video-cell__play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.chat-video-cell__play-btn:hover svg circle {
  fill: rgba(0, 0, 0, 0.8);
}

.chat-video-cell__play-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -2px;
}

.chat-video-cell__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.chat-video-cell__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: video-spin 0.8s linear infinite;
}

@keyframes video-spin {
  to { transform: rotate(360deg); }
}

/* Hide thumbnail when video is playing */
.chat-video-cell--playing .chat-video-cell__thumbnail,
.chat-video-cell--paused .chat-video-cell__thumbnail {
  opacity: 0;
  pointer-events: none;
}
```

## Todo List

- [ ] Create useVideoVisibility hook
- [ ] Update VideoCell with state machine
- [ ] Add video element with native controls
- [ ] Implement play button click handler
- [ ] Add loading spinner state
- [ ] Update CSS for video element
- [ ] Test auto-pause on scroll
- [ ] Test keyboard accessibility
- [ ] Write useVideoVisibility.test.ts
- [ ] Update Storybook with playback story

## Success Criteria

- [ ] Clicking play starts video playback
- [ ] Video shows native browser controls
- [ ] Video auto-pauses when scrolled out of view
- [ ] Video resumes when scrolled back (if was playing)
- [ ] Loading state shown during video load
- [ ] Error state with retry on load failure
- [ ] Works on mobile (touch, playsInline)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Autoplay blocked | Default muted=true, show error on rejection |
| Multiple videos playing | IntersectionObserver pauses all out-of-view |
| Mobile battery drain | Auto-pause handles this |
| Large video files slow | thumbnail prop prevents loading video until play |

## Security Considerations

- Video URLs should be same-origin or CORS-enabled
- No user-controlled HTML in video element

## Next Steps

After completion:
1. Proceed to [Phase 4: Download Manager](./phase-04-download-manager.md)
2. Enhanced downloads for both images and videos
