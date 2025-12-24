# Phase 3: Navigation & Toolbar UI

## Objective

Implement circular navigation buttons and glassmorphism toolbar with icon components.

## Tasks

### 3.1 Create Icon Components

Create `src/LightboxIcons.tsx`:

```tsx
/**
 * SVG icon components for Lightbox
 * Inline SVGs for tree-shaking and styling control
 */

interface IconProps {
  size?: number
  className?: string
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function DownloadIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function ChevronLeftIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15,18 9,12 15,6" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9,6 15,12 9,18" />
    </svg>
  )
}

export function ZoomInIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function ZoomOutIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
```

### 3.2 Navigation Button CSS

```css
/* ============================================
   Navigation Buttons (Prev/Next)
   ============================================ */
.chat-lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--lightbox-nav-size);
  height: var(--lightbox-nav-size);
  border-radius: var(--lightbox-radius-full);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(var(--lightbox-blur-button));
  -webkit-backdrop-filter: blur(var(--lightbox-blur-button));
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition:
    background var(--lightbox-transition-normal),
    border-color var(--lightbox-transition-normal),
    transform var(--lightbox-transition-fast);
  z-index: var(--lightbox-z-controls);
}

.chat-lightbox__nav:hover {
  background: var(--lightbox-glass);
  border-color: var(--lightbox-border-hover);
}

.chat-lightbox__nav:active {
  transform: translateY(-50%) scale(0.95);
}

.chat-lightbox__nav:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.chat-lightbox__nav--prev {
  left: 16px;
}

.chat-lightbox__nav--next {
  right: 16px;
}

/* Icon hover animation */
.chat-lightbox__nav--prev:hover svg {
  transform: translateX(-2px);
}

.chat-lightbox__nav--next:hover svg {
  transform: translateX(2px);
}

.chat-lightbox__nav svg {
  transition: transform var(--lightbox-transition-fast);
}
```

### 3.3 Toolbar CSS

```css
/* ============================================
   Toolbar (Download + Close)
   ============================================ */
.chat-lightbox__toolbar {
  position: absolute;
  top: 48px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: var(--lightbox-z-toolbar);
}

.chat-lightbox__toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--lightbox-btn-size);
  height: var(--lightbox-btn-size);
  border-radius: var(--lightbox-radius-sm);
  background: var(--lightbox-glass);
  backdrop-filter: blur(var(--lightbox-blur-button));
  -webkit-backdrop-filter: blur(var(--lightbox-blur-button));
  border: 1px solid var(--lightbox-border);
  color: white;
  cursor: pointer;
  transition:
    background var(--lightbox-transition-normal),
    transform var(--lightbox-transition-fast);
}

.chat-lightbox__toolbar-btn:hover {
  background: var(--lightbox-glass-hover);
}

.chat-lightbox__toolbar-btn:active {
  transform: scale(0.95);
}

.chat-lightbox__toolbar-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.chat-lightbox__toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Download progress state */
.chat-lightbox__toolbar-btn--downloading {
  position: relative;
}

.chat-lightbox__download-progress {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
}
```

### 3.4 Mobile Responsive Navigation

```css
/* ============================================
   Mobile Responsive
   ============================================ */
@media (max-width: 640px) {
  .chat-lightbox__toolbar {
    top: 16px;
    right: 16px;
    gap: 8px;
  }

  .chat-lightbox__nav {
    width: 40px;
    height: 40px;
  }

  .chat-lightbox__nav--prev {
    left: 8px;
  }

  .chat-lightbox__nav--next {
    right: 8px;
  }

  /* Optional: move nav to bottom on very small screens */
  @media (max-width: 480px) {
    .chat-lightbox__nav {
      top: auto;
      bottom: 100px;
      transform: none;
    }

    .chat-lightbox__nav:active {
      transform: scale(0.95);
    }
  }
}
```

### 3.5 Update Lightbox.tsx with Icons

```tsx
import {
  CloseIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from './LightboxIcons'

// In render:

{/* Top toolbar */}
<div className="chat-lightbox__toolbar">
  {showDownload && (
    <button
      className="chat-lightbox__toolbar-btn"
      onClick={handleDownload}
      aria-label={`Download ${isVideo ? 'video' : 'image'}`}
      type="button"
      disabled={status === 'downloading'}
    >
      {status === 'downloading' ? (
        <span className="chat-lightbox__download-progress">
          {progress?.percentage ?? 0}%
        </span>
      ) : (
        <DownloadIcon />
      )}
    </button>
  )}
  <button
    className="chat-lightbox__toolbar-btn"
    onClick={onClose}
    aria-label="Close lightbox"
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
      aria-label="Previous image"
      type="button"
    >
      <ChevronLeftIcon />
    </button>
    <button
      className="chat-lightbox__nav chat-lightbox__nav--next"
      onClick={goNext}
      aria-label="Next image"
      type="button"
    >
      <ChevronRightIcon />
    </button>
  </>
)}
```

## Deliverables

- [ ] LightboxIcons.tsx created with all icon components
- [ ] Navigation button styles (circular, glassmorphism)
- [ ] Toolbar button styles (rectangular, top-right)
- [ ] Hover/active state animations
- [ ] Mobile responsive adjustments
- [ ] Icons exported from index.ts

## Testing Checklist

- [ ] Icons render correctly at various sizes
- [ ] Navigation buttons visible and clickable
- [ ] Toolbar positioned correctly
- [ ] Hover effects work
- [ ] Active (press) scale effect works
- [ ] Download progress displays correctly
- [ ] Focus states visible for accessibility
- [ ] Mobile layout works

## Notes

- Using Feather-style icons (stroke-based, clean)
- Icons are 20px for toolbar, 24px for nav
- Chevron icons have subtle translate animation on hover
