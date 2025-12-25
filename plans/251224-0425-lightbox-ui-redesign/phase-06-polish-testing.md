# Phase 6: Polish & Testing

## Objective

Final styling polish, responsive adjustments, Storybook updates, and test coverage.

## Tasks

### 6.1 Animation & Transition Polish

Add entrance/exit animations:

```css
/* ============================================
   Lightbox Animations
   ============================================ */

/* Fade in overlay */
.chat-lightbox {
  animation: lightbox-fade-in 0.2s ease-out;
}

@keyframes lightbox-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Scale in media */
.chat-lightbox__media {
  animation: lightbox-scale-in 0.3s ease-out;
}

@keyframes lightbox-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Blur background fade in */
.chat-lightbox__blur-bg {
  animation: lightbox-blur-in 0.4s ease-out;
}

@keyframes lightbox-blur-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}

/* Slide up controls */
.chat-lightbox__bottom {
  animation: lightbox-slide-up 0.3s ease-out 0.1s both;
}

@keyframes lightbox-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .chat-lightbox,
  .chat-lightbox__media,
  .chat-lightbox__blur-bg,
  .chat-lightbox__bottom {
    animation: none;
  }

  .chat-lightbox__nav,
  .chat-lightbox__toolbar-btn,
  .chat-lightbox__thumb {
    transition: none;
  }
}
```

### 6.2 Mobile Responsive Refinements

```css
/* ============================================
   Mobile Responsive - Complete
   ============================================ */

/* Small screens (tablets) */
@media (max-width: 768px) {
  :root {
    --lightbox-gutter: 16px;
    --lightbox-btn-size: 36px;
    --lightbox-nav-size: 44px;
  }

  .chat-lightbox__toolbar {
    top: 16px;
    right: 16px;
    gap: 8px;
  }

  .chat-lightbox__bottom {
    bottom: 16px;
    gap: 12px;
  }

  .chat-lightbox__media {
    max-height: calc(100vh - 200px);
  }
}

/* Extra small screens (phones) */
@media (max-width: 480px) {
  :root {
    --lightbox-nav-size: 40px;
    --lightbox-thumb-size: 44px;
    --lightbox-control-height: 32px;
  }

  .chat-lightbox__gradient--top {
    height: 64px;
  }

  .chat-lightbox__gradient--bottom {
    height: 140px;
  }

  .chat-lightbox__controls {
    gap: 8px;
  }

  .chat-lightbox__counter,
  .chat-lightbox__zoom {
    font-size: 11px;
  }

  .chat-lightbox__zoom-btn {
    width: 28px;
    height: 28px;
  }

  .chat-lightbox__zoom-value {
    min-width: 40px;
  }
}

/* Landscape phones - adjust layout */
@media (max-width: 768px) and (orientation: landscape) {
  .chat-lightbox__bottom {
    bottom: 8px;
  }

  .chat-lightbox__thumbnails {
    display: none; /* Hide thumbnails in landscape to save space */
  }

  .chat-lightbox__media {
    max-height: calc(100vh - 80px);
  }
}
```

### 6.3 Touch Interaction Improvements

```css
/* ============================================
   Touch Interactions
   ============================================ */

/* Larger touch targets on mobile */
@media (hover: none) and (pointer: coarse) {
  .chat-lightbox__nav {
    min-width: 48px;
    min-height: 48px;
  }

  .chat-lightbox__toolbar-btn {
    min-width: 44px;
    min-height: 44px;
  }

  .chat-lightbox__thumb {
    min-width: 48px;
    min-height: 48px;
  }

  .chat-lightbox__zoom-btn {
    min-width: 36px;
    min-height: 36px;
  }
}

/* Disable hover effects on touch devices */
@media (hover: none) {
  .chat-lightbox__nav:hover,
  .chat-lightbox__toolbar-btn:hover,
  .chat-lightbox__thumb:hover {
    background: inherit;
    border-color: inherit;
    opacity: inherit;
  }
}
```

### 6.4 Update Storybook Stories

Update `src/Lightbox.stories.tsx`:

```tsx
// Add new stories for new features

export const WithZoomControls: Story = {
  name: 'With Zoom Controls',
  args: {
    items: sampleImages,
    isOpen: true,
    showZoomControls: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox with zoom controls. Use +/- buttons or keyboard (+, -, 0 to reset).'
      }
    }
  }
}

export const WithThumbnails: Story = {
  name: 'With Thumbnail Strip',
  args: {
    items: sampleImages,
    isOpen: true,
    showThumbnails: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Thumbnail strip at bottom for quick navigation. Click any thumbnail to jump to that image.'
      }
    }
  }
}

export const FullFeatured: Story = {
  name: 'Full Featured (New Design)',
  args: {
    items: [...sampleImages, ...sampleVideos.slice(0, 2)],
    isOpen: true,
    showThumbnails: true,
    showZoomControls: true,
    showDownload: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete redesigned lightbox with glassmorphism, thumbnails, zoom, and download.'
      }
    }
  }
}

export const MinimalMode: Story = {
  name: 'Minimal Mode',
  args: {
    items: sampleImages,
    isOpen: true,
    showThumbnails: false,
    showZoomControls: false,
    showDownload: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal lightbox with only navigation and close button.'
      }
    }
  }
}

export const CustomZoomLimits: Story = {
  name: 'Custom Zoom Limits',
  args: {
    items: sampleImages,
    isOpen: true,
    showZoomControls: true,
    minZoom: 0.25,
    maxZoom: 5,
    zoomStep: 0.5
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox with custom zoom limits (25% to 500%, 50% steps).'
      }
    }
  }
}
```

### 6.5 Unit Tests

Create `src/Lightbox.test.tsx` or update existing:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Lightbox } from './Lightbox'
import type { MediaItem } from './types'

const mockItems: MediaItem[] = [
  { type: 'image', src: '/test1.jpg', width: 100, height: 100, alt: 'Test 1' },
  { type: 'image', src: '/test2.jpg', width: 100, height: 100, alt: 'Test 2' },
  { type: 'video', src: '/test.mp4', width: 100, height: 100, alt: 'Test Video' }
]

describe('Lightbox', () => {
  it('renders when open', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Lightbox items={mockItems} isOpen={false} onClose={() => {}} />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows counter for multiple items', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('navigates with prev/next buttons', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )

    fireEvent.click(screen.getByLabelText('Next image'))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Previous image'))
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('shows thumbnails when enabled', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showThumbnails={true} />
    )
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('hides thumbnails when disabled', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showThumbnails={false} />
    )
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows zoom controls for images', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showZoomControls={true} />
    )
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('zoom controls work', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showZoomControls={true} />
    )

    fireEvent.click(screen.getByLabelText('Zoom in'))
    expect(screen.getByText('125%')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Zoom out'))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={onClose} />
    )

    fireEvent.click(screen.getByLabelText('Close lightbox'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking overlay', () => {
    const onClose = vi.fn()
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={onClose} />
    )

    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalled()
  })

  it('keyboard navigation works', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )

    fireEvent.keyDown(document, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })
})
```

### 6.6 Hook Tests

Create `src/hooks/useZoom.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useZoom } from './useZoom'

describe('useZoom', () => {
  it('initializes with default zoom level', () => {
    const { result } = renderHook(() => useZoom())
    expect(result.current.zoom).toBe(1)
    expect(result.current.zoomPercent).toBe('100%')
  })

  it('zooms in by step', () => {
    const { result } = renderHook(() => useZoom({ step: 0.25 }))

    act(() => {
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(1.25)
    expect(result.current.zoomPercent).toBe('125%')
  })

  it('zooms out by step', () => {
    const { result } = renderHook(() => useZoom({ step: 0.25 }))

    act(() => {
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.75)
  })

  it('respects max limit', () => {
    const { result } = renderHook(() => useZoom({ max: 2, step: 0.5 }))

    act(() => {
      result.current.zoomIn()
      result.current.zoomIn()
      result.current.zoomIn()
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(2)
    expect(result.current.canZoomIn).toBe(false)
  })

  it('respects min limit', () => {
    const { result } = renderHook(() => useZoom({ min: 0.5, step: 0.25 }))

    act(() => {
      result.current.zoomOut()
      result.current.zoomOut()
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.5)
    expect(result.current.canZoomOut).toBe(false)
  })

  it('resets to 100%', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      result.current.zoomIn()
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(1.5)

    act(() => {
      result.current.resetZoom()
    })

    expect(result.current.zoom).toBe(1)
    expect(result.current.isZoomed).toBe(false)
  })
})
```

### 6.7 Documentation Update

Update component description in `README.md` or add JSDoc comments:

```tsx
/**
 * Lightbox - Full-screen media viewer with glassmorphism design
 *
 * Features:
 * - Blurred ambient background effect
 * - Glassmorphism buttons and controls
 * - Thumbnail strip for quick navigation
 * - Zoom controls with keyboard support (+, -, 0)
 * - Download with progress indicator
 * - Video playback support
 * - Keyboard navigation (arrows, Escape)
 * - Fully accessible with ARIA attributes
 * - Responsive design for all screen sizes
 *
 * @example
 * <Lightbox
 *   items={mediaItems}
 *   isOpen={true}
 *   onClose={() => setOpen(false)}
 *   showThumbnails={true}
 *   showZoomControls={true}
 * />
 */
```

## Deliverables

- [ ] Entrance/exit animations added
- [ ] Reduced motion preferences respected
- [ ] Mobile responsive refinements complete
- [ ] Touch target sizes appropriate
- [ ] Storybook stories added for new features
- [ ] Unit tests for Lightbox component
- [ ] Unit tests for useZoom hook
- [ ] JSDoc/documentation updated

## Testing Checklist

- [ ] All animations smooth (60fps)
- [ ] Reduced motion respected
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Touch interactions feel native
- [ ] All Storybook stories work
- [ ] All tests pass
- [ ] No console errors/warnings

## Final Verification

Run complete test suite:
```bash
npm run test
npm run build
npm run storybook
```

Visual check in Storybook:
- [ ] Full Featured story matches reference design
- [ ] All interactive features work
- [ ] Mobile viewport works correctly
- [ ] Dark mode / system preference works
