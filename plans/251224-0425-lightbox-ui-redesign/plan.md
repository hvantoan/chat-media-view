# Lightbox UI Redesign Plan

## Overview

Redesign the Lightbox component to match the reference fullscreen image viewer design featuring glassmorphism, blurred background, thumbnail strip, and zoom controls.

**Branch:** `feature/video-support`
**Date:** 2024-12-24
**Status:** Planning

## Current State Analysis

### Existing Files
- `src/Lightbox.tsx` (210 lines) - Main component with basic UI
- `src/LightboxVideo.tsx` (46 lines) - Video player component
- `src/styles/lightbox.css` (151 lines) - Current basic styling

### Current Features
- Open/close functionality with body scroll lock
- Navigation (prev/next with keyboard support)
- Download button with progress indicator
- Video playback support
- ARIA accessibility attributes

### Current UI Issues
- Basic dark overlay background (no blur/glassmorphism)
- Simple text-based close/nav buttons (×, ‹, ›)
- Counter at bottom only (no zoom/thumbnails)
- No ambient blurred background effect

## Target Design Features

From reference HTML:

| Feature | Description |
|---------|-------------|
| Blurred background | Current image as blurred bg layer (blur-3xl, opacity-30) |
| Glassmorphism buttons | rgba(255,255,255,0.15), backdrop-blur, border-white/10 |
| Top-right toolbar | Download + Close buttons at top-12 right-6 |
| Circular nav buttons | 48px rounded circles with glass effect, vertical center |
| Counter pill | "X / Y" format in bg-black/40 rounded-full |
| Zoom controls | Minus/percentage/plus in unified pill |
| Thumbnail strip | 56x56px scrollable thumbnails at bottom |
| Gradient overlays | Top (h-24, from-black/60) + bottom (h-48, from-black/80) |
| Material Icons | download, close, chevron_left/right, remove, add |

## Implementation Strategy

### Approach: Pure CSS (No Tailwind)
Library uses vanilla CSS. All Tailwind classes from reference must be translated to CSS custom properties and classes.

### New Props (Backwards Compatible)

```typescript
interface LightboxProps {
  // Existing props...

  /** Show thumbnail strip at bottom (default: true) */
  showThumbnails?: boolean
  /** Show zoom controls (default: true) */
  showZoomControls?: boolean
  /** Min zoom level (default: 0.5) */
  minZoom?: number
  /** Max zoom level (default: 3) */
  maxZoom?: number
  /** Zoom step increment (default: 0.25) */
  zoomStep?: number
}
```

## Phases

### Phase 1: CSS Foundation & Design Tokens
**File:** `phase-01-css-foundation.md`

Establish CSS custom properties and base glassmorphism styles.

**Deliverables:**
- CSS variables for colors, blur, borders
- Glassmorphism button base styles
- Gradient overlay styles
- Material Icons integration approach

### Phase 2: Component Structure Refactor
**File:** `phase-02-component-structure.md`

Restructure Lightbox.tsx with new layout hierarchy.

**Deliverables:**
- New DOM structure matching reference
- Blurred background layer component
- Reorganized button positions
- Gradient overlay elements

### Phase 3: Navigation & Toolbar UI
**File:** `phase-03-navigation-toolbar.md`

Implement circular nav buttons and top-right toolbar.

**Deliverables:**
- Circular prev/next buttons with icons
- Top-right close + download buttons
- SVG icons or inline icon approach
- Hover/active state animations

### Phase 4: Bottom Control Bar
**File:** `phase-04-bottom-controls.md`

Add counter pill and zoom controls.

**Deliverables:**
- Counter pill component
- Zoom controls with +/- buttons
- useZoom hook for state management
- Zoom transform on media element

### Phase 5: Thumbnail Strip
**File:** `phase-05-thumbnail-strip.md`

Horizontal scrollable thumbnail gallery.

**Deliverables:**
- Thumbnail container with overflow scroll
- Active/inactive thumbnail states
- Click to navigate functionality
- Scroll-to-active behavior

### Phase 6: Polish & Testing
**File:** `phase-06-polish-testing.md`

Final styling, responsiveness, and tests.

**Deliverables:**
- Mobile responsive adjustments
- Transition/animation polish
- Storybook story updates
- Unit test coverage

## File Changes Summary

### Modified Files
| File | Changes |
|------|---------|
| `src/Lightbox.tsx` | Complete UI refactor, new structure, props |
| `src/LightboxVideo.tsx` | Minor: Apply zoom transform |
| `src/styles/lightbox.css` | Complete rewrite with new design system |
| `src/Lightbox.stories.tsx` | New stories for features |
| `src/types.ts` | May add zoom-related types |

### New Files
| File | Purpose |
|------|---------|
| `src/hooks/useZoom.ts` | Zoom state management |
| `src/LightboxThumbnails.tsx` | Thumbnail strip component |
| `src/LightboxIcons.tsx` | SVG icon components |

## Technical Decisions

### Icons Approach
**Decision:** Inline SVG components (not Material Icons font)

**Rationale:**
- No external font dependency
- Tree-shakeable
- Better control over styling
- Consistent with existing DownloadIcon pattern

### Zoom Implementation
**Decision:** CSS transform with state hook

```css
.chat-lightbox__media {
  transform: scale(var(--zoom-level, 1));
  transition: transform 0.2s ease;
}
```

### Thumbnail Generation
**Decision:** Use existing `thumbnail` field from MediaItem type

Already defined in types.ts:
```typescript
interface BaseMediaItem {
  thumbnail?: string  // Already exists!
}
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Backdrop-filter browser support | Older browsers no glassmorphism | Fallback solid bg |
| Performance with blur | Heavy on low-end devices | Use will-change, reduce blur on mobile |
| Zoom + pan complexity | Feature creep | MVP: zoom only, no pan initially |
| Breaking existing usage | User complaints | All new features opt-in via props |

## Success Criteria

- [ ] Visual match with reference design
- [ ] All existing tests pass
- [ ] New features have test coverage
- [ ] Mobile responsive
- [ ] Keyboard navigation preserved
- [ ] ARIA accessibility maintained
- [ ] No performance regression
- [ ] Storybook demonstrates all variants

## Dependencies

- None (pure CSS, no new npm packages)

## Validation Summary

**Validated:** 2024-12-24
**Questions asked:** 8

### Confirmed Decisions
- **Defaults**: Opt-out (default true) - New features enabled by default for better UX
- **Zoom scope**: Scale only, no pan - Deferred pan to future enhancement
- **Landscape mode**: Hide thumbnails in landscape - Maximize media space on phones
- **Thumbnail fallback**: Use src as fallback - No client-side generation needed
- **useZoom export**: Public export - Available for custom implementations
- **Animations**: Single style - No configurable animation presets needed
- **Blur performance**: Keep blur everywhere - Trust browser performance
- **Video zoom**: No zoom for videos - Native controls are better suited

### Action Items
- [x] Plan already reflects confirmed decisions - no changes needed

## Estimated Scope

- **Files modified:** 5
- **Files created:** 3
- **Lines added:** ~400-500
- **Lines modified:** ~200
