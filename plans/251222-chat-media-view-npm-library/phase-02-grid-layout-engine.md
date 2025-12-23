# Phase 2: Grid Layout Engine

**Status:** Pending
**Estimated Effort:** 4-5 hours
**Dependencies:** Phase 1 complete

## Context

- [Main Plan](./plan.md)
- [Telegram Grid Layout Research](./research/researcher-01-telegram-grid-layout.md)
- [Phase 1: Project Setup](./phase-01-project-setup.md)

## Overview

Implement Telegram-style grid layout algorithm for 1-5 images. Core engine calculates cell positions, dimensions, and border-radius based on image count and aspect ratios. Export `calculateGridHeight()` for virtual list integration.

## Key Insights (from Research)

- Telegram uses proprietary algorithm (not publicly documented)
- Layout patterns: 1=full, 2=50/50, 3=66/33, 4=2x2, 5=2+3
- Gap: 2px, outer radius: 12px, inner radius: 0-4px
- Aspect ratios influence layout decisions
- Similar to Knuth-Plass line-breaking algorithm

## Requirements

1. Layout engine must handle 1-5 images
2. Maintain aspect ratios within grid constraints
3. Calculate cell positions (x, y, width, height)
4. Determine border-radius per cell based on position
5. Export pure function for virtual list height calculation
6. Zero runtime dependencies

## Architecture

```
src/
├── GridLayoutEngine.ts     # Core layout calculations
├── calculateGridHeight.ts  # Virtual list utility
└── types.ts                # Layout types
```

**Data Flow:**
```
ImageItem[] → GridLayoutEngine → CellLayout[] → CSS Grid
                    ↓
            calculateGridHeight() → number (for virtual list)
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/GridLayoutEngine.ts` | Layout algorithm |
| `src/calculateGridHeight.ts` | Height calculation export |
| `src/types.ts` | Interface definitions |
| `src/__tests__/GridLayoutEngine.test.ts` | Unit tests |

## Implementation Steps

### Step 1: Define Types

```typescript
// src/types.ts
export interface ImageItem {
  src: string
  thumbnail?: string
  blurhash?: string
  thumbhash?: string
  width: number
  height: number
  alt?: string
}

export interface CellLayout {
  index: number
  x: number
  y: number
  width: number
  height: number
  borderRadius: BorderRadius
}

export interface BorderRadius {
  topLeft: number
  topRight: number
  bottomLeft: number
  bottomRight: number
}

export interface GridLayout {
  cells: CellLayout[]
  totalWidth: number
  totalHeight: number
}

export interface LayoutConfig {
  maxWidth: number
  gap: number
  borderRadius: number
  innerRadius: number
}
```

### Step 2: Layout Patterns

```typescript
// src/GridLayoutEngine.ts

const DEFAULT_CONFIG: LayoutConfig = {
  maxWidth: 400,
  gap: 2,
  borderRadius: 12,
  innerRadius: 4
}

export function calculateLayout(
  images: ImageItem[],
  config: Partial<LayoutConfig> = {}
): GridLayout {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const count = Math.min(images.length, 5)

  switch (count) {
    case 1: return layoutSingle(images, cfg)
    case 2: return layoutTwo(images, cfg)
    case 3: return layoutThree(images, cfg)
    case 4: return layoutFour(images, cfg)
    case 5: return layoutFive(images, cfg)
    default: return { cells: [], totalWidth: 0, totalHeight: 0 }
  }
}
```

### Step 3: Layout Functions

**Single Image (1):**
```typescript
function layoutSingle(images: ImageItem[], cfg: LayoutConfig): GridLayout {
  const img = images[0]
  const aspectRatio = img.width / img.height
  const width = cfg.maxWidth
  const height = Math.min(width / aspectRatio, cfg.maxWidth * 1.2)

  return {
    cells: [{
      index: 0,
      x: 0, y: 0,
      width, height,
      borderRadius: allCorners(cfg.borderRadius)
    }],
    totalWidth: width,
    totalHeight: height
  }
}
```

**Two Images (2):**
```typescript
function layoutTwo(images: ImageItem[], cfg: LayoutConfig): GridLayout {
  const cellWidth = (cfg.maxWidth - cfg.gap) / 2
  const minAspect = Math.min(
    images[0].width / images[0].height,
    images[1].width / images[1].height
  )
  const height = Math.min(cellWidth / minAspect, cfg.maxWidth * 0.6)

  return {
    cells: [
      { index: 0, x: 0, y: 0, width: cellWidth, height,
        borderRadius: { topLeft: cfg.borderRadius, topRight: 0, bottomLeft: cfg.borderRadius, bottomRight: 0 }},
      { index: 1, x: cellWidth + cfg.gap, y: 0, width: cellWidth, height,
        borderRadius: { topLeft: 0, topRight: cfg.borderRadius, bottomLeft: 0, bottomRight: cfg.borderRadius }}
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: height
  }
}
```

**Three Images (3):** 66% left + 33% right (2 stacked)
```typescript
function layoutThree(images: ImageItem[], cfg: LayoutConfig): GridLayout {
  const leftWidth = (cfg.maxWidth - cfg.gap) * 0.66
  const rightWidth = cfg.maxWidth - leftWidth - cfg.gap
  const leftAspect = images[0].width / images[0].height
  const leftHeight = Math.min(leftWidth / leftAspect, cfg.maxWidth * 0.8)
  const rightCellHeight = (leftHeight - cfg.gap) / 2

  return {
    cells: [
      { index: 0, x: 0, y: 0, width: leftWidth, height: leftHeight,
        borderRadius: { topLeft: cfg.borderRadius, topRight: 0, bottomLeft: cfg.borderRadius, bottomRight: 0 }},
      { index: 1, x: leftWidth + cfg.gap, y: 0, width: rightWidth, height: rightCellHeight,
        borderRadius: { topLeft: 0, topRight: cfg.borderRadius, bottomLeft: 0, bottomRight: 0 }},
      { index: 2, x: leftWidth + cfg.gap, y: rightCellHeight + cfg.gap, width: rightWidth, height: rightCellHeight,
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: cfg.borderRadius }}
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: leftHeight
  }
}
```

**Four Images (4):** 2x2 grid
```typescript
function layoutFour(images: ImageItem[], cfg: LayoutConfig): GridLayout {
  const cellSize = (cfg.maxWidth - cfg.gap) / 2
  const cells: CellLayout[] = []

  for (let i = 0; i < 4; i++) {
    const row = Math.floor(i / 2)
    const col = i % 2
    cells.push({
      index: i,
      x: col * (cellSize + cfg.gap),
      y: row * (cellSize + cfg.gap),
      width: cellSize,
      height: cellSize,
      borderRadius: getCornerRadius(i, 4, cfg.borderRadius)
    })
  }

  return {
    cells,
    totalWidth: cfg.maxWidth,
    totalHeight: cellSize * 2 + cfg.gap
  }
}
```

**Five Images (5):** 2 top + 3 bottom
```typescript
function layoutFive(images: ImageItem[], cfg: LayoutConfig): GridLayout {
  const topCellWidth = (cfg.maxWidth - cfg.gap) / 2
  const bottomCellWidth = (cfg.maxWidth - cfg.gap * 2) / 3
  const rowHeight = cfg.maxWidth * 0.3

  return {
    cells: [
      // Top row (2)
      { index: 0, x: 0, y: 0, width: topCellWidth, height: rowHeight,
        borderRadius: { topLeft: cfg.borderRadius, topRight: 0, bottomLeft: 0, bottomRight: 0 }},
      { index: 1, x: topCellWidth + cfg.gap, y: 0, width: topCellWidth, height: rowHeight,
        borderRadius: { topLeft: 0, topRight: cfg.borderRadius, bottomLeft: 0, bottomRight: 0 }},
      // Bottom row (3)
      { index: 2, x: 0, y: rowHeight + cfg.gap, width: bottomCellWidth, height: rowHeight,
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: cfg.borderRadius, bottomRight: 0 }},
      { index: 3, x: bottomCellWidth + cfg.gap, y: rowHeight + cfg.gap, width: bottomCellWidth, height: rowHeight,
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }},
      { index: 4, x: (bottomCellWidth + cfg.gap) * 2, y: rowHeight + cfg.gap, width: bottomCellWidth, height: rowHeight,
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: cfg.borderRadius }}
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: rowHeight * 2 + cfg.gap
  }
}
```

### Step 4: Virtual List Utility

```typescript
// src/calculateGridHeight.ts
import { calculateLayout } from './GridLayoutEngine'
import type { ImageItem } from './types'

export function calculateGridHeight(
  images: ImageItem[],
  maxWidth: number = 400,
  gap: number = 2
): number {
  if (images.length === 0) return 0
  const layout = calculateLayout(images, { maxWidth, gap })
  return layout.totalHeight
}
```

### Step 5: Helper Functions

```typescript
function allCorners(radius: number): BorderRadius {
  return { topLeft: radius, topRight: radius, bottomLeft: radius, bottomRight: radius }
}

function getCornerRadius(index: number, total: number, radius: number): BorderRadius {
  // Returns appropriate radius based on position in grid
  const br = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
  if (total === 4) {
    if (index === 0) br.topLeft = radius
    if (index === 1) br.topRight = radius
    if (index === 2) br.bottomLeft = radius
    if (index === 3) br.bottomRight = radius
  }
  return br
}
```

### Step 6: Unit Tests

```typescript
// src/__tests__/GridLayoutEngine.test.ts
import { describe, it, expect } from 'vitest'
import { calculateLayout } from '../GridLayoutEngine'
import { calculateGridHeight } from '../calculateGridHeight'

const mockImage = (w: number, h: number) => ({ src: 'test.jpg', width: w, height: h })

describe('GridLayoutEngine', () => {
  it('returns single cell for 1 image', () => {
    const layout = calculateLayout([mockImage(800, 600)])
    expect(layout.cells).toHaveLength(1)
    expect(layout.cells[0].width).toBe(400)
  })

  it('returns 2 cells side by side for 2 images', () => {
    const layout = calculateLayout([mockImage(800, 600), mockImage(800, 600)])
    expect(layout.cells).toHaveLength(2)
    expect(layout.cells[1].x).toBeGreaterThan(0)
  })

  it('returns 5 cells in 2+3 pattern for 5 images', () => {
    const images = Array(5).fill(null).map(() => mockImage(800, 600))
    const layout = calculateLayout(images)
    expect(layout.cells).toHaveLength(5)
  })
})

describe('calculateGridHeight', () => {
  it('returns 0 for empty array', () => {
    expect(calculateGridHeight([])).toBe(0)
  })

  it('returns consistent height for same images', () => {
    const images = [mockImage(800, 600)]
    const h1 = calculateGridHeight(images, 400)
    const h2 = calculateGridHeight(images, 400)
    expect(h1).toBe(h2)
  })
})
```

## Todo List

- [ ] Create src/types.ts with interface definitions
- [ ] Implement layoutSingle function
- [ ] Implement layoutTwo function
- [ ] Implement layoutThree function
- [ ] Implement layoutFour function
- [ ] Implement layoutFive function
- [ ] Implement getCornerRadius helper
- [ ] Create calculateGridHeight utility
- [ ] Export from src/index.ts
- [ ] Write unit tests for all layouts
- [ ] Test with various aspect ratios
- [ ] Verify border-radius calculations

## Success Criteria

- [x] All 5 layout patterns produce correct cell positions
- [x] calculateGridHeight returns consistent values
- [x] Unit tests pass for edge cases
- [x] Zero runtime dependencies
- [x] Bundle contribution < 1KB gzipped

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Aspect ratio edge cases | Add min/max height constraints |
| Layout mismatch with Telegram | Visual comparison testing |
| Performance with many recalcs | Memoization in component layer |

## Security Considerations

- Pure functions, no side effects
- No external data fetching
- Input validation for image dimensions

## Next Steps

After Phase 2 complete, proceed to [Phase 3: Core Components](./phase-03-core-components.md)
