# Phase 2: Component Structure Refactor

## Objective

Restructure Lightbox.tsx DOM hierarchy to match the reference design layout.

## Current Structure

```jsx
<div className="chat-lightbox">
  <div className="chat-lightbox__content">
    <img/video />
    <button close />
    <button download />
    <button prev />
    <button next />
    <div counter />
  </div>
</div>
```

## Target Structure

```jsx
<div className="chat-lightbox">
  {/* Blurred ambient background */}
  <div className="chat-lightbox__blur-bg" style={{ backgroundImage }} />

  {/* Gradient overlays */}
  <div className="chat-lightbox__gradient chat-lightbox__gradient--top" />
  <div className="chat-lightbox__gradient chat-lightbox__gradient--bottom" />

  {/* Main content area */}
  <div className="chat-lightbox__stage">
    {/* Media (image or video) */}
    <div className="chat-lightbox__media-wrapper">
      <img/video className="chat-lightbox__media" />
    </div>

    {/* Top toolbar (download + close) */}
    <div className="chat-lightbox__toolbar">
      <button download />
      <button close />
    </div>

    {/* Side navigation */}
    <button className="chat-lightbox__nav chat-lightbox__nav--prev" />
    <button className="chat-lightbox__nav chat-lightbox__nav--next" />

    {/* Bottom controls */}
    <div className="chat-lightbox__bottom">
      {/* Control bar (counter + zoom) */}
      <div className="chat-lightbox__controls">
        <div className="chat-lightbox__counter" />
        <div className="chat-lightbox__zoom" />
      </div>

      {/* Thumbnail strip */}
      <div className="chat-lightbox__thumbnails" />
    </div>
  </div>
</div>
```

## Tasks

### 2.1 Update Base Container CSS

```css
.chat-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--lightbox-overlay);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: white;
  overflow: hidden;
}
```

### 2.2 Blurred Background Layer

```css
.chat-lightbox__blur-bg {
  position: absolute;
  inset: 0;
  z-index: var(--lightbox-z-bg);
  background-size: cover;
  background-position: center;
  filter: blur(var(--lightbox-blur-bg));
  opacity: 0.3;
  pointer-events: none;
  transform: scale(1.1); /* Prevent blur edge artifacts */
}
```

**TSX Implementation:**

```tsx
// Get background image URL (use current media or thumbnail)
const bgImageUrl = current.thumbnail || current.src

<div
  className="chat-lightbox__blur-bg"
  style={{ backgroundImage: `url(${bgImageUrl})` }}
  aria-hidden="true"
/>
```

### 2.3 Stage Container

```css
.chat-lightbox__stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--lightbox-z-media);
  padding: 0;
}

@media (min-width: 640px) {
  .chat-lightbox__stage {
    padding: 0 16px;
  }
}
```

### 2.4 Media Wrapper & Media Element

```css
.chat-lightbox__media-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Space for bottom controls on mobile */
  padding-bottom: 80px;
}

@media (min-width: 640px) {
  .chat-lightbox__media-wrapper {
    padding-bottom: 0;
  }
}

.chat-lightbox__media {
  max-width: 100%;
  max-height: calc(100vh - 160px); /* Leave room for controls */
  object-fit: contain;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform var(--lightbox-transition-slow);
  touch-action: manipulation;
  cursor: zoom-in;
}

/* When zoomed in */
.chat-lightbox__media--zoomed {
  cursor: zoom-out;
}
```

### 2.5 Toolbar Container (Top Right)

```css
.chat-lightbox__toolbar {
  position: absolute;
  top: 48px;  /* top-12 */
  right: 24px; /* right-6 */
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: var(--lightbox-z-toolbar);
}
```

### 2.6 Bottom Controls Container

```css
.chat-lightbox__bottom {
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: var(--lightbox-z-controls);
  pointer-events: none;
}

.chat-lightbox__bottom > * {
  pointer-events: auto;
}

.chat-lightbox__controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

### 2.7 Updated Lightbox.tsx Structure

```tsx
export function Lightbox({
  items,
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
  onDownload,
  showDownload = true,
  showThumbnails = true,    // NEW
  showZoomControls = true,  // NEW
}: LightboxProps) {
  // ... existing state/hooks ...

  if (!isOpen || mediaItems.length === 0) return null

  const current = mediaItems[currentIndex]
  if (!current) return null

  const isVideo = current.type === 'video'
  const bgImageUrl = current.thumbnail || current.src

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
      <div className="chat-lightbox__stage" onClick={e => e.stopPropagation()}>
        {/* Media content */}
        <div className="chat-lightbox__media-wrapper">
          {isVideo ? (
            <LightboxVideo video={current} isActive={true} />
          ) : (
            <img
              src={current.src}
              alt={current.alt ?? ''}
              className="chat-lightbox__media"
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
              <DownloadIcon />
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
              className="chat-lightbox__nav chat-lightbox__nav--prev"
              onClick={goPrev}
              aria-label="Previous"
              type="button"
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="chat-lightbox__nav chat-lightbox__nav--next"
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

            {/* Zoom controls - Phase 4 */}
            {showZoomControls && !isVideo && (
              <ZoomControls /> // Placeholder
            )}
          </div>

          {/* Thumbnails - Phase 5 */}
          {showThumbnails && mediaItems.length > 1 && (
            <Thumbnails /> // Placeholder
          )}
        </div>
      </div>
    </div>
  )
}
```

## Deliverables

- [ ] Updated DOM structure in Lightbox.tsx
- [ ] Blurred background layer implemented
- [ ] Gradient overlays added
- [ ] Stage container with proper positioning
- [ ] Toolbar repositioned to top-right
- [ ] Bottom controls container structure
- [ ] New optional props added to interface

## Testing Checklist

- [ ] Component renders without errors
- [ ] Background blur effect visible
- [ ] Gradients render at top/bottom
- [ ] Existing functionality preserved
- [ ] Click-outside-to-close still works
- [ ] Keyboard navigation still works

## Notes

- Placeholders for ZoomControls and Thumbnails (implemented in later phases)
- Background image uses thumbnail if available (performance)
- Added scale(1.1) to blur layer to prevent edge artifacts
