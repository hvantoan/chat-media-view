This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.claude/settings.local.json
.storybook/main.ts
.storybook/preview.ts
package.json
plans/251222-chat-media-view-npm-library/phase-01-project-setup.md
plans/251222-chat-media-view-npm-library/phase-02-grid-layout-engine.md
plans/251222-chat-media-view-npm-library/phase-03-core-components.md
plans/251222-chat-media-view-npm-library/phase-04-enhanced-ux.md
plans/251222-chat-media-view-npm-library/phase-05-polish-docs.md
plans/251222-chat-media-view-npm-library/plan.md
plans/251222-chat-media-view-npm-library/research/researcher-01-telegram-grid-layout.md
plans/251222-chat-media-view-npm-library/research/researcher-02-npm-library-setup.md
plans/reports/brainstorm-251222-chat-media-view-npm-library.md
README.md
repomix-output.xml
src/index.test.ts
src/index.ts
src/test/setup.ts
src/types.ts
styles/chat-image-grid.css
tsconfig.json
vite.config.ts
vitest.config.ts
```

# Files

## File: .claude/settings.local.json
````json
{
  "permissions": {
    "allow": [
      "Bash(python:*)",
      "Skill(frontend-development)",
      "Bash(npm init:*)",
      "Bash(npm install:*)",
      "Bash(npx storybook@latest init:*)",
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(npm run test)",
      "Bash(if [:*)",
      "Bash(then:*)",
      "Bash(fi:*)",
      "Bash(repomix:*)"
    ]
  }
}
````

## File: .storybook/main.ts
````typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite"
};
export default config;
````

## File: .storybook/preview.ts
````typescript
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
````

## File: package.json
````json
{
  "name": "chat-media-view",
  "version": "0.0.1",
  "description": "Telegram-style image grid for React chat applications",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "sideEffects": [
    "**/*.css"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "keywords": [
    "react",
    "image-grid",
    "chat",
    "telegram",
    "media",
    "gallery"
  ],
  "author": "",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": ""
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.2",
    "@vitest/coverage-v8": "^3.2.4",
    "jsdom": "^27.0.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "typescript": "^5.9.3",
    "vite": "^7.3.0",
    "vite-plugin-dts": "^4.5.4",
    "vitest": "^3.2.4",
    "storybook": "^10.1.10",
    "@storybook/react-vite": "^10.1.10",
    "@chromatic-com/storybook": "^4.1.3",
    "@storybook/addon-vitest": "^10.1.10",
    "@storybook/addon-a11y": "^10.1.10",
    "@storybook/addon-docs": "^10.1.10",
    "@storybook/addon-onboarding": "^10.1.10",
    "playwright": "^1.57.0",
    "@vitest/browser": "^3.2.4"
  }
}
````

## File: plans/251222-chat-media-view-npm-library/phase-01-project-setup.md
````markdown
# Phase 1: Project Setup

**Status:** Pending
**Estimated Effort:** 2-3 hours

## Context

- [Main Plan](./plan.md)
- [NPM Library Setup Research](./research/researcher-02-npm-library-setup.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Initialize npm package with Vite library mode, TypeScript strict config, Vitest testing, and Storybook. Set up dual ESM/CJS builds targeting < 5KB gzipped.

## Key Insights (from Research)

- Vite 7+ library mode with `vite-plugin-dts` for automatic `.d.ts` generation
- ESM primary + CJS fallback for tree-shaking + backwards compat
- `sideEffects: ["**/*.css"]` prevents CSS tree-shaking issues
- React 18/19 peer dependencies with broad version ranges
- Vitest + Testing Library for component tests

## Requirements

1. Initialize npm package with correct `package.json` structure
2. Configure Vite library mode (ESM + CJS output)
3. Set up TypeScript strict mode
4. Configure Vitest with jsdom environment
5. Initialize Storybook with React-Vite framework
6. Create vanilla CSS with custom properties structure

## Architecture

```
chat-media-view/
├── src/
│   ├── index.ts              # Public exports
│   └── test/
│       └── setup.ts          # Vitest setup
├── styles/
│   └── chat-image-grid.css   # CSS custom properties
├── .storybook/
│   └── main.ts               # Storybook config
├── package.json              # npm config
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite library mode
└── vitest.config.ts          # Test config
```

## Related Code Files

| File | Purpose |
|------|---------|
| `package.json` | npm metadata, exports, peer deps |
| `vite.config.ts` | Library build config |
| `tsconfig.json` | TypeScript strict settings |
| `vitest.config.ts` | Test environment setup |
| `src/index.ts` | Public API barrel |
| `styles/chat-image-grid.css` | CSS custom properties |

## Implementation Steps

### Step 1: Initialize Package
```bash
npm init -y
```

Update `package.json`:
```json
{
  "name": "chat-media-view",
  "version": "0.0.1",
  "description": "Telegram-style image grid for React chat applications",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

### Step 2: Install Dependencies
```bash
npm install -D react react-dom @types/react @types/react-dom typescript vite @vitejs/plugin-react vite-plugin-dts vitest jsdom @testing-library/react @testing-library/jest-dom @storybook/react-vite storybook
```

### Step 3: Vite Config
Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' }
      }
    }
  }
})
```

### Step 4: TypeScript Config
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

### Step 5: Vitest Config
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
})
```

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

### Step 6: Storybook Init
```bash
npx storybook@latest init --type react --builder vite
```

### Step 7: CSS Foundation
Create `styles/chat-image-grid.css`:
```css
.chat-image-grid {
  --cmv-gap: 2px;
  --cmv-radius-outer: 12px;
  --cmv-radius-inner: 4px;
  --cmv-max-width: 400px;
  --cmv-bg-placeholder: #e0e0e0;

  display: grid;
  gap: var(--cmv-gap);
  max-width: var(--cmv-max-width);
  border-radius: var(--cmv-radius-outer);
  overflow: hidden;
}
```

### Step 8: Entry Point
Create `src/index.ts`:
```typescript
// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'

// Utilities
export { calculateGridHeight } from './calculateGridHeight'

// Types
export type { ChatImageGridProps, ImageItem } from './types'
```

## Todo List

- [ ] Run `npm init -y` and update package.json
- [ ] Install dev dependencies
- [ ] Create vite.config.ts with library mode
- [ ] Create tsconfig.json with strict mode
- [ ] Create vitest.config.ts with jsdom
- [ ] Create src/test/setup.ts
- [ ] Initialize Storybook
- [ ] Create styles/chat-image-grid.css foundation
- [ ] Create src/index.ts barrel export
- [ ] Create src/types.ts with interfaces
- [ ] Verify build produces ESM + CJS
- [ ] Verify TypeScript compiles without errors

## Success Criteria

- [x] `npm run build` produces `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`
- [x] `npm run test` runs without errors
- [x] `npm run storybook` launches dev server
- [x] TypeScript strict mode passes
- [x] Package exports resolve correctly

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Vite plugin compatibility | Pin vite-plugin-dts version |
| Storybook version conflicts | Use latest stable (8.3+) |
| CSS not bundled correctly | Verify sideEffects config |

## Security Considerations

- No runtime dependencies (React as peer dep)
- No network calls in build
- No file system access beyond build

## Next Steps

After Phase 1 complete, proceed to [Phase 2: Grid Layout Engine](./phase-02-grid-layout-engine.md)
````

## File: plans/251222-chat-media-view-npm-library/phase-02-grid-layout-engine.md
````markdown
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
````

## File: plans/251222-chat-media-view-npm-library/phase-03-core-components.md
````markdown
# Phase 3: Core Components

**Status:** Pending
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
````

## File: plans/251222-chat-media-view-npm-library/phase-04-enhanced-ux.md
````markdown
# Phase 4: Enhanced UX

**Status:** Pending
**Estimated Effort:** 4-5 hours
**Dependencies:** Phase 3 complete

## Context

- [Main Plan](./plan.md)
- [Phase 3: Core Components](./phase-03-core-components.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Add BlurHash/ThumbHash placeholder rendering, download progress tracking via ReadableStream, improved loading states, and smooth fade-in animations. Enhances perceived performance.

## Key Insights

- ThumbHash preferred over BlurHash (better color reproduction, smaller)
- ReadableStream API for download progress (fetch streaming)
- Canvas-based placeholder rendering (small bundle)
- CSS opacity transitions for smooth reveal

## Requirements

1. BlurHashCanvas renders placeholder from hash string
2. ThumbHash support (decode + render)
3. DownloadManager tracks progress via ReadableStream
4. Loading state shows placeholder until image ready
5. Smooth fade from placeholder to image
6. Error state with retry capability

## Architecture

```
src/
├── BlurHashCanvas.tsx      # BlurHash/ThumbHash renderer
├── DownloadManager.ts      # Fetch + progress tracking
├── hooks/
│   ├── useImageLoad.ts     # Combined load + placeholder
│   └── useDownload.ts      # Download with progress
└── ImageCell.tsx           # Updated with placeholder
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/BlurHashCanvas.tsx` | Canvas placeholder |
| `src/DownloadManager.ts` | Progress tracking |
| `src/hooks/useImageLoad.ts` | Image loading logic |
| `src/hooks/useDownload.ts` | Download hook |
| `src/ImageCell.tsx` | Integrate placeholders |

## Implementation Steps

### Step 1: ThumbHash Decoder

ThumbHash is preferred - smaller payload, better colors. Decode from base64 to RGBA pixels.

```typescript
// src/thumbhash.ts
// Minimal ThumbHash decoder (~1KB)
export function thumbHashToRGBA(hash: Uint8Array): {
  w: number
  h: number
  rgba: Uint8Array
} {
  // Decode header
  const header = hash[0] | (hash[1] << 8) | (hash[2] << 16)
  const hasAlpha = (header & 0x80) !== 0
  const lx = Math.max(3, (header & 0x7) !== 0 ? (header & 0x7) : (header >> 3) & 0x7)
  const ly = Math.max(3, hasAlpha ? 5 : (header >> 3) & 0x7)

  // Simplified decode - actual implementation more complex
  const w = Math.round(lx * 32 / Math.max(lx, ly))
  const h = Math.round(ly * 32 / Math.max(lx, ly))
  const rgba = new Uint8Array(w * h * 4)

  // Decode AC coefficients to pixels
  // ... (full decode logic)

  return { w, h, rgba }
}

export function thumbHashToDataURL(hash: string): string {
  const bytes = base64ToBytes(hash)
  const { w, h, rgba } = thumbHashToRGBA(bytes)
  return rgbaToDataURL(w, h, rgba)
}
```

### Step 2: BlurHash Canvas Component

```typescript
// src/BlurHashCanvas.tsx
import { useEffect, useRef } from 'react'
import { decode as decodeBlurHash } from 'blurhash'
import { thumbHashToRGBA } from './thumbhash'

interface BlurHashCanvasProps {
  hash: string
  hashType: 'blurhash' | 'thumbhash'
  width: number
  height: number
  className?: string
}

export function BlurHashCanvas({
  hash,
  hashType,
  width,
  height,
  className
}: BlurHashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hash) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      let pixels: Uint8ClampedArray

      if (hashType === 'blurhash') {
        // BlurHash decode (32x32 is sufficient for placeholder)
        pixels = decodeBlurHash(hash, 32, 32)
      } else {
        // ThumbHash decode
        const { rgba } = thumbHashToRGBA(base64ToBytes(hash))
        pixels = new Uint8ClampedArray(rgba)
      }

      const imageData = new ImageData(pixels, 32, 32)
      ctx.putImageData(imageData, 0, 0)
    } catch (e) {
      console.warn('Failed to decode hash:', e)
    }
  }, [hash, hashType])

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  )
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
```

### Step 3: Download Manager

```typescript
// src/DownloadManager.ts
export interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

export async function downloadWithProgress(
  url: string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentLength = response.headers.get('Content-Length')
  const total = contentLength ? parseInt(contentLength, 10) : 0

  // Fallback if no Content-Length or no ReadableStream
  if (!total || !response.body) {
    return response.blob()
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let loaded = 0

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    chunks.push(value)
    loaded += value.length

    onProgress?.({
      loaded,
      total,
      percentage: Math.round((loaded / total) * 100)
    })
  }

  return new Blob(chunks, {
    type: response.headers.get('Content-Type') || 'image/jpeg'
  })
}
```

### Step 4: useDownload Hook

```typescript
// src/hooks/useDownload.ts
import { useState, useCallback } from 'react'
import { downloadWithProgress, DownloadProgress } from '../DownloadManager'

interface UseDownloadResult {
  download: (url: string) => Promise<string>
  progress: DownloadProgress | null
  isDownloading: boolean
  error: Error | null
}

export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const download = useCallback(async (url: string): Promise<string> => {
    setIsDownloading(true)
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const blob = await downloadWithProgress(url, setProgress)
      const objectUrl = URL.createObjectURL(blob)
      return objectUrl
    } catch (e) {
      setError(e as Error)
      throw e
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { download, progress, isDownloading, error }
}
```

### Step 5: Updated ImageCell

```typescript
// src/ImageCell.tsx (updated)
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { BlurHashCanvas } from './BlurHashCanvas'
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
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible
  const hasPlaceholder = image.blurhash || image.thumbhash

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
  }, [])

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
      {/* Placeholder layer */}
      {hasPlaceholder && !loaded && (
        <BlurHashCanvas
          hash={(image.thumbhash || image.blurhash)!}
          hashType={image.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-image-cell__placeholder"
        />
      )}

      {/* Image layer */}
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

      {/* Error state */}
      {error && (
        <div className="chat-image-cell__error">
          <span>Failed to load</span>
          <button
            onClick={(e) => { e.stopPropagation(); setError(false); }}
            className="chat-image-cell__retry"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Enhanced CSS

```css
/* styles/chat-image-grid.css (additions) */

.chat-image-cell__placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.chat-image-cell__img {
  position: absolute;
  inset: 0;
  z-index: 2;
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
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 12px;
  background-color: #f5f5f5;
}

.chat-image-cell__retry {
  padding: 4px 12px;
  font-size: 11px;
  color: #007bff;
  background: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
}

.chat-image-cell__retry:hover {
  background: #007bff;
  color: white;
}

/* Progress indicator (optional) */
.chat-image-cell__progress {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 3px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  overflow: hidden;
  z-index: 4;
}

.chat-image-cell__progress-bar {
  height: 100%;
  background: #007bff;
  transition: width 0.1s ease;
}
```

### Step 7: Tests

```typescript
// src/__tests__/BlurHashCanvas.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BlurHashCanvas } from '../BlurHashCanvas'

describe('BlurHashCanvas', () => {
  it('renders canvas element', () => {
    const { container } = render(
      <BlurHashCanvas
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        hashType="blurhash"
        width={100}
        height={100}
      />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })
})

// src/__tests__/DownloadManager.test.ts
import { describe, it, expect, vi } from 'vitest'
import { downloadWithProgress } from '../DownloadManager'

describe('DownloadManager', () => {
  it('tracks download progress', async () => {
    const progress = vi.fn()
    // Mock fetch with ReadableStream
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'Content-Length': '1000' }),
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(500))
          controller.enqueue(new Uint8Array(500))
          controller.close()
        }
      })
    })

    await downloadWithProgress('https://example.com/image.jpg', progress)
    expect(progress).toHaveBeenCalled()
  })
})
```

## Todo List

- [ ] Implement ThumbHash decoder (minimal version)
- [ ] Create BlurHashCanvas component
- [ ] Add blurhash package as optional peer dep
- [ ] Implement DownloadManager with ReadableStream
- [ ] Create useDownload hook
- [ ] Update ImageCell with placeholder layer
- [ ] Add fade transition CSS
- [ ] Implement error state with retry
- [ ] Add progress bar component (optional)
- [ ] Write unit tests
- [ ] Update Storybook with placeholder demos
- [ ] Test fallback for non-streaming responses

## Success Criteria

- [x] Placeholder renders immediately from hash
- [x] Smooth fade from placeholder to image
- [x] Download progress reports accurate percentage
- [x] Error state shows retry button
- [x] Works without placeholder (graceful degradation)
- [x] Bundle stays under 5KB

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| BlurHash bundle size | Use optional peer dep |
| ReadableStream support | Fallback to blob() |
| Canvas performance | Keep decode size small (32x32) |

## Security Considerations

- Validate hash format before decode
- Sanitize blob MIME type
- No arbitrary code execution from hashes

## Next Steps

After Phase 4 complete, proceed to [Phase 5: Polish & Docs](./phase-05-polish-docs.md)
````

## File: plans/251222-chat-media-view-npm-library/phase-05-polish-docs.md
````markdown
# Phase 5: Polish & Documentation

**Status:** Pending
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
````

## File: plans/251222-chat-media-view-npm-library/plan.md
````markdown
# chat-media-view Implementation Plan

**Package:** `chat-media-view`
**Status:** Ready for Implementation
**Target:** < 5KB gzipped React component library

## Overview

Telegram-style image grid (1-5 images) for chat applications. Virtual list agnostic with `calculateGridHeight()` utility. BlurHash/ThumbHash placeholders. Download progress via ReadableStream.

## Architecture

```
src/
├── ChatImageGrid.tsx       # Main component (props: images, onImageClick, etc.)
├── ImageCell.tsx           # Single image + lazy load (Intersection Observer)
├── GridLayoutEngine.ts     # Layout calculations for 1-5 images
├── BlurHashCanvas.tsx      # Placeholder renderer (ThumbHash preferred)
├── DownloadManager.ts      # Fetch + ReadableStream progress
├── calculateGridHeight.ts  # Virtual list utility export
└── index.ts                # Public API exports
styles/
└── chat-image-grid.css     # Vanilla CSS + custom properties
```

## Core API

```tsx
interface ChatImageGridProps {
  images: ImageItem[];
  maxWidth?: number;       // default: 400
  gap?: number;            // default: 2
  borderRadius?: number;   // default: 12
  onImageClick?: (index: number, image: ImageItem) => void;
  onDownload?: (image: ImageItem, progress: number) => void;
  lazyLoad?: boolean;      // default: true
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

function calculateGridHeight(images: ImageItem[], maxWidth: number): number;
```

## Implementation Phases

| Phase | Focus | File |
|-------|-------|------|
| 1 | Project Setup | [phase-01-project-setup.md](./phase-01-project-setup.md) |
| 2 | Grid Layout Engine | [phase-02-grid-layout-engine.md](./phase-02-grid-layout-engine.md) |
| 3 | Core Components | [phase-03-core-components.md](./phase-03-core-components.md) |
| 4 | Enhanced UX | [phase-04-enhanced-ux.md](./phase-04-enhanced-ux.md) |
| 5 | Polish & Docs | [phase-05-polish-docs.md](./phase-05-polish-docs.md) |

## Success Metrics

- Bundle size < 5KB gzipped (core)
- Zero layout shift (CLS = 0)
- Works with react-window, react-virtualized, @tanstack/virtual
- TypeScript strict mode compliant
- Storybook documentation complete

## Research References

- [Telegram Grid Layout Research](./research/researcher-01-telegram-grid-layout.md)
- [NPM Library Setup Research](./research/researcher-02-npm-library-setup.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)
````

## File: plans/251222-chat-media-view-npm-library/research/researcher-01-telegram-grid-layout.md
````markdown
# Telegram Image Grid Layout Research

**Date:** 2025-12-22
**Status:** Complete
**Scope:** Image grid layout for 1-5 images in chat messages

## Executive Summary

Telegram uses a custom layout algorithm for grouped media (albums) supporting 1-10 items. No publicly documented official specification exists. Found reverse-engineered implementations in open-source projects but exact algorithm remains proprietary. Telegram arranges photos as "elegantly proportioned thumbnails" maintaining aspect ratios within grid constraints.

---

## Key Findings

### 1. Album & Layout Basics

**Telegram Features (v4.5+):**
- Auto-groups multiple photos/videos sent together into albums
- Supports up to 10 items per album
- Single notification instead of multiple on recipient side
- Arrangement as "elegantly proportioned thumbnails"

**No Official Documentation:** Telegram does not publish layout algorithm specs. Implementation derived from reverse-engineering source code.

---

### 2. Aspect Ratio Handling

**General Image Recommendations:**
- Profile photos: 512×512px (square)
- Posts: 1280×1280px (square) or 1280×720px (landscape)
- Link previews: 1200×630px (1.91:1 aspect ratio)

**Grid Constraints:**
- Each image maintains original aspect ratio when possible
- Grid cells adapt to available container width
- Photos stretched/shrunk minimally to fill rows uniformly

**Algorithm Approach:** Similar to Knuth-Plass line-breaking algorithm (used by react-photo-album rows layout):
- Calculates optimal row heights
- Uses Dijkstra's algorithm for shortest path
- Keeps row heights consistent while respecting aspect ratios

---

### 3. Layout Pattern for Image Counts (1-5)

Based on reverse-engineering and common mobile messenger patterns:

| Count | Layout Pattern | Notes |
|-------|---|---|
| 1 | Single large image | Full container width |
| 2 | Two columns | Equal width, aspect ratios maintained |
| 3 | Two on top, one below | Or asymmetric based on aspect |
| 4 | 2×2 grid | Equal cells, uniform sizing |
| 5 | Custom mosaic | Varies by aspect ratios |

**Evidence:** Telegram Android source (DrKLO/Telegram) contains custom view implementations in `RecyclerListView.java` and photo components but specific layout math not exposed in public code.

---

### 4. Spacing & Dimensions

**Estimated Gap Values:**
- Inter-image gap: 2-4px (tight grouping)
- Container padding: 0-8px

**Max Dimensions:**
- Single image: Container width (capped at 320-512px on mobile)
- Grid containers: Fill available chat bubble width
- Border constraints prevent overflow

**Reference:** CSS grid implementations use `gap: 20px` and `border-radius: 12px` for similar layouts, but Telegram appears more compact.

---

### 5. Border Radius Rules

**Typical Pattern:**
- **Outer corners:** Full radius (e.g., 12-16px)
- **Inner corners:** Reduced or no radius (0-4px for shared edges)
- **Single image:** Full rounded corners on all sides

**Implementation Method:** Apply border-radius selectively based on position:
- Top-left corner of grid: `border-radius: 12px 0 0 0`
- Top-right: `border-radius: 0 12px 0 0`
- Bottom corners similarly
- Shared edges: No radius

---

### 6. Open-Source Implementations

#### A. **React Photo Album**
- **Link:** [React Photo Album](https://react-photo-album.com/)
- **Features:**
  - Rows, columns, masonry layouts
  - Aspect ratio preservation
  - CSS-based styling
  - Responsive calculations
- **Relevance:** Not Telegram-specific but uses similar algorithm concepts (Knuth-Plass for row layout)

#### B. **TelegramGallery (Android)**
- **Link:** [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- **Info:** Android library extracted from Telegram
- **Features:** Album selection, multi-select, photo preview
- **Limitation:** Focuses on picker UI, not layout algorithm

#### C. **Official Telegram Source**
- **Link:** [GitHub - Telegram Desktop/Android](https://github.com/DrKLO/Telegram)
- **Contains:**
  - `PhotoViewer.java` - Image gallery viewer
  - `RecyclerListView.java` - Chat message layout
  - Custom view components for media groups
- **Issue:** Code is minimally documented; layout logic scattered across components

#### D. **Related Libraries**
- **react-visual-grid:** Image grid/masonry for React - [GitHub](https://github.com/prabhuignoto/react-visual-grid)
- **react-grid-gallery:** Multi-select grid gallery - npm package

---

## Algorithm Pseudo-Code (Inferred)

```
function layoutImages(images, containerWidth) {
  // Normalize aspect ratios
  let normalizedItems = images.map(img => ({
    width: img.width,
    height: img.height,
    aspectRatio: img.width / img.height
  }))

  // Determine grid structure based on count
  switch(images.length) {
    case 1:
      return { layout: 'single', width: containerWidth, height: auto }
    case 2:
      return { layout: 'two-col', colWidth: containerWidth/2, height: auto }
    case 3:
      return { layout: '2-1', topRowHeight: auto, bottomHeight: auto }
    case 4:
      return { layout: 'grid-2x2', cellSize: containerWidth/2, height: auto }
    case 5:
      // Complex: optimize based on aspect ratios
      return optimizeMosaic(normalizedItems, containerWidth)
  }
}

function optimizeMosaic(items, width) {
  // Use Dijkstra's algorithm to find optimal row breaks
  // Minimize height variance across rows
  // Preserve aspect ratios
  return { rows: [...], heights: [...], gaps: 2-4px }
}
```

---

## Spacing Constants (Estimated)

| Element | Value | Notes |
|---------|-------|-------|
| Gap between images | 2-4px | Compact grouping |
| Outer border-radius | 12-16px | Mobile standard |
| Inner radius | 0-4px | Minimal at shared edges |
| Max height (single) | 512-640px | Mobile constraint |
| Container padding | 0-8px | Minimal |

---

## Missing Implementation Details

**Unresolved Questions:**

1. **Exact aspect ratio thresholds:** When does Telegram switch from 2-col to asymmetric layout for 3 items?
2. **Height calculation formula:** Mathematical formula for optimal row heights (Telegram likely uses variant of Knuth-Plass)
3. **Panorama handling:** How are extreme aspect ratios (>3:1) constrained?
4. **Animated GIF/Video:** Different layout rules for mixed media types?
5. **Scaling on different devices:** Exact breakpoints for mobile vs tablet vs desktop
6. **RTL considerations:** Right-to-left layout adjustments (if any)

---

## References & Sources

- [React Photo Album Documentation](https://react-photo-album.com/documentation)
- [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- [Official Telegram Source (DrKLO/Telegram)](https://github.com/DrKLO/Telegram)
- [Telegram Blog - Albums Feature](https://telegram.org/blog/albums-saved-messages)
- [React Visual Grid Library](https://github.com/prabhuignoto/react-visual-grid)
- [Telegram Image Compression Research](https://rifqimfahmi.dev/blog/telegram-like-image-optimization-on-android)

---

## Recommendation for Implementation

**Strategy:** Implement custom layout engine inspired by react-photo-album's rows algorithm with Telegram-specific constraints:

1. Use aspect ratio-aware row packing (Knuth-Plass variant)
2. Hard-code layout patterns for 1-5 images
3. Add compact gap (2-4px) and Telegram-style border-radius
4. Test against actual Telegram client visually
5. Consider detecting if exact algorithm via pixel measurement & reverse-engineering

**Why no exact match:** Telegram's algorithm is proprietary and undocumented. Close approximation achievable through careful CSS grid or custom canvas/flex layout.
````

## File: plans/251222-chat-media-view-npm-library/research/researcher-02-npm-library-setup.md
````markdown
# NPM React Component Library Setup (Vite + TypeScript)
**Research Report** | 2024/2025 Best Practices

---

## 1. Vite Library Mode Setup

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

**Key Points:**
- `formats: ['es', 'cjs']` produces both ESM and CommonJS builds (ESM primary for tree-shaking)
- Externalizes React/ReactDOM (peerDependencies, not bundled)
- `preserveModules` handled by Rollup defaults (one file per module)

---

## 2. TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "src/**/*.stories.ts", "src/**/*.test.ts"]
}
```

---

## 3. Package.json Structure

```json
{
  "name": "@yourorg/chat-media-view",
  "version": "0.1.0",
  "description": "React component library for chat media display",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": {
      "import": "./dist/styles.css"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": false
    },
    "react-dom": {
      "optional": false
    }
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite-plugin-dts": "^3.0.0",
    "vitest": "^1.0.0",
    "@storybook/react-vite": "^8.3.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  },
  "scripts": {
    "build": "vite build",
    "test": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "type-check": "tsc --noEmit"
  }
}
```

**Critical Points:**
- `"type": "module"` enables ESM defaults
- `"sideEffects": ["**/*.css"]` prevents CSS tree-shaking
- `exports` field (preferred over `main`/`module`) with `types` subfield for each condition
- Peer dependencies: use broad version ranges (`^18.0.0`), not locked patches
- Lenient React version range covers React 18 & 19

---

## 4. CSS Handling

### Vanilla CSS Bundling

**Option A: Inline CSS (Recommended for small libraries)**
```typescript
// vite.config.ts - add to build options
build: {
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name.endsWith('.css')) {
          return 'styles.css'
        }
        return assetInfo.name
      }
    }
  }
}
```

**Option B: Separate CSS File**
```typescript
// src/index.ts
import './styles.css' // included in dist/styles.css

export { Button } from './components/Button'
export { Input } from './components/Input'
```

**Option C: CSS Modules (Per-component)**
```typescript
// src/components/Button.tsx
import styles from './Button.module.css'

export const Button = () => <button className={styles.root}>Click</button>
```

**sideEffects Configuration:**
```json
"sideEffects": ["**/*.css", "**/*.scss"]
```

---

## 5. Tree-Shaking Optimization

### Requirements for Tree-Shaking

1. **ESM Output (Primary)**
   - Static imports enable bundler analysis
   - Set `formats: ['es', 'cjs']` with ESM first

2. **Preserve Module Structure**
   - Vite preserves individual modules by default
   - Avoid pre-bundling with tsup/esbuild (use Vite instead)

3. **Mark Side Effects**
   ```json
   "sideEffects": ["**/*.css"]
   ```

4. **Named Exports (Not Default)**
   ```typescript
   // ✅ Good - tree-shakeable
   export const Button = () => {}
   export const Input = () => {}

   // ❌ Bad - not tree-shakeable
   export default { Button, Input }
   ```

5. **Check Build Output**
   ```bash
   vite build --mode=analyze  # Shows bundle size by module
   ```

---

## 6. Dual ESM/CJS Support Strategy

### Recommendation: ESM Primary + CJS Fallback

**Why ESM-first?**
- Tree-shaking support (CJS limited)
- Modern tooling preference
- React 19+ community standard

**ESM-only Alternative:**
- Valid if targeting React 18+
- Reduces build complexity
- Most users have ESM support

**Dual Support (Recommended):**
```typescript
// vite.config.ts
build: {
  lib: {
    formats: ['es', 'cjs'],
  },
  rollupOptions: {
    output: [
      {
        format: 'es',
        entryFileNames: 'index.js',
        dir: 'dist'
      },
      {
        format: 'cjs',
        entryFileNames: 'index.cjs',
        dir: 'dist'
      }
    ]
  }
}
```

**package.json exports:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
}
```

---

## 7. Testing Setup (Vitest)

### Installation

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### src/test/setup.ts

```typescript
import '@testing-library/jest-dom'
```

### Example Test

```typescript
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeDefined()
  })
})
```

### package.json Script

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage"
```

---

## 8. Storybook Integration

### Installation

```bash
npx storybook@latest init
```

### .storybook/main.ts (Vite Framework)

```typescript
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials']
}

export default config
```

### Example Story

```typescript
// src/components/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Click me' }
}
```

### Vitest + Storybook (Storybook 8.3+)

```typescript
// src/components/Button.test.tsx
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from './Button.stories'

const { Primary } = composeStories(stories)

it('renders story as test', () => {
  render(<Primary />)
  expect(screen.getByRole('button')).toBeDefined()
})
```

---

## Summary Table

| Aspect | Recommendation | Rationale |
|--------|---|---|
| **Bundler** | Vite 7+ | Fast, library-mode optimized, preserves modules |
| **Formats** | ESM + CJS | ESM for tree-shaking, CJS for backwards compat |
| **CSS** | Inline + sideEffects | Bundled with components, proper tree-shake marking |
| **React Versions** | ^18.0.0 \|\| ^19.0.0 | Covers both stable and latest |
| **Types** | vite-plugin-dts | Automatic .d.ts generation |
| **Testing** | Vitest + Portable Stories | Modern, Storybook-native |
| **Exports Field** | Yes (modern standard) | Replaces main/module, supports conditions |

---

## Unresolved Questions

- **Does chat-media-view require CSS variables/theming?** Affects CSS bundling strategy
- **Target React versions?** (Currently assuming 18+)
- **Tree-shaking priority vs CJS compatibility?** ESM-only simpler but less compat

---

## Sources

- [Vite Library Mode - Official Docs](https://vite.dev/guide/build#library-mode)
- [Build a React component library with TypeScript and Vite - Víctor Lillo](https://victorlillo.dev/blog/react-typescript-vite-component-library)
- [Create a Component Library Fast with Vite Library Mode - DEV Community](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma)
- [TypeScript and NPM package.json exports the 2024 way - Velopen](https://www.velopen.com/blog/typescript-npm-package-json-exports/)
- [Building an npm package compatible with ESM and CJS in 2024 - DEV Community](https://dev.to/snyk/building-an-npm-package-compatible-with-esm-and-cjs-in-2024-88m)
- [Tree Shaking in React: How to write a tree-shakable component library - DEV Community](https://dev.to/lukasbombach/how-to-write-a-tree-shakable-component-library-4ied)
- [npm package.json Exports Field](https://docs.npmjs.com/cli/v7/configuring-npm/package-json/)
- [Node.js Peer Dependencies](https://nodejs.org/en/blog/npm/peer-dependencies)
- [Building a React Component Library with Vite, Vitest, TypeScript, and Storybook - Medium](https://medium.com/@dilorennzo/building-a-react-component-library-a-complete-guide-with-vite-vitest-typescript-tailwind-css-788f3b7c3700)
- [Storybook for React with Vite - Official Docs](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Portable Stories in Vitest - Storybook Docs](https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest)
````

## File: plans/reports/brainstorm-251222-chat-media-view-npm-library.md
````markdown
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
````

## File: README.md
````markdown
# chat-media-view

Telegram-style image grid for React chat applications

## Installation

```bash
npm install chat-media-view
# or
yarn add chat-media-view
```

## Usage

```jsx
import React from 'react';
import { ChatMediaView } from 'chat-media-view';
import 'chat-media-view/styles.css';

const App = () => {
  const images = [
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+3',
  ];

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <ChatMediaView images={images} />
    </div>
  );
};

export default App;
```

## Development Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the library for production.
- `npm run test`: Runs tests.
- `npm run storybook`: Starts the Storybook development server.
````

## File: repomix-output.xml
````xml
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.claude/settings.local.json
.storybook/main.ts
.storybook/preview.ts
package.json
plans/251222-chat-media-view-npm-library/phase-01-project-setup.md
plans/251222-chat-media-view-npm-library/phase-02-grid-layout-engine.md
plans/251222-chat-media-view-npm-library/phase-03-core-components.md
plans/251222-chat-media-view-npm-library/phase-04-enhanced-ux.md
plans/251222-chat-media-view-npm-library/phase-05-polish-docs.md
plans/251222-chat-media-view-npm-library/plan.md
plans/251222-chat-media-view-npm-library/research/researcher-01-telegram-grid-layout.md
plans/251222-chat-media-view-npm-library/research/researcher-02-npm-library-setup.md
plans/reports/brainstorm-251222-chat-media-view-npm-library.md
README.md
src/index.test.ts
src/index.ts
src/test/setup.ts
src/types.ts
styles/chat-image-grid.css
tsconfig.json
vite.config.ts
vitest.config.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".claude/settings.local.json">
{
  "permissions": {
    "allow": [
      "Bash(python:*)",
      "Skill(frontend-development)",
      "Bash(npm init:*)",
      "Bash(npm install:*)",
      "Bash(npx storybook@latest init:*)",
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(npm run test)",
      "Bash(if [:*)",
      "Bash(then:*)",
      "Bash(fi:*)",
      "Bash(repomix:*)"
    ]
  }
}
</file>

<file path=".storybook/main.ts">
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite"
};
export default config;
</file>

<file path=".storybook/preview.ts">
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
</file>

<file path="package.json">
{
  "name": "chat-media-view",
  "version": "0.0.1",
  "description": "Telegram-style image grid for React chat applications",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "sideEffects": [
    "**/*.css"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "keywords": [
    "react",
    "image-grid",
    "chat",
    "telegram",
    "media",
    "gallery"
  ],
  "author": "",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": ""
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.2",
    "@vitest/coverage-v8": "^3.2.4",
    "jsdom": "^27.0.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "typescript": "^5.9.3",
    "vite": "^7.3.0",
    "vite-plugin-dts": "^4.5.4",
    "vitest": "^3.2.4",
    "storybook": "^10.1.10",
    "@storybook/react-vite": "^10.1.10",
    "@chromatic-com/storybook": "^4.1.3",
    "@storybook/addon-vitest": "^10.1.10",
    "@storybook/addon-a11y": "^10.1.10",
    "@storybook/addon-docs": "^10.1.10",
    "@storybook/addon-onboarding": "^10.1.10",
    "playwright": "^1.57.0",
    "@vitest/browser": "^3.2.4"
  }
}
</file>

<file path="plans/251222-chat-media-view-npm-library/phase-01-project-setup.md">
# Phase 1: Project Setup

**Status:** Pending
**Estimated Effort:** 2-3 hours

## Context

- [Main Plan](./plan.md)
- [NPM Library Setup Research](./research/researcher-02-npm-library-setup.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Initialize npm package with Vite library mode, TypeScript strict config, Vitest testing, and Storybook. Set up dual ESM/CJS builds targeting < 5KB gzipped.

## Key Insights (from Research)

- Vite 7+ library mode with `vite-plugin-dts` for automatic `.d.ts` generation
- ESM primary + CJS fallback for tree-shaking + backwards compat
- `sideEffects: ["**/*.css"]` prevents CSS tree-shaking issues
- React 18/19 peer dependencies with broad version ranges
- Vitest + Testing Library for component tests

## Requirements

1. Initialize npm package with correct `package.json` structure
2. Configure Vite library mode (ESM + CJS output)
3. Set up TypeScript strict mode
4. Configure Vitest with jsdom environment
5. Initialize Storybook with React-Vite framework
6. Create vanilla CSS with custom properties structure

## Architecture

```
chat-media-view/
├── src/
│   ├── index.ts              # Public exports
│   └── test/
│       └── setup.ts          # Vitest setup
├── styles/
│   └── chat-image-grid.css   # CSS custom properties
├── .storybook/
│   └── main.ts               # Storybook config
├── package.json              # npm config
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite library mode
└── vitest.config.ts          # Test config
```

## Related Code Files

| File | Purpose |
|------|---------|
| `package.json` | npm metadata, exports, peer deps |
| `vite.config.ts` | Library build config |
| `tsconfig.json` | TypeScript strict settings |
| `vitest.config.ts` | Test environment setup |
| `src/index.ts` | Public API barrel |
| `styles/chat-image-grid.css` | CSS custom properties |

## Implementation Steps

### Step 1: Initialize Package
```bash
npm init -y
```

Update `package.json`:
```json
{
  "name": "chat-media-view",
  "version": "0.0.1",
  "description": "Telegram-style image grid for React chat applications",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

### Step 2: Install Dependencies
```bash
npm install -D react react-dom @types/react @types/react-dom typescript vite @vitejs/plugin-react vite-plugin-dts vitest jsdom @testing-library/react @testing-library/jest-dom @storybook/react-vite storybook
```

### Step 3: Vite Config
Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' }
      }
    }
  }
})
```

### Step 4: TypeScript Config
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

### Step 5: Vitest Config
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
})
```

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

### Step 6: Storybook Init
```bash
npx storybook@latest init --type react --builder vite
```

### Step 7: CSS Foundation
Create `styles/chat-image-grid.css`:
```css
.chat-image-grid {
  --cmv-gap: 2px;
  --cmv-radius-outer: 12px;
  --cmv-radius-inner: 4px;
  --cmv-max-width: 400px;
  --cmv-bg-placeholder: #e0e0e0;

  display: grid;
  gap: var(--cmv-gap);
  max-width: var(--cmv-max-width);
  border-radius: var(--cmv-radius-outer);
  overflow: hidden;
}
```

### Step 8: Entry Point
Create `src/index.ts`:
```typescript
// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'

// Utilities
export { calculateGridHeight } from './calculateGridHeight'

// Types
export type { ChatImageGridProps, ImageItem } from './types'
```

## Todo List

- [ ] Run `npm init -y` and update package.json
- [ ] Install dev dependencies
- [ ] Create vite.config.ts with library mode
- [ ] Create tsconfig.json with strict mode
- [ ] Create vitest.config.ts with jsdom
- [ ] Create src/test/setup.ts
- [ ] Initialize Storybook
- [ ] Create styles/chat-image-grid.css foundation
- [ ] Create src/index.ts barrel export
- [ ] Create src/types.ts with interfaces
- [ ] Verify build produces ESM + CJS
- [ ] Verify TypeScript compiles without errors

## Success Criteria

- [x] `npm run build` produces `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`
- [x] `npm run test` runs without errors
- [x] `npm run storybook` launches dev server
- [x] TypeScript strict mode passes
- [x] Package exports resolve correctly

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Vite plugin compatibility | Pin vite-plugin-dts version |
| Storybook version conflicts | Use latest stable (8.3+) |
| CSS not bundled correctly | Verify sideEffects config |

## Security Considerations

- No runtime dependencies (React as peer dep)
- No network calls in build
- No file system access beyond build

## Next Steps

After Phase 1 complete, proceed to [Phase 2: Grid Layout Engine](./phase-02-grid-layout-engine.md)
</file>

<file path="plans/251222-chat-media-view-npm-library/phase-02-grid-layout-engine.md">
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
</file>

<file path="plans/251222-chat-media-view-npm-library/phase-03-core-components.md">
# Phase 3: Core Components

**Status:** Pending
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
</file>

<file path="plans/251222-chat-media-view-npm-library/phase-04-enhanced-ux.md">
# Phase 4: Enhanced UX

**Status:** Pending
**Estimated Effort:** 4-5 hours
**Dependencies:** Phase 3 complete

## Context

- [Main Plan](./plan.md)
- [Phase 3: Core Components](./phase-03-core-components.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)

## Overview

Add BlurHash/ThumbHash placeholder rendering, download progress tracking via ReadableStream, improved loading states, and smooth fade-in animations. Enhances perceived performance.

## Key Insights

- ThumbHash preferred over BlurHash (better color reproduction, smaller)
- ReadableStream API for download progress (fetch streaming)
- Canvas-based placeholder rendering (small bundle)
- CSS opacity transitions for smooth reveal

## Requirements

1. BlurHashCanvas renders placeholder from hash string
2. ThumbHash support (decode + render)
3. DownloadManager tracks progress via ReadableStream
4. Loading state shows placeholder until image ready
5. Smooth fade from placeholder to image
6. Error state with retry capability

## Architecture

```
src/
├── BlurHashCanvas.tsx      # BlurHash/ThumbHash renderer
├── DownloadManager.ts      # Fetch + progress tracking
├── hooks/
│   ├── useImageLoad.ts     # Combined load + placeholder
│   └── useDownload.ts      # Download with progress
└── ImageCell.tsx           # Updated with placeholder
```

## Related Code Files

| File | Purpose |
|------|---------|
| `src/BlurHashCanvas.tsx` | Canvas placeholder |
| `src/DownloadManager.ts` | Progress tracking |
| `src/hooks/useImageLoad.ts` | Image loading logic |
| `src/hooks/useDownload.ts` | Download hook |
| `src/ImageCell.tsx` | Integrate placeholders |

## Implementation Steps

### Step 1: ThumbHash Decoder

ThumbHash is preferred - smaller payload, better colors. Decode from base64 to RGBA pixels.

```typescript
// src/thumbhash.ts
// Minimal ThumbHash decoder (~1KB)
export function thumbHashToRGBA(hash: Uint8Array): {
  w: number
  h: number
  rgba: Uint8Array
} {
  // Decode header
  const header = hash[0] | (hash[1] << 8) | (hash[2] << 16)
  const hasAlpha = (header & 0x80) !== 0
  const lx = Math.max(3, (header & 0x7) !== 0 ? (header & 0x7) : (header >> 3) & 0x7)
  const ly = Math.max(3, hasAlpha ? 5 : (header >> 3) & 0x7)

  // Simplified decode - actual implementation more complex
  const w = Math.round(lx * 32 / Math.max(lx, ly))
  const h = Math.round(ly * 32 / Math.max(lx, ly))
  const rgba = new Uint8Array(w * h * 4)

  // Decode AC coefficients to pixels
  // ... (full decode logic)

  return { w, h, rgba }
}

export function thumbHashToDataURL(hash: string): string {
  const bytes = base64ToBytes(hash)
  const { w, h, rgba } = thumbHashToRGBA(bytes)
  return rgbaToDataURL(w, h, rgba)
}
```

### Step 2: BlurHash Canvas Component

```typescript
// src/BlurHashCanvas.tsx
import { useEffect, useRef } from 'react'
import { decode as decodeBlurHash } from 'blurhash'
import { thumbHashToRGBA } from './thumbhash'

interface BlurHashCanvasProps {
  hash: string
  hashType: 'blurhash' | 'thumbhash'
  width: number
  height: number
  className?: string
}

export function BlurHashCanvas({
  hash,
  hashType,
  width,
  height,
  className
}: BlurHashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hash) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      let pixels: Uint8ClampedArray

      if (hashType === 'blurhash') {
        // BlurHash decode (32x32 is sufficient for placeholder)
        pixels = decodeBlurHash(hash, 32, 32)
      } else {
        // ThumbHash decode
        const { rgba } = thumbHashToRGBA(base64ToBytes(hash))
        pixels = new Uint8ClampedArray(rgba)
      }

      const imageData = new ImageData(pixels, 32, 32)
      ctx.putImageData(imageData, 0, 0)
    } catch (e) {
      console.warn('Failed to decode hash:', e)
    }
  }, [hash, hashType])

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  )
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
```

### Step 3: Download Manager

```typescript
// src/DownloadManager.ts
export interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

export async function downloadWithProgress(
  url: string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentLength = response.headers.get('Content-Length')
  const total = contentLength ? parseInt(contentLength, 10) : 0

  // Fallback if no Content-Length or no ReadableStream
  if (!total || !response.body) {
    return response.blob()
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let loaded = 0

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    chunks.push(value)
    loaded += value.length

    onProgress?.({
      loaded,
      total,
      percentage: Math.round((loaded / total) * 100)
    })
  }

  return new Blob(chunks, {
    type: response.headers.get('Content-Type') || 'image/jpeg'
  })
}
```

### Step 4: useDownload Hook

```typescript
// src/hooks/useDownload.ts
import { useState, useCallback } from 'react'
import { downloadWithProgress, DownloadProgress } from '../DownloadManager'

interface UseDownloadResult {
  download: (url: string) => Promise<string>
  progress: DownloadProgress | null
  isDownloading: boolean
  error: Error | null
}

export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const download = useCallback(async (url: string): Promise<string> => {
    setIsDownloading(true)
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const blob = await downloadWithProgress(url, setProgress)
      const objectUrl = URL.createObjectURL(blob)
      return objectUrl
    } catch (e) {
      setError(e as Error)
      throw e
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { download, progress, isDownloading, error }
}
```

### Step 5: Updated ImageCell

```typescript
// src/ImageCell.tsx (updated)
import { useRef, useState, useCallback } from 'react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { BlurHashCanvas } from './BlurHashCanvas'
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
    skip: !lazyLoad
  })

  const shouldLoad = !lazyLoad || isVisible
  const hasPlaceholder = image.blurhash || image.thumbhash

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
  }, [])

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
      {/* Placeholder layer */}
      {hasPlaceholder && !loaded && (
        <BlurHashCanvas
          hash={(image.thumbhash || image.blurhash)!}
          hashType={image.thumbhash ? 'thumbhash' : 'blurhash'}
          width={layout.width}
          height={layout.height}
          className="chat-image-cell__placeholder"
        />
      )}

      {/* Image layer */}
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

      {/* Error state */}
      {error && (
        <div className="chat-image-cell__error">
          <span>Failed to load</span>
          <button
            onClick={(e) => { e.stopPropagation(); setError(false); }}
            className="chat-image-cell__retry"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
```

### Step 6: Enhanced CSS

```css
/* styles/chat-image-grid.css (additions) */

.chat-image-cell__placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.chat-image-cell__img {
  position: absolute;
  inset: 0;
  z-index: 2;
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
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 12px;
  background-color: #f5f5f5;
}

.chat-image-cell__retry {
  padding: 4px 12px;
  font-size: 11px;
  color: #007bff;
  background: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
}

.chat-image-cell__retry:hover {
  background: #007bff;
  color: white;
}

/* Progress indicator (optional) */
.chat-image-cell__progress {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 3px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  overflow: hidden;
  z-index: 4;
}

.chat-image-cell__progress-bar {
  height: 100%;
  background: #007bff;
  transition: width 0.1s ease;
}
```

### Step 7: Tests

```typescript
// src/__tests__/BlurHashCanvas.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BlurHashCanvas } from '../BlurHashCanvas'

describe('BlurHashCanvas', () => {
  it('renders canvas element', () => {
    const { container } = render(
      <BlurHashCanvas
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        hashType="blurhash"
        width={100}
        height={100}
      />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })
})

// src/__tests__/DownloadManager.test.ts
import { describe, it, expect, vi } from 'vitest'
import { downloadWithProgress } from '../DownloadManager'

describe('DownloadManager', () => {
  it('tracks download progress', async () => {
    const progress = vi.fn()
    // Mock fetch with ReadableStream
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'Content-Length': '1000' }),
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(500))
          controller.enqueue(new Uint8Array(500))
          controller.close()
        }
      })
    })

    await downloadWithProgress('https://example.com/image.jpg', progress)
    expect(progress).toHaveBeenCalled()
  })
})
```

## Todo List

- [ ] Implement ThumbHash decoder (minimal version)
- [ ] Create BlurHashCanvas component
- [ ] Add blurhash package as optional peer dep
- [ ] Implement DownloadManager with ReadableStream
- [ ] Create useDownload hook
- [ ] Update ImageCell with placeholder layer
- [ ] Add fade transition CSS
- [ ] Implement error state with retry
- [ ] Add progress bar component (optional)
- [ ] Write unit tests
- [ ] Update Storybook with placeholder demos
- [ ] Test fallback for non-streaming responses

## Success Criteria

- [x] Placeholder renders immediately from hash
- [x] Smooth fade from placeholder to image
- [x] Download progress reports accurate percentage
- [x] Error state shows retry button
- [x] Works without placeholder (graceful degradation)
- [x] Bundle stays under 5KB

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| BlurHash bundle size | Use optional peer dep |
| ReadableStream support | Fallback to blob() |
| Canvas performance | Keep decode size small (32x32) |

## Security Considerations

- Validate hash format before decode
- Sanitize blob MIME type
- No arbitrary code execution from hashes

## Next Steps

After Phase 4 complete, proceed to [Phase 5: Polish & Docs](./phase-05-polish-docs.md)
</file>

<file path="plans/251222-chat-media-view-npm-library/phase-05-polish-docs.md">
# Phase 5: Polish & Documentation

**Status:** Pending
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
</file>

<file path="plans/251222-chat-media-view-npm-library/plan.md">
# chat-media-view Implementation Plan

**Package:** `chat-media-view`
**Status:** Ready for Implementation
**Target:** < 5KB gzipped React component library

## Overview

Telegram-style image grid (1-5 images) for chat applications. Virtual list agnostic with `calculateGridHeight()` utility. BlurHash/ThumbHash placeholders. Download progress via ReadableStream.

## Architecture

```
src/
├── ChatImageGrid.tsx       # Main component (props: images, onImageClick, etc.)
├── ImageCell.tsx           # Single image + lazy load (Intersection Observer)
├── GridLayoutEngine.ts     # Layout calculations for 1-5 images
├── BlurHashCanvas.tsx      # Placeholder renderer (ThumbHash preferred)
├── DownloadManager.ts      # Fetch + ReadableStream progress
├── calculateGridHeight.ts  # Virtual list utility export
└── index.ts                # Public API exports
styles/
└── chat-image-grid.css     # Vanilla CSS + custom properties
```

## Core API

```tsx
interface ChatImageGridProps {
  images: ImageItem[];
  maxWidth?: number;       // default: 400
  gap?: number;            // default: 2
  borderRadius?: number;   // default: 12
  onImageClick?: (index: number, image: ImageItem) => void;
  onDownload?: (image: ImageItem, progress: number) => void;
  lazyLoad?: boolean;      // default: true
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

function calculateGridHeight(images: ImageItem[], maxWidth: number): number;
```

## Implementation Phases

| Phase | Focus | File |
|-------|-------|------|
| 1 | Project Setup | [phase-01-project-setup.md](./phase-01-project-setup.md) |
| 2 | Grid Layout Engine | [phase-02-grid-layout-engine.md](./phase-02-grid-layout-engine.md) |
| 3 | Core Components | [phase-03-core-components.md](./phase-03-core-components.md) |
| 4 | Enhanced UX | [phase-04-enhanced-ux.md](./phase-04-enhanced-ux.md) |
| 5 | Polish & Docs | [phase-05-polish-docs.md](./phase-05-polish-docs.md) |

## Success Metrics

- Bundle size < 5KB gzipped (core)
- Zero layout shift (CLS = 0)
- Works with react-window, react-virtualized, @tanstack/virtual
- TypeScript strict mode compliant
- Storybook documentation complete

## Research References

- [Telegram Grid Layout Research](./research/researcher-01-telegram-grid-layout.md)
- [NPM Library Setup Research](./research/researcher-02-npm-library-setup.md)
- [Brainstorm Report](../reports/brainstorm-251222-chat-media-view-npm-library.md)
</file>

<file path="plans/251222-chat-media-view-npm-library/research/researcher-01-telegram-grid-layout.md">
# Telegram Image Grid Layout Research

**Date:** 2025-12-22
**Status:** Complete
**Scope:** Image grid layout for 1-5 images in chat messages

## Executive Summary

Telegram uses a custom layout algorithm for grouped media (albums) supporting 1-10 items. No publicly documented official specification exists. Found reverse-engineered implementations in open-source projects but exact algorithm remains proprietary. Telegram arranges photos as "elegantly proportioned thumbnails" maintaining aspect ratios within grid constraints.

---

## Key Findings

### 1. Album & Layout Basics

**Telegram Features (v4.5+):**
- Auto-groups multiple photos/videos sent together into albums
- Supports up to 10 items per album
- Single notification instead of multiple on recipient side
- Arrangement as "elegantly proportioned thumbnails"

**No Official Documentation:** Telegram does not publish layout algorithm specs. Implementation derived from reverse-engineering source code.

---

### 2. Aspect Ratio Handling

**General Image Recommendations:**
- Profile photos: 512×512px (square)
- Posts: 1280×1280px (square) or 1280×720px (landscape)
- Link previews: 1200×630px (1.91:1 aspect ratio)

**Grid Constraints:**
- Each image maintains original aspect ratio when possible
- Grid cells adapt to available container width
- Photos stretched/shrunk minimally to fill rows uniformly

**Algorithm Approach:** Similar to Knuth-Plass line-breaking algorithm (used by react-photo-album rows layout):
- Calculates optimal row heights
- Uses Dijkstra's algorithm for shortest path
- Keeps row heights consistent while respecting aspect ratios

---

### 3. Layout Pattern for Image Counts (1-5)

Based on reverse-engineering and common mobile messenger patterns:

| Count | Layout Pattern | Notes |
|-------|---|---|
| 1 | Single large image | Full container width |
| 2 | Two columns | Equal width, aspect ratios maintained |
| 3 | Two on top, one below | Or asymmetric based on aspect |
| 4 | 2×2 grid | Equal cells, uniform sizing |
| 5 | Custom mosaic | Varies by aspect ratios |

**Evidence:** Telegram Android source (DrKLO/Telegram) contains custom view implementations in `RecyclerListView.java` and photo components but specific layout math not exposed in public code.

---

### 4. Spacing & Dimensions

**Estimated Gap Values:**
- Inter-image gap: 2-4px (tight grouping)
- Container padding: 0-8px

**Max Dimensions:**
- Single image: Container width (capped at 320-512px on mobile)
- Grid containers: Fill available chat bubble width
- Border constraints prevent overflow

**Reference:** CSS grid implementations use `gap: 20px` and `border-radius: 12px` for similar layouts, but Telegram appears more compact.

---

### 5. Border Radius Rules

**Typical Pattern:**
- **Outer corners:** Full radius (e.g., 12-16px)
- **Inner corners:** Reduced or no radius (0-4px for shared edges)
- **Single image:** Full rounded corners on all sides

**Implementation Method:** Apply border-radius selectively based on position:
- Top-left corner of grid: `border-radius: 12px 0 0 0`
- Top-right: `border-radius: 0 12px 0 0`
- Bottom corners similarly
- Shared edges: No radius

---

### 6. Open-Source Implementations

#### A. **React Photo Album**
- **Link:** [React Photo Album](https://react-photo-album.com/)
- **Features:**
  - Rows, columns, masonry layouts
  - Aspect ratio preservation
  - CSS-based styling
  - Responsive calculations
- **Relevance:** Not Telegram-specific but uses similar algorithm concepts (Knuth-Plass for row layout)

#### B. **TelegramGallery (Android)**
- **Link:** [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- **Info:** Android library extracted from Telegram
- **Features:** Album selection, multi-select, photo preview
- **Limitation:** Focuses on picker UI, not layout algorithm

#### C. **Official Telegram Source**
- **Link:** [GitHub - Telegram Desktop/Android](https://github.com/DrKLO/Telegram)
- **Contains:**
  - `PhotoViewer.java` - Image gallery viewer
  - `RecyclerListView.java` - Chat message layout
  - Custom view components for media groups
- **Issue:** Code is minimally documented; layout logic scattered across components

#### D. **Related Libraries**
- **react-visual-grid:** Image grid/masonry for React - [GitHub](https://github.com/prabhuignoto/react-visual-grid)
- **react-grid-gallery:** Multi-select grid gallery - npm package

---

## Algorithm Pseudo-Code (Inferred)

```
function layoutImages(images, containerWidth) {
  // Normalize aspect ratios
  let normalizedItems = images.map(img => ({
    width: img.width,
    height: img.height,
    aspectRatio: img.width / img.height
  }))

  // Determine grid structure based on count
  switch(images.length) {
    case 1:
      return { layout: 'single', width: containerWidth, height: auto }
    case 2:
      return { layout: 'two-col', colWidth: containerWidth/2, height: auto }
    case 3:
      return { layout: '2-1', topRowHeight: auto, bottomHeight: auto }
    case 4:
      return { layout: 'grid-2x2', cellSize: containerWidth/2, height: auto }
    case 5:
      // Complex: optimize based on aspect ratios
      return optimizeMosaic(normalizedItems, containerWidth)
  }
}

function optimizeMosaic(items, width) {
  // Use Dijkstra's algorithm to find optimal row breaks
  // Minimize height variance across rows
  // Preserve aspect ratios
  return { rows: [...], heights: [...], gaps: 2-4px }
}
```

---

## Spacing Constants (Estimated)

| Element | Value | Notes |
|---------|-------|-------|
| Gap between images | 2-4px | Compact grouping |
| Outer border-radius | 12-16px | Mobile standard |
| Inner radius | 0-4px | Minimal at shared edges |
| Max height (single) | 512-640px | Mobile constraint |
| Container padding | 0-8px | Minimal |

---

## Missing Implementation Details

**Unresolved Questions:**

1. **Exact aspect ratio thresholds:** When does Telegram switch from 2-col to asymmetric layout for 3 items?
2. **Height calculation formula:** Mathematical formula for optimal row heights (Telegram likely uses variant of Knuth-Plass)
3. **Panorama handling:** How are extreme aspect ratios (>3:1) constrained?
4. **Animated GIF/Video:** Different layout rules for mixed media types?
5. **Scaling on different devices:** Exact breakpoints for mobile vs tablet vs desktop
6. **RTL considerations:** Right-to-left layout adjustments (if any)

---

## References & Sources

- [React Photo Album Documentation](https://react-photo-album.com/documentation)
- [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- [Official Telegram Source (DrKLO/Telegram)](https://github.com/DrKLO/Telegram)
- [Telegram Blog - Albums Feature](https://telegram.org/blog/albums-saved-messages)
- [React Visual Grid Library](https://github.com/prabhuignoto/react-visual-grid)
- [Telegram Image Compression Research](https://rifqimfahmi.dev/blog/telegram-like-image-optimization-on-android)

---

## Recommendation for Implementation

**Strategy:** Implement custom layout engine inspired by react-photo-album's rows algorithm with Telegram-specific constraints:

1. Use aspect ratio-aware row packing (Knuth-Plass variant)
2. Hard-code layout patterns for 1-5 images
3. Add compact gap (2-4px) and Telegram-style border-radius
4. Test against actual Telegram client visually
5. Consider detecting if exact algorithm via pixel measurement & reverse-engineering

**Why no exact match:** Telegram's algorithm is proprietary and undocumented. Close approximation achievable through careful CSS grid or custom canvas/flex layout.
</file>

<file path="plans/251222-chat-media-view-npm-library/research/researcher-02-npm-library-setup.md">
# NPM React Component Library Setup (Vite + TypeScript)
**Research Report** | 2024/2025 Best Practices

---

## 1. Vite Library Mode Setup

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

**Key Points:**
- `formats: ['es', 'cjs']` produces both ESM and CommonJS builds (ESM primary for tree-shaking)
- Externalizes React/ReactDOM (peerDependencies, not bundled)
- `preserveModules` handled by Rollup defaults (one file per module)

---

## 2. TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "src/**/*.stories.ts", "src/**/*.test.ts"]
}
```

---

## 3. Package.json Structure

```json
{
  "name": "@yourorg/chat-media-view",
  "version": "0.1.0",
  "description": "React component library for chat media display",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": {
      "import": "./dist/styles.css"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": false
    },
    "react-dom": {
      "optional": false
    }
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite-plugin-dts": "^3.0.0",
    "vitest": "^1.0.0",
    "@storybook/react-vite": "^8.3.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  },
  "scripts": {
    "build": "vite build",
    "test": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "type-check": "tsc --noEmit"
  }
}
```

**Critical Points:**
- `"type": "module"` enables ESM defaults
- `"sideEffects": ["**/*.css"]` prevents CSS tree-shaking
- `exports` field (preferred over `main`/`module`) with `types` subfield for each condition
- Peer dependencies: use broad version ranges (`^18.0.0`), not locked patches
- Lenient React version range covers React 18 & 19

---

## 4. CSS Handling

### Vanilla CSS Bundling

**Option A: Inline CSS (Recommended for small libraries)**
```typescript
// vite.config.ts - add to build options
build: {
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name.endsWith('.css')) {
          return 'styles.css'
        }
        return assetInfo.name
      }
    }
  }
}
```

**Option B: Separate CSS File**
```typescript
// src/index.ts
import './styles.css' // included in dist/styles.css

export { Button } from './components/Button'
export { Input } from './components/Input'
```

**Option C: CSS Modules (Per-component)**
```typescript
// src/components/Button.tsx
import styles from './Button.module.css'

export const Button = () => <button className={styles.root}>Click</button>
```

**sideEffects Configuration:**
```json
"sideEffects": ["**/*.css", "**/*.scss"]
```

---

## 5. Tree-Shaking Optimization

### Requirements for Tree-Shaking

1. **ESM Output (Primary)**
   - Static imports enable bundler analysis
   - Set `formats: ['es', 'cjs']` with ESM first

2. **Preserve Module Structure**
   - Vite preserves individual modules by default
   - Avoid pre-bundling with tsup/esbuild (use Vite instead)

3. **Mark Side Effects**
   ```json
   "sideEffects": ["**/*.css"]
   ```

4. **Named Exports (Not Default)**
   ```typescript
   // ✅ Good - tree-shakeable
   export const Button = () => {}
   export const Input = () => {}

   // ❌ Bad - not tree-shakeable
   export default { Button, Input }
   ```

5. **Check Build Output**
   ```bash
   vite build --mode=analyze  # Shows bundle size by module
   ```

---

## 6. Dual ESM/CJS Support Strategy

### Recommendation: ESM Primary + CJS Fallback

**Why ESM-first?**
- Tree-shaking support (CJS limited)
- Modern tooling preference
- React 19+ community standard

**ESM-only Alternative:**
- Valid if targeting React 18+
- Reduces build complexity
- Most users have ESM support

**Dual Support (Recommended):**
```typescript
// vite.config.ts
build: {
  lib: {
    formats: ['es', 'cjs'],
  },
  rollupOptions: {
    output: [
      {
        format: 'es',
        entryFileNames: 'index.js',
        dir: 'dist'
      },
      {
        format: 'cjs',
        entryFileNames: 'index.cjs',
        dir: 'dist'
      }
    ]
  }
}
```

**package.json exports:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
}
```

---

## 7. Testing Setup (Vitest)

### Installation

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### src/test/setup.ts

```typescript
import '@testing-library/jest-dom'
```

### Example Test

```typescript
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeDefined()
  })
})
```

### package.json Script

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage"
```

---

## 8. Storybook Integration

### Installation

```bash
npx storybook@latest init
```

### .storybook/main.ts (Vite Framework)

```typescript
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials']
}

export default config
```

### Example Story

```typescript
// src/components/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Click me' }
}
```

### Vitest + Storybook (Storybook 8.3+)

```typescript
// src/components/Button.test.tsx
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from './Button.stories'

const { Primary } = composeStories(stories)

it('renders story as test', () => {
  render(<Primary />)
  expect(screen.getByRole('button')).toBeDefined()
})
```

---

## Summary Table

| Aspect | Recommendation | Rationale |
|--------|---|---|
| **Bundler** | Vite 7+ | Fast, library-mode optimized, preserves modules |
| **Formats** | ESM + CJS | ESM for tree-shaking, CJS for backwards compat |
| **CSS** | Inline + sideEffects | Bundled with components, proper tree-shake marking |
| **React Versions** | ^18.0.0 \|\| ^19.0.0 | Covers both stable and latest |
| **Types** | vite-plugin-dts | Automatic .d.ts generation |
| **Testing** | Vitest + Portable Stories | Modern, Storybook-native |
| **Exports Field** | Yes (modern standard) | Replaces main/module, supports conditions |

---

## Unresolved Questions

- **Does chat-media-view require CSS variables/theming?** Affects CSS bundling strategy
- **Target React versions?** (Currently assuming 18+)
- **Tree-shaking priority vs CJS compatibility?** ESM-only simpler but less compat

---

## Sources

- [Vite Library Mode - Official Docs](https://vite.dev/guide/build#library-mode)
- [Build a React component library with TypeScript and Vite - Víctor Lillo](https://victorlillo.dev/blog/react-typescript-vite-component-library)
- [Create a Component Library Fast with Vite Library Mode - DEV Community](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma)
- [TypeScript and NPM package.json exports the 2024 way - Velopen](https://www.velopen.com/blog/typescript-npm-package-json-exports/)
- [Building an npm package compatible with ESM and CJS in 2024 - DEV Community](https://dev.to/snyk/building-an-npm-package-compatible-with-esm-and-cjs-in-2024-88m)
- [Tree Shaking in React: How to write a tree-shakable component library - DEV Community](https://dev.to/lukasbombach/how-to-write-a-tree-shakable-component-library-4ied)
- [npm package.json Exports Field](https://docs.npmjs.com/cli/v7/configuring-npm/package-json/)
- [Node.js Peer Dependencies](https://nodejs.org/en/blog/npm/peer-dependencies)
- [Building a React Component Library with Vite, Vitest, TypeScript, and Storybook - Medium](https://medium.com/@dilorennzo/building-a-react-component-library-a-complete-guide-with-vite-vitest-typescript-tailwind-css-788f3b7c3700)
- [Storybook for React with Vite - Official Docs](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Portable Stories in Vitest - Storybook Docs](https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest)
</file>

<file path="plans/reports/brainstorm-251222-chat-media-view-npm-library.md">
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
</file>

<file path="README.md">
# chat-media-view

Telegram-style image grid for React chat applications

## Installation

```bash
npm install chat-media-view
# or
yarn add chat-media-view
```

## Usage

```jsx
import React from 'react';
import { ChatMediaView } from 'chat-media-view';
import 'chat-media-view/styles.css';

const App = () => {
  const images = [
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+3',
  ];

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <ChatMediaView images={images} />
    </div>
  );
};

export default App;
```

## Development Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the library for production.
- `npm run test`: Runs tests.
- `npm run storybook`: Starts the Storybook development server.
</file>

<file path="src/index.test.ts">
import { describe, it, expect } from 'vitest'
import { ChatImageGrid, calculateGridHeight } from './index'
import type { ImageItem } from './types'

describe('chat-media-view exports', () => {
  it('exports ChatImageGrid component', () => {
    expect(ChatImageGrid).toBeDefined()
    expect(typeof ChatImageGrid).toBe('function')
  })

  it('exports calculateGridHeight utility', () => {
    expect(calculateGridHeight).toBeDefined()
    expect(typeof calculateGridHeight).toBe('function')
  })

  it('calculateGridHeight returns a number', () => {
    const images: ImageItem[] = [
      { src: 'test.jpg', width: 100, height: 100 },
    ]
    const result = calculateGridHeight(images, 400)
    expect(typeof result).toBe('number')
  })
})
</file>

<file path="src/index.ts">
// Components (placeholder exports - will be implemented in Phase 3)
// export { ChatImageGrid } from './ChatImageGrid'
// export { ImageCell } from './ImageCell'

// Utilities (placeholder exports - will be implemented in Phase 2)
// export { calculateGridHeight } from './calculate-grid-height'

// Types
export type {
	ChatImageGridProps,
	ImageItem,
	GridLayout,
	CellDimensions,
} from "./types";

// Placeholder component for build verification
export const ChatImageGrid = (): null => null;
export const calculateGridHeight = (
	_images: unknown[],
	_maxWidth: number,
): number => 0;
</file>

<file path="src/test/setup.ts">
import '@testing-library/jest-dom'
</file>

<file path="src/types.ts">
/**
 * Props for a single image in the grid
 */
export interface ImageItem {
  /** Source URL of the image */
  src: string
  /** Optional thumbnail URL for low-res preview */
  thumbnail?: string
  /** BlurHash string for placeholder */
  blurhash?: string
  /** ThumbHash string for placeholder (preferred over blurhash) */
  thumbhash?: string
  /** Original image width in pixels */
  width: number
  /** Original image height in pixels */
  height: number
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Props for the ChatImageGrid component
 */
export interface ChatImageGridProps {
  /** Array of images to display (1-5 images) */
  images: ImageItem[]
  /** Maximum width of the grid in pixels */
  maxWidth?: number
  /** Gap between images in pixels */
  gap?: number
  /** Border radius for outer corners */
  borderRadius?: number
  /** Callback when an image is clicked */
  onImageClick?: (index: number, image: ImageItem) => void
  /** Callback for download progress updates */
  onDownload?: (image: ImageItem, progress: number) => void
  /** Enable lazy loading with Intersection Observer */
  lazyLoad?: boolean
  /** Custom class name for the grid container */
  className?: string
}

/**
 * Grid layout configuration for a specific image count
 */
export interface GridLayout {
  /** Number of columns */
  columns: number
  /** Number of rows */
  rows: number
  /** Grid template columns CSS value */
  gridTemplateColumns: string
  /** Grid template rows CSS value */
  gridTemplateRows: string
  /** Grid areas for each image position */
  areas: string[][]
}

/**
 * Calculated dimensions for a cell in the grid
 */
export interface CellDimensions {
  /** Cell width in pixels */
  width: number
  /** Cell height in pixels */
  height: number
  /** Grid column start position */
  gridColumn: string
  /** Grid row start position */
  gridRow: string
}
</file>

<file path="styles/chat-image-grid.css">
.chat-image-grid {
  /* Spacing */
  --cmv-gap: 2px;

  /* Border radius */
  --cmv-radius-outer: 12px;
  --cmv-radius-inner: 4px;

  /* Sizing */
  --cmv-max-width: 400px;

  /* Colors */
  --cmv-bg-placeholder: #e0e0e0;
  --cmv-bg-loading: #f0f0f0;
  --cmv-overlay-hover: rgba(0, 0, 0, 0.05);

  /* Animation */
  --cmv-transition-duration: 200ms;
  --cmv-transition-timing: ease-out;

  display: grid;
  gap: var(--cmv-gap);
  max-width: var(--cmv-max-width);
  border-radius: var(--cmv-radius-outer);
  overflow: hidden;
  position: relative;
}

/* Image cell base */
.chat-image-grid__cell {
  position: relative;
  overflow: hidden;
  background-color: var(--cmv-bg-placeholder);
}

/* First cell gets outer radius on top-left */
.chat-image-grid__cell:first-child {
  border-top-left-radius: var(--cmv-radius-outer);
}

/* Last cell gets outer radius on bottom-right for single image */
.chat-image-grid[data-count="1"] .chat-image-grid__cell:last-child {
  border-bottom-right-radius: var(--cmv-radius-outer);
}

/* Image within cell */
.chat-image-grid__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--cmv-transition-duration) var(--cmv-transition-timing);
}

/* Hover effect */
.chat-image-grid__cell:hover .chat-image-grid__image {
  transform: scale(1.02);
}

/* Placeholder canvas for blur/thumbhash */
.chat-image-grid__placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity var(--cmv-transition-duration) var(--cmv-transition-timing);
}

/* Hide placeholder when image loaded */
.chat-image-grid__cell[data-loaded="true"] .chat-image-grid__placeholder {
  opacity: 0;
  pointer-events: none;
}

/* Loading indicator */
.chat-image-grid__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--cmv-bg-loading);
}

/* Download progress overlay */
.chat-image-grid__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
}

.chat-image-grid__progress-bar {
  height: 100%;
  background-color: #fff;
  transition: width 100ms linear;
}
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"]
}
</file>

<file path="vite.config.ts">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      include: ['src'],
      exclude: ['src/test', '**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
})
</file>

<file path="vitest.config.ts">
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
</file>

</files>
````

## File: src/index.test.ts
````typescript
import { describe, it, expect } from 'vitest'
import { ChatImageGrid, calculateGridHeight } from './index'
import type { ImageItem } from './types'

describe('chat-media-view exports', () => {
  it('exports ChatImageGrid component', () => {
    expect(ChatImageGrid).toBeDefined()
    expect(typeof ChatImageGrid).toBe('function')
  })

  it('exports calculateGridHeight utility', () => {
    expect(calculateGridHeight).toBeDefined()
    expect(typeof calculateGridHeight).toBe('function')
  })

  it('calculateGridHeight returns a number', () => {
    const images: ImageItem[] = [
      { src: 'test.jpg', width: 100, height: 100 },
    ]
    const result = calculateGridHeight(images, 400)
    expect(typeof result).toBe('number')
  })
})
````

## File: src/index.ts
````typescript
// Components (placeholder exports - will be implemented in Phase 3)
// export { ChatImageGrid } from './ChatImageGrid'
// export { ImageCell } from './ImageCell'

// Utilities (placeholder exports - will be implemented in Phase 2)
// export { calculateGridHeight } from './calculate-grid-height'

// Types
export type {
	ChatImageGridProps,
	ImageItem,
	GridLayout,
	CellDimensions,
} from "./types";

// Placeholder component for build verification
export const ChatImageGrid = (): null => null;
export const calculateGridHeight = (
	_images: unknown[],
	_maxWidth: number,
): number => 0;
````

## File: src/test/setup.ts
````typescript
import '@testing-library/jest-dom'
````

## File: src/types.ts
````typescript
/**
 * Props for a single image in the grid
 */
export interface ImageItem {
  /** Source URL of the image */
  src: string
  /** Optional thumbnail URL for low-res preview */
  thumbnail?: string
  /** BlurHash string for placeholder */
  blurhash?: string
  /** ThumbHash string for placeholder (preferred over blurhash) */
  thumbhash?: string
  /** Original image width in pixels */
  width: number
  /** Original image height in pixels */
  height: number
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Props for the ChatImageGrid component
 */
export interface ChatImageGridProps {
  /** Array of images to display (1-5 images) */
  images: ImageItem[]
  /** Maximum width of the grid in pixels */
  maxWidth?: number
  /** Gap between images in pixels */
  gap?: number
  /** Border radius for outer corners */
  borderRadius?: number
  /** Callback when an image is clicked */
  onImageClick?: (index: number, image: ImageItem) => void
  /** Callback for download progress updates */
  onDownload?: (image: ImageItem, progress: number) => void
  /** Enable lazy loading with Intersection Observer */
  lazyLoad?: boolean
  /** Custom class name for the grid container */
  className?: string
}

/**
 * Grid layout configuration for a specific image count
 */
export interface GridLayout {
  /** Number of columns */
  columns: number
  /** Number of rows */
  rows: number
  /** Grid template columns CSS value */
  gridTemplateColumns: string
  /** Grid template rows CSS value */
  gridTemplateRows: string
  /** Grid areas for each image position */
  areas: string[][]
}

/**
 * Calculated dimensions for a cell in the grid
 */
export interface CellDimensions {
  /** Cell width in pixels */
  width: number
  /** Cell height in pixels */
  height: number
  /** Grid column start position */
  gridColumn: string
  /** Grid row start position */
  gridRow: string
}
````

## File: styles/chat-image-grid.css
````css
.chat-image-grid {
  /* Spacing */
  --cmv-gap: 2px;

  /* Border radius */
  --cmv-radius-outer: 12px;
  --cmv-radius-inner: 4px;

  /* Sizing */
  --cmv-max-width: 400px;

  /* Colors */
  --cmv-bg-placeholder: #e0e0e0;
  --cmv-bg-loading: #f0f0f0;
  --cmv-overlay-hover: rgba(0, 0, 0, 0.05);

  /* Animation */
  --cmv-transition-duration: 200ms;
  --cmv-transition-timing: ease-out;

  display: grid;
  gap: var(--cmv-gap);
  max-width: var(--cmv-max-width);
  border-radius: var(--cmv-radius-outer);
  overflow: hidden;
  position: relative;
}

/* Image cell base */
.chat-image-grid__cell {
  position: relative;
  overflow: hidden;
  background-color: var(--cmv-bg-placeholder);
}

/* First cell gets outer radius on top-left */
.chat-image-grid__cell:first-child {
  border-top-left-radius: var(--cmv-radius-outer);
}

/* Last cell gets outer radius on bottom-right for single image */
.chat-image-grid[data-count="1"] .chat-image-grid__cell:last-child {
  border-bottom-right-radius: var(--cmv-radius-outer);
}

/* Image within cell */
.chat-image-grid__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--cmv-transition-duration) var(--cmv-transition-timing);
}

/* Hover effect */
.chat-image-grid__cell:hover .chat-image-grid__image {
  transform: scale(1.02);
}

/* Placeholder canvas for blur/thumbhash */
.chat-image-grid__placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity var(--cmv-transition-duration) var(--cmv-transition-timing);
}

/* Hide placeholder when image loaded */
.chat-image-grid__cell[data-loaded="true"] .chat-image-grid__placeholder {
  opacity: 0;
  pointer-events: none;
}

/* Loading indicator */
.chat-image-grid__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--cmv-bg-loading);
}

/* Download progress overlay */
.chat-image-grid__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
}

.chat-image-grid__progress-bar {
  height: 100%;
  background-color: #fff;
  transition: width 100ms linear;
}
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      include: ['src'],
      exclude: ['src/test', '**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChatMediaView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
})
````

## File: vitest.config.ts
````typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
````
