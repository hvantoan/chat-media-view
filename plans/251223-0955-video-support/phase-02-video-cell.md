# Phase 2: VideoCell Component

## Context

- [Plan Overview](./plan.md)
- [Phase 1: Type System](./phase-01-type-system.md)
- [Research: Video Player](./research/researcher-01-video-player.md)

## Overview

Create VideoCell component displaying video thumbnail with play icon overlay. Shares structure with ImageCell but renders video-specific UI.

## Key Insights

1. Video thumbnail = static image until user clicks play
2. Play icon overlay signals video content type
3. Blurhash/thumbhash works identically to images
4. Duration badge optional (bottom-right corner)
5. Consider MediaCell wrapper to switch between ImageCell/VideoCell

## Requirements

- US-01: Display video thumbnail with play icon overlay
- US-03: Blurhash/thumbhash placeholder while thumbnail loads

## Architecture

```
MediaCell (new)
├── ImageCell (existing, for type: 'image')
└── VideoCell (new, for type: 'video')
    ├── PlaceholderCanvas (blurhash/thumbhash)
    ├── Thumbnail <img>
    ├── PlayIconOverlay (centered SVG)
    └── DurationBadge (optional, bottom-right)
```

## Related Files

| File | Action |
|------|--------|
| `src/VideoCell.tsx` | Create - video thumbnail + overlay |
| `src/MediaCell.tsx` | Create - switches between Image/VideoCell |
| `src/ChatImageGrid.tsx` | Update - use MediaCell instead of ImageCell |
| `src/styles/video-cell.css` | Create - overlay styles |
| `src/PlayIcon.tsx` | Create - SVG play button component |

## Implementation Steps

### Step 1: Create PlayIcon component

```typescript
// src/PlayIcon.tsx
interface PlayIconProps {
  size?: number
  className?: string
}

export function PlayIcon({ size = 48, className }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.6)" />
      <path d="M19 15 L35 24 L19 33 Z" fill="white" />
    </svg>
  )
}
```

### Step 2: Create VideoCell component

```typescript
// src/VideoCell.tsx
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { PlaceholderCanvas } from './PlaceholderCanvas'
import { PlayIcon } from './PlayIcon'
import type { VideoMediaItem, CellLayout } from './types'
import './styles/video-cell.css'

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
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const isVisible = useIntersectionObserver(ref, {
    rootMargin: '100px',
    threshold: 0,
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible
  const hasPlaceholder = video.blurhash || video.thumbhash

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])
  const handleRetry = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setError(false)
    setLoaded(false)
  }, [])

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  // Format duration as M:SS
  const formatDuration = (seconds?: number) => {
    if (!seconds) return null
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div
      ref={ref}
      className="chat-video-cell"
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
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      {/* Placeholder layer */}
      {hasPlaceholder && !loaded && !error && (
        <PlaceholderCanvas
          hash={(video.thumbhash || video.blurhash)!}
          hashType={video.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-video-cell__placeholder"
        />
      )}

      {/* Thumbnail image layer */}
      {shouldLoad && !error && (
        <img
          src={video.thumbnail || video.src}
          alt=""
          className={`chat-video-cell__thumbnail ${loaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}

      {/* Play icon overlay - always visible on thumbnail */}
      {!error && (
        <div className="chat-video-cell__overlay">
          <PlayIcon size={Math.min(48, layout.width * 0.3)} />
        </div>
      )}

      {/* Duration badge */}
      {video.duration && !error && (
        <div className="chat-video-cell__duration">
          {formatDuration(video.duration)}
        </div>
      )}

      {/* Error state */}
      {error && (
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

### Step 3: Create video-cell.css

```css
/* src/styles/video-cell.css */
.chat-video-cell {
  cursor: pointer;
  background: #1a1a1a;
}

.chat-video-cell__placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.chat-video-cell__thumbnail {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.chat-video-cell__thumbnail.loaded {
  opacity: 1;
}

.chat-video-cell__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.chat-video-cell__duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
}

.chat-video-cell__error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  color: #888;
}

.chat-video-cell__error button {
  margin-top: 8px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: #444;
  color: white;
  cursor: pointer;
}
```

### Step 4: Create MediaCell wrapper

```typescript
// src/MediaCell.tsx
import { ImageCell } from './ImageCell'
import { VideoCell } from './VideoCell'
import type { MediaItem, CellLayout } from './types'

interface MediaCellProps {
  item: MediaItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
}

export function MediaCell({ item, layout, lazyLoad, onClick }: MediaCellProps) {
  if (item.type === 'video') {
    return (
      <VideoCell
        video={item}
        layout={layout}
        lazyLoad={lazyLoad}
        onClick={onClick}
      />
    )
  }

  // Default to image (handles inferred type)
  return (
    <ImageCell
      image={item}
      layout={layout}
      lazyLoad={lazyLoad}
      onClick={onClick}
    />
  )
}
```

### Step 5: Update ChatImageGrid

```typescript
// In ChatImageGrid.tsx
import { MediaCell } from './MediaCell'

// Replace ImageCell render with MediaCell
{layout.cells.map((cell) => {
  const item = mediaItems[cell.index]
  if (!item) return null
  return (
    <MediaCell
      key={cell.index}
      item={item}
      layout={cell}
      lazyLoad={lazyLoad}
      onClick={() => onMediaClick?.(cell.index, item)}
    />
  )
})}
```

## Todo List

- [ ] Create PlayIcon.tsx SVG component
- [ ] Create VideoCell.tsx component
- [ ] Create video-cell.css styles
- [ ] Create MediaCell.tsx wrapper
- [ ] Update ChatImageGrid to use MediaCell
- [ ] Add duration formatting utility
- [ ] Write VideoCell.test.tsx
- [ ] Add VideoCell story to Storybook

## Success Criteria

- [ ] Video thumbnail displays in grid
- [ ] Play icon overlay visible and centered
- [ ] Duration badge shows when duration provided
- [ ] Blurhash/thumbhash placeholder works
- [ ] Error state with retry button works
- [ ] Keyboard accessible (Enter/Space triggers onClick)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Play icon too small on tiny cells | Scale icon based on cell width (max 30%) |
| Duration overlaps play icon | Position duration bottom-right, icon centered |
| Video file as thumbnail slow to load | Use thumbnail prop, fallback to first frame |

## Security Considerations

- Video src must be validated URL (same as images)
- thumbnail prop prevents loading full video for preview

## Next Steps

After completion:
1. Proceed to [Phase 3: Video Playback](./phase-03-video-playback.md)
2. VideoCell will expand to include actual video playback
