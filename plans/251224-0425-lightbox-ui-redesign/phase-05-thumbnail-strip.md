# Phase 5: Thumbnail Strip

## Objective

Implement horizontal scrollable thumbnail gallery at the bottom of the lightbox.

## Tasks

### 5.1 Thumbnail Strip CSS

```css
/* ============================================
   Thumbnail Strip
   ============================================ */
.chat-lightbox__thumbnails {
  width: 100%;
  padding: 0 16px;
}

.chat-lightbox__thumbnails-scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  padding-bottom: 8px;
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.chat-lightbox__thumbnails-scroll::-webkit-scrollbar {
  display: none;
}

.chat-lightbox__thumbnails-list {
  display: flex;
  align-items: center;
  gap: var(--lightbox-thumb-gap);
  padding: 0 8px;
  min-width: max-content;
}

/* Individual thumbnail */
.chat-lightbox__thumb {
  position: relative;
  width: var(--lightbox-thumb-size);
  height: var(--lightbox-thumb-size);
  flex-shrink: 0;
  border-radius: var(--lightbox-radius-sm);
  overflow: hidden;
  border: 1px solid var(--lightbox-border);
  opacity: 0.6;
  cursor: pointer;
  transition:
    opacity var(--lightbox-transition-normal),
    border-color var(--lightbox-transition-normal),
    transform var(--lightbox-transition-fast);
  background: rgba(0, 0, 0, 0.3);
}

.chat-lightbox__thumb:hover {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.5);
}

.chat-lightbox__thumb:active {
  transform: scale(0.95);
}

.chat-lightbox__thumb:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  opacity: 1;
}

/* Active thumbnail */
.chat-lightbox__thumb--active {
  opacity: 1;
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}

.chat-lightbox__thumb--active:hover {
  border-color: white;
}

/* Thumbnail image */
.chat-lightbox__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Video indicator on thumbnail */
.chat-lightbox__thumb-video-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
}

.chat-lightbox__thumb-video-badge svg {
  width: 10px;
  height: 10px;
  fill: white;
}
```

### 5.2 LightboxThumbnails Component

Create `src/LightboxThumbnails.tsx`:

```tsx
import { useRef, useEffect, useCallback } from 'react'
import type { MediaItem } from './types'

interface LightboxThumbnailsProps {
  items: MediaItem[]
  currentIndex: number
  onSelect: (index: number) => void
}

/**
 * Small play icon for video thumbnails
 */
function VideoIndicator() {
  return (
    <div className="chat-lightbox__thumb-video-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
}

/**
 * Horizontal scrollable thumbnail strip
 */
export function LightboxThumbnails({
  items,
  currentIndex,
  onSelect
}: LightboxThumbnailsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = thumbRefs.current[currentIndex]
    if (activeThumb && scrollRef.current) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [currentIndex])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(index)
    }
    // Arrow key navigation within thumbnails
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      thumbRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < items.length - 1) {
      e.preventDefault()
      thumbRefs.current[index + 1]?.focus()
    }
  }, [items.length, onSelect])

  const getThumbnailUrl = (item: MediaItem): string => {
    // Prefer thumbnail, fallback to src
    return item.thumbnail || item.src
  }

  return (
    <div className="chat-lightbox__thumbnails">
      <div
        ref={scrollRef}
        className="chat-lightbox__thumbnails-scroll"
        role="listbox"
        aria-label="Image thumbnails"
      >
        <div className="chat-lightbox__thumbnails-list">
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isVideo = item.type === 'video'

            return (
              <button
                key={index}
                ref={el => { thumbRefs.current[index] = el }}
                className={`chat-lightbox__thumb ${isActive ? 'chat-lightbox__thumb--active' : ''}`}
                onClick={() => onSelect(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                role="option"
                aria-selected={isActive}
                aria-label={item.alt || `${isVideo ? 'Video' : 'Image'} ${index + 1}`}
                type="button"
              >
                <img
                  src={getThumbnailUrl(item)}
                  alt=""
                  className="chat-lightbox__thumb-img"
                  loading="lazy"
                />
                {isVideo && <VideoIndicator />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

### 5.3 Integrate into Lightbox.tsx

```tsx
import { LightboxThumbnails } from './LightboxThumbnails'

export function Lightbox({
  // ... existing props ...
  showThumbnails = true,
}: LightboxProps) {
  // ... existing logic ...

  const handleThumbnailSelect = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  return (
    // ... existing structure ...

    {/* Bottom controls */}
    <div className="chat-lightbox__bottom">
      <div className="chat-lightbox__controls">
        {/* Counter */}
        {mediaItems.length > 1 && (
          <div className="chat-lightbox__counter">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}

        {/* Zoom controls */}
        {showZoomControls && !isVideo && (
          <ZoomControls zoom={zoom} />
        )}
      </div>

      {/* Thumbnail strip */}
      {showThumbnails && mediaItems.length > 1 && (
        <LightboxThumbnails
          items={mediaItems}
          currentIndex={currentIndex}
          onSelect={handleThumbnailSelect}
        />
      )}
    </div>
  )
}
```

### 5.4 Mobile Responsive Thumbnails

```css
/* ============================================
   Mobile Responsive Thumbnails
   ============================================ */
@media (max-width: 640px) {
  .chat-lightbox__thumbnails {
    padding: 0 8px;
  }

  .chat-lightbox__thumb {
    width: 48px;
    height: 48px;
  }

  .chat-lightbox__thumbnails-list {
    gap: 8px;
  }
}

/* Very small screens: smaller thumbs */
@media (max-width: 380px) {
  .chat-lightbox__thumb {
    width: 40px;
    height: 40px;
  }
}
```

### 5.5 Optional: Fade Edges (Scroll Indicator)

```css
/* Optional: gradient fade on edges to indicate scroll */
.chat-lightbox__thumbnails {
  position: relative;
}

.chat-lightbox__thumbnails::before,
.chat-lightbox__thumbnails::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 8px;
  width: 32px;
  pointer-events: none;
  z-index: 1;
}

.chat-lightbox__thumbnails::before {
  left: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.chat-lightbox__thumbnails::after {
  right: 0;
  background: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%);
}

/* Hide edge fade on mobile (not enough content usually) */
@media (max-width: 640px) {
  .chat-lightbox__thumbnails::before,
  .chat-lightbox__thumbnails::after {
    display: none;
  }
}
```

### 5.6 Export Component

Update `src/index.ts`:

```typescript
export { LightboxThumbnails } from './LightboxThumbnails'
```

## Deliverables

- [ ] LightboxThumbnails.tsx component created
- [ ] Thumbnail strip CSS with glassmorphism
- [ ] Active/inactive thumbnail states
- [ ] Video indicator badge
- [ ] Auto-scroll to active thumbnail
- [ ] Keyboard navigation within thumbnails
- [ ] Mobile responsive sizing
- [ ] Component exported from index.ts

## Testing Checklist

- [ ] Thumbnails render for each media item
- [ ] Active thumbnail has white border
- [ ] Clicking thumbnail changes current media
- [ ] Scroll container scrolls horizontally
- [ ] Auto-scrolls when navigating with arrows
- [ ] Video indicator shows on video thumbnails
- [ ] Keyboard navigation works (Enter, Space, Arrows)
- [ ] Thumbnails use thumbnail URL when available
- [ ] Lazy loading works for off-screen thumbnails
- [ ] Mobile responsive (smaller thumbnails)

## Notes

- Uses `thumbnail` property from MediaItem when available
- Falls back to full `src` if no thumbnail (works but slower)
- Video indicator is a small play icon badge
- Scroll behavior is smooth and centers active thumb
