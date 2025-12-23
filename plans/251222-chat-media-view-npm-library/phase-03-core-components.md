# Phase 3: Core Components

**Status:** DONE (251222)

### Changes Made in Phase 3:
- Created ChatImageGrid.tsx (container component)
- Created ImageCell.tsx (lazy loading cell)
- Created useIntersectionObserver.ts hook
- Created chat-image-grid.css styles
- Updated index.ts exports
- Created Storybook stories (8 stories)
- 70 tests passing
- Bundle: 2.31 kB gzipped
**Estimated Effort:** 5-6 hours
**Dependencies:** Phase 1, Phase 2 complete

## Context

- [Main Plan](./plan.md)
- [Phase 2: Grid Layout Engine](./phase-02-grid-layout-engine.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Build ChatImageGrid and ImageCell React components. Implement lazy loading via Intersection Observer. Wire up layout engine to render positioned cells. Add click handlers for lightbox integration.

## Key Insights

- ChatImageGrid: container component, manages layout state
- ImageCell: renders single image with lazy loading
- Intersection Observer for viewport-based loading
- CSS transforms for smooth positioning
- Virtual list ready via height prop

## Requirements

1. ChatImageGrid accepts images array and config props
2. ImageCell lazy loads images when visible
3. Click handler passes index and image to parent
4. CSS applies border-radius per cell
5. Smooth transitions on load
6. Works when pre-calculated height is passed (virtual list)

## Architecture

```
src/
├── ChatImageGrid.tsx       # Main container
├── ImageCell.tsx           # Single image cell
├── hooks/
│   └── useIntersectionObserver.ts
└── styles/
    └── chat-image-grid.css
```

**Component Tree:**
```
<ChatImageGrid images={[...]} onImageClick={fn}>
  {layout.cells.map(cell => (
    <ImageCell
      key={cell.index}
      image={images[cell.index]}
      layout={cell}
      onClick={() => onImageClick(cell.index)}
    />
  ))}
</ChatImageGrid>
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/ChatImageGrid.tsx` | Main component |
| `src/ImageCell.tsx` | Individual image cell |
| `src/hooks/useIntersectionObserver.ts` | Lazy load hook |
| `styles/chat-image-grid.css` | Component styles |
| `src/__tests__/ChatImageGrid.test.tsx` | Component tests |

## Implementation Steps

### Step 1: ChatImageGrid Component

```typescript
// src/ChatImageGrid.tsx
import { useMemo } from 'react'
import { calculateLayout } from './GridLayoutEngine'
import { ImageCell } from './ImageCell'
import type { ChatImageGridProps } from './types'
import './styles/chat-image-grid.css'

export function ChatImageGrid({
  images,
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onImageClick,
  onDownload,
  lazyLoad = true,
  className
}: ChatImageGridProps) {
  const layout = useMemo(
    () => calculateLayout(images, { maxWidth, gap, borderRadius }),
    [images, maxWidth, gap, borderRadius]
  )

  if (images.length === 0) return null

  return (
    <div
      className={`chat-image-grid ${className ?? ''}`}
      style={{
        width: layout.totalWidth,
        height: layout.totalHeight,
        position: 'relative'
      }}
    >
      {layout.cells.map((cell) => (
        <ImageCell
          key={cell.index}
          image={images[cell.index]}
          layout={cell}
          lazyLoad={lazyLoad}
          onClick={() => onImageClick?.(cell.index, images[cell.index])}
          onDownload={onDownload}
        />
      ))}
    </div>
  )
}
```

### Step 2: ImageCell Component

```typescript
// src/ImageCell.tsx
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import type { ImageItem, CellLayout } from './types'

interface ImageCellProps {
  image: ImageItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
  onDownload?: (image: ImageItem, progress: number) => void
}

export function ImageCell({
  image,
  layout,
  lazyLoad,
  onClick,
  onDownload
}: ImageCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const isVisible = useIntersectionObserver(ref, {
    rootMargin: '100px',
    threshold: 0,
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])

  const { borderRadius } = layout
  const radiusStyle = `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`

  return (
    <div
      ref={ref}
      className="chat-image-cell"
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
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {shouldLoad && !error && (
        <img
          src={image.thumbnail || image.src}
          alt={image.alt ?? ''}
          className={`chat-image-cell__img ${loaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazyLoad ? 'lazy' : 'eager'}
        />
      )}
      {error && (
        <div className="chat-image-cell__error">
          Failed to load
        </div>
      )}
    </div>
  )
}
```

### Step 3: Intersection Observer Hook

```typescript
// src/hooks/useIntersectionObserver.ts
import { useState, useEffect, RefObject } from 'react'

interface Options {
  rootMargin?: string
  threshold?: number | number[]
  skip?: boolean
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: Options = {}
): boolean {
  const { rootMargin = '0px', threshold = 0, skip = false } = options
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (skip) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, skip])

  return isVisible
}
```

### Step 4: CSS Styles

```css
/* styles/chat-image-grid.css */
.chat-image-grid {
  --cmv-gap: 2px;
  --cmv-radius-outer: 12px;
  --cmv-radius-inner: 4px;
  --cmv-max-width: 400px;
  --cmv-bg-placeholder: #e0e0e0;
  --cmv-transition-duration: 0.3s;

  position: relative;
  overflow: hidden;
}

.chat-image-cell {
  cursor: pointer;
  background-color: var(--cmv-bg-placeholder);
  transition: transform var(--cmv-transition-duration) ease;
}

.chat-image-cell:hover {
  transform: scale(1.02);
}

.chat-image-cell:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.chat-image-cell__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--cmv-transition-duration) ease;
}

.chat-image-cell__img.loaded {
  opacity: 1;
}

.chat-image-cell__error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #666;
  font-size: 12px;
  background-color: #f0f0f0;
}
```

### Step 5: Type Definitions

```typescript
// src/types.ts (extend from Phase 2)
import type { ReactNode } from 'react'

export interface ChatImageGridProps {
  images: ImageItem[]
  maxWidth?: number
  gap?: number
  borderRadius?: number
  onImageClick?: (index: number, image: ImageItem) => void
  onDownload?: (image: ImageItem, progress: number) => void
  renderPlaceholder?: (image: ImageItem) => ReactNode
  height?: number
  lazyLoad?: boolean
  className?: string
}
```

### Step 6: Component Tests

```typescript
// src/__tests__/ChatImageGrid.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChatImageGrid } from '../ChatImageGrid'

const mockImages = [
  { src: 'test1.jpg', width: 800, height: 600 },
  { src: 'test2.jpg', width: 600, height: 800 }
]

describe('ChatImageGrid', () => {
  it('renders correct number of cells', () => {
    render(<ChatImageGrid images={mockImages} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    expect(cells).toHaveLength(2)
  })

  it('calls onImageClick with index', () => {
    const onClick = vi.fn()
    render(<ChatImageGrid images={mockImages} onImageClick={onClick} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[1])
    expect(onClick).toHaveBeenCalledWith(1, mockImages[1])
  })

  it('renders nothing for empty images', () => {
    const { container } = render(<ChatImageGrid images={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies custom className', () => {
    render(<ChatImageGrid images={mockImages} className="custom" />)
    expect(document.querySelector('.chat-image-grid.custom')).toBeTruthy()
  })
})
```

### Step 7: Storybook Stories

```typescript
// src/ChatImageGrid.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ChatImageGrid } from './ChatImageGrid'

const meta = {
  component: ChatImageGrid,
  title: 'Components/ChatImageGrid',
  parameters: { layout: 'centered' }
} satisfies Meta<typeof ChatImageGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages = [
  { src: 'https://picsum.photos/800/600', width: 800, height: 600 },
  { src: 'https://picsum.photos/600/800', width: 600, height: 800 },
  { src: 'https://picsum.photos/700/700', width: 700, height: 700 }
]

export const OneImage: Story = {
  args: { images: sampleImages.slice(0, 1) }
}

export const TwoImages: Story = {
  args: { images: sampleImages.slice(0, 2) }
}

export const ThreeImages: Story = {
  args: { images: sampleImages }
}

export const FourImages: Story = {
  args: { images: [...sampleImages, sampleImages[0]] }
}

export const FiveImages: Story = {
  args: { images: [...sampleImages, sampleImages[0], sampleImages[1]] }
}
```

## Todo List

- [ ] Create ChatImageGrid.tsx
- [ ] Create ImageCell.tsx
- [ ] Create useIntersectionObserver hook
- [ ] Update chat-image-grid.css with cell styles
- [ ] Extend types.ts with component props
- [ ] Update src/index.ts exports
- [ ] Write ChatImageGrid tests
- [ ] Write ImageCell tests
- [ ] Create Storybook stories (1-5 images)
- [ ] Test lazy loading behavior
- [ ] Verify click handlers work
- [ ] Test keyboard navigation

## Success Criteria

- [x] Grid renders correctly for 1-5 images
- [x] Lazy loading defers image requests
- [x] Click events fire with correct data
- [x] CSS transitions smooth on load
- [x] Storybook demos all variations
- [x] All component tests pass

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Intersection Observer not supported | Fallback to eager loading |
| Image load race conditions | State guards in useEffect |
| CSS specificity conflicts | Namespace with .chat-image-* |

## Security Considerations

- Image src sanitization (browser handles XSS)
- No dangerouslySetInnerHTML usage
- Alt text from user input (safe)

## Next Steps

After Phase 3 complete, proceed to [Phase 4: Enhanced UX](./phase-04-enhanced-ux.md)
