# Phase 5: Lightbox Video Support

## Context

- [Plan Overview](./plan.md)
- [Phase 3: Video Playback](./phase-03-video-playback.md)
- Current: [Lightbox.tsx](../../src/Lightbox.tsx)

## Overview

Extend Lightbox component to support video playback. When user opens lightbox for a video, show fullscreen video player with controls. Pause video on navigate away.

## Key Insights

1. Lightbox currently accepts `ImageItem[]` - needs `MediaItem[]`
2. Video in lightbox should auto-play (muted initially for browser compat)
3. Pause current video when navigating to next/prev
4. Fullscreen video uses object-fit: contain (not cover)
5. Show download button for both images and videos

## Requirements

- US-02: Video playback in lightbox with full controls
- US-04: Download button in lightbox for all media

## Architecture

```
Lightbox
├── LightboxImage (for type: 'image')
│   └── <img>
└── LightboxVideo (for type: 'video')
    └── <video controls autoplay muted>

Navigation pauses current video before switching
Download uses enhanced DownloadManager
```

## Related Files

| File | Action |
|------|--------|
| `src/Lightbox.tsx` | Update - support MediaItem, add video |
| `src/LightboxVideo.tsx` | Create - video player for lightbox |
| `src/styles/lightbox.css` | Update - video styles |

## Implementation Steps

### Step 1: Update Lightbox props

```typescript
// src/Lightbox.tsx
import type { MediaItem, ImageItem } from './types'

export interface LightboxProps {
  /** Array of media items to display */
  items: MediaItem[]
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
```

### Step 2: Create LightboxVideo component

```typescript
// src/LightboxVideo.tsx
import { useRef, useEffect } from 'react'
import type { VideoMediaItem } from './types'

interface LightboxVideoProps {
  video: VideoMediaItem
  isActive: boolean
}

export function LightboxVideo({ video, isActive }: LightboxVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Pause when not active (navigated away)
  useEffect(() => {
    if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }, [isActive])

  // Autoplay when becomes active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - user must interact
      })
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      className="chat-lightbox__video"
      src={video.src}
      controls
      autoPlay
      muted={video.muted ?? true}
      playsInline
      onClick={(e) => e.stopPropagation()}
    >
      Your browser does not support video playback.
    </video>
  )
}
```

### Step 3: Update Lightbox component

```typescript
// src/Lightbox.tsx
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import type { MediaItem, ImageItem } from './types'
import { handleKeyboardNav } from './accessibility'
import { LightboxVideo } from './LightboxVideo'
import { useDownload } from './hooks/useDownload'
import './styles/lightbox.css'

// Helper to normalize items
function normalizeMediaItem(item: ImageItem | MediaItem): MediaItem {
  if ('type' in item) return item
  return { ...item, type: 'image' as const }
}

export function Lightbox({
  items,
  images, // deprecated
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
  onDownload,
  showDownload = true
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const { download, progress, status, cancel, reset } = useDownload()

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
      link.download = current.alt || `media-${currentIndex + 1}`
      link.click()
    } catch (e) {
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
          <LightboxVideo
            video={current}
            isActive={true}
          />
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

// Simple download icon
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
```

### Step 4: Update lightbox.css

```css
/* Add to src/styles/lightbox.css */

.chat-lightbox__video {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  background: #000;
}

.chat-lightbox__download {
  position: absolute;
  top: 16px;
  right: 60px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-lightbox__download:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.7);
}

.chat-lightbox__download:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-lightbox__download span {
  font-size: 11px;
  font-weight: 600;
}
```

## Todo List

- [ ] Update LightboxProps for MediaItem
- [ ] Create LightboxVideo component
- [ ] Add video pause on navigation
- [ ] Add video autoplay on active
- [ ] Implement download button
- [ ] Add download progress display
- [ ] Update lightbox.css
- [ ] Export LightboxVideo from index.ts
- [ ] Write LightboxVideo.test.tsx
- [ ] Update Lightbox stories

## Success Criteria

- [ ] Video plays in lightbox fullscreen
- [ ] Video pauses when navigating to another item
- [ ] Video autoplays (muted) when opening
- [ ] Download button works for images
- [ ] Download button works for videos
- [ ] Download shows progress percentage
- [ ] Keyboard navigation still works
- [ ] Backwards compat with `images` prop

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Autoplay blocked | Start muted, browser allows muted autoplay |
| Large video downloads slow | Show progress, allow cancel |
| Video doesn't pause on close | Unmount removes video element |
| Multiple videos loaded | Only current video loaded at a time |

## Security Considerations

- Same CORS rules for video src
- Download respects same-origin policy

## Next Steps

After completion:
1. Proceed to [Phase 6: Testing & Documentation](./phase-06-testing-docs.md)
2. Comprehensive testing and README updates
