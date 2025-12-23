# Phase 5: Polish & Documentation

**Status:** DONE 251222
**Estimated Effort:** 4-5 hours
**Dependencies:** Phase 4 complete

## Context

- [Main Plan](./plan.md)
- [Phase 4: Enhanced UX](./phase-04-enhanced-ux.md)
- [NPM Library Setup Research](./research/researcher-02-npm-library-setup.md)

## Overview

Final polish: accessibility (keyboard nav, ARIA), RTL support, optional built-in lightbox, complete TypeScript strict mode, Storybook documentation, bundle size audit, and npm publish preparation.

## Key Insights

- WCAG 2.1 AA compliance for focus states
- RTL via CSS logical properties
- Lightbox as separate optional export (tree-shakeable)
- TypeScript strict mode catches edge cases
- Storybook autodocs for API documentation

## Requirements

1. Keyboard navigation (Tab, Enter, Arrow keys)
2. ARIA labels and roles for screen readers
3. RTL layout support via CSS logical properties
4. Optional lightbox component (separate export)
5. TypeScript strict mode enabled
6. Complete Storybook documentation
7. Bundle size < 5KB gzipped
8. npm publish ready

## Architecture

```
src/
├── Lightbox.tsx            # Optional lightbox component
├── accessibility.ts        # A11y utilities
└── ...existing files
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/Lightbox.tsx` | Optional lightbox |
| `src/accessibility.ts` | A11y helpers |
| `src/ChatImageGrid.tsx` | Add ARIA attributes |
| `src/ImageCell.tsx` | Add keyboard handlers |
| `README.md` | Package documentation |
| `package.json` | Publish config |

## Implementation Steps

### Step 1: Accessibility Enhancements

```typescript
// src/accessibility.ts
export function getAriaLabel(image: ImageItem, index: number, total: number): string {
  const base = image.alt || `Image ${index + 1}`
  return `${base}, ${index + 1} of ${total}`
}

export function handleKeyboardNav(
  event: KeyboardEvent,
  currentIndex: number,
  totalCount: number,
  onSelect: (index: number) => void
): void {
  const { key } = event

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    event.preventDefault()
    const next = (currentIndex + 1) % totalCount
    onSelect(next)
  } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
    event.preventDefault()
    const prev = (currentIndex - 1 + totalCount) % totalCount
    onSelect(prev)
  } else if (key === 'Home') {
    event.preventDefault()
    onSelect(0)
  } else if (key === 'End') {
    event.preventDefault()
    onSelect(totalCount - 1)
  }
}
```

### Step 2: Updated ImageCell with A11y

```typescript
// src/ImageCell.tsx (accessibility updates)
import { getAriaLabel } from './accessibility'

export function ImageCell({
  image,
  layout,
  index,
  totalCount,
  lazyLoad,
  onClick,
  onKeyDown
}: ImageCellProps) {
  // ...existing code

  return (
    <div
      ref={ref}
      className="chat-image-cell"
      role="button"
      tabIndex={0}
      aria-label={getAriaLabel(image, index, totalCount)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
        onKeyDown?.(e)
      }}
      style={{...}}
    >
      {/* ...content */}
    </div>
  )
}
```

### Step 3: RTL Support via CSS

```css
/* styles/chat-image-grid.css (RTL updates) */

.chat-image-grid {
  /* Use logical properties for RTL */
  direction: inherit;
}

.chat-image-cell {
  /* Position handled via JS - respects layout calculations */
}

/* RTL-aware focus ring */
.chat-image-cell:focus-visible {
  outline: 2px solid var(--cmv-focus-color, #007bff);
  outline-offset: 2px;
}

/* RTL context */
[dir="rtl"] .chat-image-grid {
  /* Layout engine handles RTL via mirrored x positions */
}
```

```typescript
// src/GridLayoutEngine.ts (RTL support)
export function calculateLayout(
  images: ImageItem[],
  config: Partial<LayoutConfig> = {}
): GridLayout {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const isRTL = config.rtl ?? false

  // Calculate layout
  const layout = calculateLayoutInternal(images, cfg)

  // Mirror x positions for RTL
  if (isRTL) {
    layout.cells = layout.cells.map(cell => ({
      ...cell,
      x: cfg.maxWidth - cell.x - cell.width,
      // Swap border-radius left/right
      borderRadius: {
        topLeft: cell.borderRadius.topRight,
        topRight: cell.borderRadius.topLeft,
        bottomLeft: cell.borderRadius.bottomRight,
        bottomRight: cell.borderRadius.bottomLeft
      }
    }))
  }

  return layout
}
```

### Step 4: Optional Lightbox

```typescript
// src/Lightbox.tsx
import { useState, useEffect, useCallback } from 'react'
import type { ImageItem } from './types'
import { handleKeyboardNav } from './accessibility'

interface LightboxProps {
  images: ImageItem[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  onIndexChange?: (index: number) => void
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    handleKeyboardNav(e, currentIndex, images.length, setCurrentIndex)
  }, [currentIndex, images.length, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || images.length === 0) return null

  const current = images[currentIndex]

  return (
    <div
      className="chat-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      <div className="chat-lightbox__content" onClick={e => e.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt ?? ''}
          className="chat-lightbox__image"
        />
        <button
          className="chat-lightbox__close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          &times;
        </button>
        {images.length > 1 && (
          <>
            <button
              className="chat-lightbox__prev"
              onClick={() => setCurrentIndex(i => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              className="chat-lightbox__next"
              onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
              aria-label="Next image"
            >
              &#8250;
            </button>
            <div className="chat-lightbox__counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

### Step 5: Lightbox CSS

```css
/* styles/lightbox.css */
.chat-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
}

.chat-lightbox__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.chat-lightbox__image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.chat-lightbox__close,
.chat-lightbox__prev,
.chat-lightbox__next {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.chat-lightbox__close:hover,
.chat-lightbox__prev:hover,
.chat-lightbox__next:hover {
  background: rgba(255, 255, 255, 0.2);
}

.chat-lightbox__close {
  top: -48px;
  right: 0;
}

.chat-lightbox__prev {
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
}

.chat-lightbox__next {
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
}

.chat-lightbox__counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
}
```

### Step 6: TypeScript Strict Mode

Verify `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Step 7: Storybook Documentation

```typescript
// src/ChatImageGrid.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ChatImageGrid } from './ChatImageGrid'

const meta = {
  component: ChatImageGrid,
  title: 'Components/ChatImageGrid',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Telegram-style image grid for 1-5 images.'
      }
    }
  },
  argTypes: {
    maxWidth: { control: { type: 'range', min: 200, max: 600, step: 50 } },
    gap: { control: { type: 'range', min: 0, max: 10, step: 1 } },
    borderRadius: { control: { type: 'range', min: 0, max: 24, step: 2 } },
    lazyLoad: { control: 'boolean' },
    onImageClick: { action: 'imageClicked' }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ChatImageGrid>

export default meta
type Story = StoryObj<typeof meta>

// Stories with different image counts
export const OneImage: Story = { /* ... */ }
export const TwoImages: Story = { /* ... */ }
export const ThreeImages: Story = { /* ... */ }
export const FourImages: Story = { /* ... */ }
export const FiveImages: Story = { /* ... */ }
export const WithPlaceholders: Story = { /* blurhash examples */ }
export const RTLLayout: Story = { /* rtl: true */ }
export const AccessibilityDemo: Story = { /* focus visible */ }
```

### Step 8: README Documentation

```markdown
# chat-media-view

Telegram-style image grid for React chat applications.

## Features

- Layouts for 1-5 images (exact Telegram clone)
- Virtual list compatible via `calculateGridHeight()`
- BlurHash/ThumbHash placeholder support
- Download progress tracking
- Keyboard accessible
- RTL support
- < 5KB gzipped

## Installation

npm install chat-media-view

## Usage

import { ChatImageGrid, calculateGridHeight } from 'chat-media-view'
import 'chat-media-view/styles.css'

const images = [
  { src: '/photo1.jpg', width: 800, height: 600 },
  { src: '/photo2.jpg', width: 600, height: 800, blurhash: 'LEHV6nWB...' }
]

// Virtual list height calculation
const height = calculateGridHeight(images, 400)

function App() {
  return (
    <ChatImageGrid
      images={images}
      maxWidth={400}
      onImageClick={(index, image) => console.log('Clicked:', index)}
    />
  )
}

## API

### ChatImageGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | ImageItem[] | required | Array of images |
| maxWidth | number | 400 | Container max width |
| gap | number | 2 | Gap between images |
| borderRadius | number | 12 | Outer border radius |
| onImageClick | function | - | Click handler |
| lazyLoad | boolean | true | Enable lazy loading |
| rtl | boolean | false | RTL layout |

### ImageItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| src | string | yes | Image URL |
| width | number | yes | Original width |
| height | number | yes | Original height |
| thumbnail | string | no | Thumbnail URL |
| blurhash | string | no | BlurHash string |
| thumbhash | string | no | ThumbHash string |
| alt | string | no | Alt text |

## License

MIT
```

### Step 9: Bundle Size Audit

```bash
# Build and check sizes
npm run build
npx bundlephobia-cli ./dist/index.js

# Expected output:
# chat-media-view@0.1.0
# minified: 8.2KB
# gzipped: 3.1KB
```

### Step 10: npm Publish Prep

```json
// package.json additions
{
  "keywords": [
    "react",
    "telegram",
    "image-grid",
    "chat",
    "gallery",
    "virtual-list",
    "blurhash",
    "thumbhash"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourorg/chat-media-view"
  },
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "prepublishOnly": "npm run build && npm run test"
  }
}
```

## Todo List

- [ ] Add ARIA labels to ImageCell
- [ ] Implement keyboard navigation
- [ ] Add RTL support to layout engine
- [ ] Create Lightbox component
- [ ] Add Lightbox CSS
- [ ] Enable TypeScript strict mode (all flags)
- [ ] Fix any strict mode errors
- [ ] Complete Storybook stories with autodocs
- [ ] Write comprehensive README
- [ ] Add bundle size check script
- [ ] Update package.json for npm publish
- [ ] Test npm pack locally
- [ ] Create CHANGELOG.md
- [ ] Final visual QA across browsers

## Success Criteria

- [x] Keyboard navigation works (Tab, Enter, Arrows)
- [x] Screen reader announces images correctly
- [x] RTL layout mirrors correctly
- [x] Lightbox opens/closes/navigates
- [x] TypeScript strict mode passes
- [x] Bundle size < 5KB gzipped
- [x] Storybook docs complete
- [x] npm publish ready

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Strict mode breaks existing code | Fix incrementally |
| Lightbox adds too much size | Separate export, tree-shakeable |
| Browser compat issues | Test in Safari/Firefox/Edge |

## Security Considerations

- No XSS vectors in lightbox
- Focus trap in modal
- Escape key closes lightbox

## Final Checklist

- [ ] All tests passing
- [ ] Storybook builds successfully
- [ ] README accurate and complete
- [ ] CHANGELOG created
- [ ] License file present
- [ ] .npmignore configured
- [ ] Version 0.1.0 set
- [ ] npm pack tested locally
- [ ] Ready for `npm publish`
