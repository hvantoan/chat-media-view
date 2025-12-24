# Phase 1: CSS Foundation & Design Tokens

## Objective

Establish CSS custom properties and base glassmorphism styles that will be used throughout the lightbox redesign.

## Tasks

### 1.1 Define CSS Custom Properties

Add design tokens to `src/styles/lightbox.css`:

```css
/* ============================================
   Lightbox Design Tokens
   ============================================ */
:root {
  /* Colors */
  --lightbox-overlay: rgba(0, 0, 0, 0.95);
  --lightbox-glass: rgba(255, 255, 255, 0.15);
  --lightbox-glass-hover: rgba(255, 255, 255, 0.25);
  --lightbox-glass-dark: rgba(0, 0, 0, 0.4);
  --lightbox-border: rgba(255, 255, 255, 0.1);
  --lightbox-border-hover: rgba(255, 255, 255, 0.2);
  --lightbox-text: rgba(255, 255, 255, 0.9);
  --lightbox-text-muted: rgba(255, 255, 255, 0.7);

  /* Blur */
  --lightbox-blur-bg: 48px;      /* blur-3xl equivalent */
  --lightbox-blur-button: 12px;  /* backdrop-blur-md */

  /* Sizing */
  --lightbox-btn-size: 40px;
  --lightbox-nav-size: 48px;
  --lightbox-thumb-size: 56px;
  --lightbox-control-height: 36px;

  /* Spacing */
  --lightbox-gutter: 24px;
  --lightbox-thumb-gap: 12px;

  /* Radius */
  --lightbox-radius-sm: 8px;
  --lightbox-radius-full: 9999px;

  /* Transitions */
  --lightbox-transition-fast: 150ms ease;
  --lightbox-transition-normal: 200ms ease;
  --lightbox-transition-slow: 300ms ease-in-out;

  /* Gradients */
  --lightbox-gradient-top: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%);
  --lightbox-gradient-bottom: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);

  /* Z-index layers */
  --lightbox-z-bg: 0;
  --lightbox-z-gradient: 1;
  --lightbox-z-media: 10;
  --lightbox-z-controls: 20;
  --lightbox-z-toolbar: 30;
}
```

### 1.2 Glassmorphism Button Base

```css
/* ============================================
   Glassmorphism Base Styles
   ============================================ */
.chat-lightbox__glass-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lightbox-glass);
  backdrop-filter: blur(var(--lightbox-blur-button));
  -webkit-backdrop-filter: blur(var(--lightbox-blur-button));
  border: 1px solid var(--lightbox-border);
  color: white;
  cursor: pointer;
  transition:
    background var(--lightbox-transition-normal),
    border-color var(--lightbox-transition-normal),
    transform var(--lightbox-transition-fast);
}

.chat-lightbox__glass-btn:hover {
  background: var(--lightbox-glass-hover);
  border-color: var(--lightbox-border-hover);
}

.chat-lightbox__glass-btn:active {
  transform: scale(0.95);
}

.chat-lightbox__glass-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Rectangular variant (toolbar buttons) */
.chat-lightbox__glass-btn--rect {
  width: var(--lightbox-btn-size);
  height: var(--lightbox-btn-size);
  border-radius: var(--lightbox-radius-sm);
}

/* Circular variant (nav buttons) */
.chat-lightbox__glass-btn--circle {
  width: var(--lightbox-nav-size);
  height: var(--lightbox-nav-size);
  border-radius: var(--lightbox-radius-full);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.05);
}

.chat-lightbox__glass-btn--circle:hover {
  background: var(--lightbox-glass);
  border-color: var(--lightbox-border-hover);
}
```

### 1.3 Pill/Badge Base Styles

```css
/* ============================================
   Pill/Badge Styles (counter, zoom)
   ============================================ */
.chat-lightbox__pill {
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
  letter-spacing: 0.025em;
  user-select: none;
}

/* Zoom control pill (contains buttons) */
.chat-lightbox__pill--interactive {
  padding: 2px;
  gap: 0;
}

.chat-lightbox__pill-btn {
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

.chat-lightbox__pill-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.chat-lightbox__pill-btn:active {
  background: rgba(255, 255, 255, 0.2);
}

.chat-lightbox__zoom-value {
  min-width: 48px;
  text-align: center;
  padding: 0 8px;
}
```

### 1.4 Gradient Overlays

```css
/* ============================================
   Gradient Overlays
   ============================================ */
.chat-lightbox__gradient {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: var(--lightbox-z-gradient);
}

.chat-lightbox__gradient--top {
  top: 0;
  height: 96px; /* h-24 */
  background: var(--lightbox-gradient-top);
}

.chat-lightbox__gradient--bottom {
  bottom: 0;
  height: 192px; /* h-48 */
  background: var(--lightbox-gradient-bottom);
}
```

### 1.5 Backdrop-filter Fallback

```css
/* ============================================
   Fallback for browsers without backdrop-filter
   ============================================ */
@supports not (backdrop-filter: blur(1px)) {
  .chat-lightbox__glass-btn {
    background: rgba(60, 60, 60, 0.9);
  }

  .chat-lightbox__pill {
    background: rgba(30, 30, 30, 0.95);
  }
}
```

## Deliverables

- [ ] CSS custom properties defined
- [ ] Glassmorphism button base styles
- [ ] Pill/badge styles for controls
- [ ] Gradient overlay styles
- [ ] Browser fallbacks for backdrop-filter

## Testing Checklist

- [ ] Variables render correctly in browser
- [ ] Glassmorphism effect visible
- [ ] Transitions smooth
- [ ] Fallback works in Safari < 9

## Notes

- All measurements translated from Tailwind to px values
- Used rgba() for all semi-transparent colors
- Added webkit prefix for backdrop-filter Safari support
