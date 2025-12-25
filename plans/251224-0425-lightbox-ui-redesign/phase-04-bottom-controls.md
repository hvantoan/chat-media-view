# Phase 4: Bottom Control Bar (Counter + Zoom)

## Objective

Implement the counter pill and zoom controls in the bottom control bar.

## Tasks

### 4.1 Create useZoom Hook

Create `src/hooks/useZoom.ts`:

```typescript
import { useState, useCallback, useMemo } from 'react'

export interface UseZoomOptions {
  /** Minimum zoom level (default: 0.5) */
  min?: number
  /** Maximum zoom level (default: 3) */
  max?: number
  /** Zoom step increment (default: 0.25) */
  step?: number
  /** Initial zoom level (default: 1) */
  initial?: number
}

export interface UseZoomResult {
  /** Current zoom level */
  zoom: number
  /** Formatted zoom percentage string (e.g., "100%") */
  zoomPercent: string
  /** Zoom in by step amount */
  zoomIn: () => void
  /** Zoom out by step amount */
  zoomOut: () => void
  /** Reset zoom to 1 (100%) */
  resetZoom: () => void
  /** Set zoom to specific value */
  setZoom: (level: number) => void
  /** Whether zoom can increase */
  canZoomIn: boolean
  /** Whether zoom can decrease */
  canZoomOut: boolean
  /** Whether currently zoomed (not at 100%) */
  isZoomed: boolean
}

/**
 * Hook for managing zoom state with constraints
 */
export function useZoom(options: UseZoomOptions = {}): UseZoomResult {
  const {
    min = 0.5,
    max = 3,
    step = 0.25,
    initial = 1
  } = options

  const [zoom, setZoomState] = useState(initial)

  const clamp = useCallback((value: number) => {
    return Math.min(max, Math.max(min, value))
  }, [min, max])

  const zoomIn = useCallback(() => {
    setZoomState(prev => clamp(prev + step))
  }, [clamp, step])

  const zoomOut = useCallback(() => {
    setZoomState(prev => clamp(prev - step))
  }, [clamp, step])

  const resetZoom = useCallback(() => {
    setZoomState(1)
  }, [])

  const setZoom = useCallback((level: number) => {
    setZoomState(clamp(level))
  }, [clamp])

  const zoomPercent = useMemo(() => {
    return `${Math.round(zoom * 100)}%`
  }, [zoom])

  const canZoomIn = zoom < max
  const canZoomOut = zoom > min
  const isZoomed = zoom !== 1

  return {
    zoom,
    zoomPercent,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    canZoomIn,
    canZoomOut,
    isZoomed
  }
}
```

### 4.2 Counter Pill CSS

```css
/* ============================================
   Counter Pill
   ============================================ */
.chat-lightbox__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lightbox-glass-dark);
  backdrop-filter: blur(var(--lightbox-blur-button));
  -webkit-backdrop-filter: blur(var(--lightbox-blur-button));
  border: 1px solid var(--lightbox-border);
  border-radius: var(--lightbox-radius-full);
  height: var(--lightbox-control-height);
  padding: 0 14px;
  color: var(--lightbox-text);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  user-select: none;
  white-space: nowrap;
}
```

### 4.3 Zoom Controls CSS

```css
/* ============================================
   Zoom Controls
   ============================================ */
.chat-lightbox__zoom {
  display: flex;
  align-items: center;
  background: var(--lightbox-glass-dark);
  backdrop-filter: blur(var(--lightbox-blur-button));
  -webkit-backdrop-filter: blur(var(--lightbox-blur-button));
  border: 1px solid var(--lightbox-border);
  border-radius: var(--lightbox-radius-full);
  height: var(--lightbox-control-height);
  padding: 2px;
}

.chat-lightbox__zoom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--lightbox-radius-full);
  background: transparent;
  border: none;
  color: var(--lightbox-text);
  cursor: pointer;
  transition: background var(--lightbox-transition-fast);
}

.chat-lightbox__zoom-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.chat-lightbox__zoom-btn:active:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.chat-lightbox__zoom-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chat-lightbox__zoom-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: -2px;
}

.chat-lightbox__zoom-value {
  min-width: 48px;
  text-align: center;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--lightbox-text);
  user-select: none;
  cursor: pointer;
}

.chat-lightbox__zoom-value:hover {
  color: white;
}
```

### 4.4 Apply Zoom to Media Element

```css
/* Media zoom transform */
.chat-lightbox__media {
  /* ... existing styles ... */
  transform-origin: center center;
  /* Zoom applied via inline style */
}

.chat-lightbox__media--zoomed {
  cursor: grab;
}

.chat-lightbox__media--zoomed:active {
  cursor: grabbing;
}
```

### 4.5 ZoomControls Component

Add to `src/Lightbox.tsx` or create `src/LightboxZoomControls.tsx`:

```tsx
import { ZoomInIcon, ZoomOutIcon } from './LightboxIcons'
import { UseZoomResult } from './hooks/useZoom'

interface ZoomControlsProps {
  zoom: UseZoomResult
}

function ZoomControls({ zoom }: ZoomControlsProps) {
  return (
    <div className="chat-lightbox__zoom">
      <button
        className="chat-lightbox__zoom-btn"
        onClick={zoom.zoomOut}
        disabled={!zoom.canZoomOut}
        aria-label="Zoom out"
        type="button"
      >
        <ZoomOutIcon />
      </button>
      <span
        className="chat-lightbox__zoom-value"
        onClick={zoom.resetZoom}
        role="button"
        tabIndex={0}
        aria-label={`Current zoom: ${zoom.zoomPercent}. Click to reset.`}
        onKeyDown={(e) => e.key === 'Enter' && zoom.resetZoom()}
      >
        {zoom.zoomPercent}
      </span>
      <button
        className="chat-lightbox__zoom-btn"
        onClick={zoom.zoomIn}
        disabled={!zoom.canZoomIn}
        aria-label="Zoom in"
        type="button"
      >
        <ZoomInIcon />
      </button>
    </div>
  )
}
```

### 4.6 Integrate into Lightbox.tsx

```tsx
import { useZoom } from './hooks/useZoom'

export function Lightbox({
  // ... existing props ...
  showZoomControls = true,
  minZoom = 0.5,
  maxZoom = 3,
  zoomStep = 0.25,
}: LightboxProps) {
  // ... existing state ...

  const zoom = useZoom({
    min: minZoom,
    max: maxZoom,
    step: zoomStep
  })

  // Reset zoom on index change
  useEffect(() => {
    zoom.resetZoom()
  }, [currentIndex]) // Note: zoom.resetZoom is stable

  // Apply zoom to media element
  const mediaStyle = {
    transform: `scale(${zoom.zoom})`
  }

  return (
    // ... existing structure ...

    {/* Media with zoom */}
    <img
      src={current.src}
      alt={current.alt ?? ''}
      className={`chat-lightbox__media ${zoom.isZoomed ? 'chat-lightbox__media--zoomed' : ''}`}
      style={mediaStyle}
    />

    {/* Bottom controls */}
    <div className="chat-lightbox__bottom">
      <div className="chat-lightbox__controls">
        {/* Counter */}
        {mediaItems.length > 1 && (
          <div className="chat-lightbox__counter">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}

        {/* Zoom controls (images only) */}
        {showZoomControls && !isVideo && (
          <ZoomControls zoom={zoom} />
        )}
      </div>

      {/* Thumbnails - next phase */}
    </div>
  )
}
```

### 4.7 Update Props Interface

```typescript
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
  /** Show thumbnail strip (default: true) */
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
```

### 4.8 Keyboard Zoom Support

Add to existing keyboard handler:

```typescript
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose()
    return
  }

  // Zoom controls
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

  handleKeyboardNav(e, currentIndex, mediaItems.length, setCurrentIndex)
}, [currentIndex, mediaItems.length, onClose, zoom])
```

## Deliverables

- [ ] useZoom hook created and exported
- [ ] Counter pill styled with glassmorphism
- [ ] Zoom controls UI implemented
- [ ] Zoom applied to media element via transform
- [ ] Keyboard shortcuts for zoom (+, -, 0)
- [ ] Zoom reset on media change
- [ ] Props interface updated
- [ ] Hook exported from index.ts

## Testing Checklist

- [ ] Counter shows correct format "X / Y"
- [ ] Zoom in/out buttons work
- [ ] Zoom percentage displays correctly
- [ ] Click percentage to reset works
- [ ] Zoom limits enforced (min/max)
- [ ] Image scales smoothly
- [ ] Keyboard shortcuts work
- [ ] Zoom resets when changing images
- [ ] Disabled state shows correctly

## Notes

- Zoom only applies to images, not videos (native controls)
- Future enhancement: pinch-to-zoom on touch devices
- Future enhancement: pan when zoomed
