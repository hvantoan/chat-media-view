# Brainstorm Report: chat-media-view NPM Library

**Date:** 2024-12-22
**Status:** Agreed
**Package Name:** `chat-media-view`

---

## Problem Statement

Build an npm library for React Web that displays chat images in a Telegram-style grid layout (1-5 images), optimized for virtual list integration with download handler support.

---

## Requirements

| Requirement | Decision |
|-------------|----------|
| Platform | React Web (browser) |
| Virtual List | Agnostic - works with any |
| Layout | Exact Telegram clone |
| Placeholder | ThumbHash/BlurHash |
| Lightbox | Headless (user controls) |
| Download | Fetch + ReadableStream with progress |

---

## Telegram Grid Layout

```
1 img: Full width
2 img: 50% | 50% side-by-side
3 img: 66% left | 33% right (2 stacked)
4 img: 2x2 grid
5 img: 2 top + 3 bottom
```

- Gap: 2px
- Border radius: 12px outer, 4px inner
- Max width: ~400px (configurable)

---

## Architecture

```
chat-media-view/
├── src/
│   ├── ChatImageGrid.tsx       # Main component
│   ├── ImageCell.tsx           # Single image + lazy load
│   ├── GridLayoutEngine.ts     # Layout calculations
│   ├── BlurHashCanvas.tsx      # Placeholder renderer
│   ├── DownloadManager.ts      # Download with progress
│   ├── calculateGridHeight.ts  # Virtual list utility
│   └── index.ts                # Public exports
├── styles/
│   └── chat-image-grid.css     # Vanilla CSS + custom properties
└── types/
    └── index.d.ts
```

---

## API Design

```tsx
interface ChatImageGridProps {
  images: ImageItem[];
  maxWidth?: number;              // default: 400
  gap?: number;                   // default: 2
  borderRadius?: number;          // default: 12
  onImageClick?: (index: number, image: ImageItem) => void;
  onDownload?: (image: ImageItem, progress: number) => void;
  renderPlaceholder?: (image: ImageItem) => ReactNode;
  height?: number;                // Pre-calc for virtual list
  lazyLoad?: boolean;             // default: true
}

interface ImageItem {
  src: string;
  thumbnail?: string;
  blurhash?: string;
  thumbhash?: string;
  width: number;
  height: number;
  alt?: string;
}

// Virtual list utility
function calculateGridHeight(images: ImageItem[], maxWidth: number): number;
```

---

## Technical Decisions

### 1. Virtual List Compatibility
- Export `calculateGridHeight()` utility
- User pre-calculates height, passes to virtual list's itemSize

### 2. Download Handler
- Fetch + ReadableStream for progress tracking
- Fallback to Blob for non-streaming responses

### 3. Placeholder
- Support both ThumbHash + BlurHash
- ThumbHash preferred (better color reproduction)

### 4. Lightbox
- Headless by default (user provides via onImageClick)
- Optional built-in lightbox in future phase

### 5. CSS Approach
- Vanilla CSS with CSS custom properties
- Zero runtime CSS-in-JS overhead
- Easy theming via custom properties

---

## Implementation Phases

### Phase 1: Core (MVP)
- Grid layout engine (exact Telegram)
- `calculateGridHeight` utility
- Basic lazy loading (Intersection Observer)
- Simple download (Fetch + Blob)
- Vanilla CSS styling

### Phase 2: Enhanced UX
- BlurHash/ThumbHash placeholders
- Download progress tracking (ReadableStream)
- Loading/error states
- Smooth fade-in animation

### Phase 3: Polish
- Accessibility (keyboard nav, ARIA labels)
- RTL support
- Built-in lightbox (optional export)
- TypeScript strict mode
- Storybook documentation

---

## Bundle Size Target

| Module | Size (gzipped) |
|--------|----------------|
| Grid Layout Engine | ~1KB |
| ImageCell + Lazy Load | ~2KB |
| ThumbHash decoder | ~1KB |
| Download Manager | ~0.5KB |
| **Total Core** | **~4.5KB** |

---

## Success Metrics

- Bundle size < 5KB (core)
- Compatible with react-window, react-virtualized, @tanstack/virtual
- Lighthouse performance score maintained
- Zero layout shift (CLS = 0)

---

## Next Steps

1. Initialize npm package with TypeScript + Vite
2. Implement GridLayoutEngine with exact Telegram calculations
3. Build ChatImageGrid component
4. Add calculateGridHeight utility
5. Write unit tests
6. Create Storybook demo
7. Publish to npm

---

## Unresolved Questions

None - all major decisions agreed.
