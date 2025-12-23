# Phase 1: Project Setup

**Status:** Completed
**Completion Date:** 2025-12-22
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

- [x] Run `npm init -y` and update package.json
- [x] Install dev dependencies
- [x] Create vite.config.ts with library mode
- [x] Create tsconfig.json with strict mode
- [x] Create vitest.config.ts with jsdom
- [x] Create src/test/setup.ts
- [x] Initialize Storybook
- [x] Create styles/chat-image-grid.css foundation
- [x] Create src/index.ts barrel export
- [x] Create src/types.ts with interfaces
- [x] Verify build produces ESM + CJS
- [x] Verify TypeScript compiles without errors

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
