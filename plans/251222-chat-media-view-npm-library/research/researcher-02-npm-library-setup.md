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
