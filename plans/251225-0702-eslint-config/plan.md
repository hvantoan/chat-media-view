# ESLint 9 Configuration Plan

## Overview

Configure ESLint 9 with flat config for React TypeScript **library** with emphasis on:
- Public API hygiene (explicit exports, type-only imports)
- Type safety (strict null checks, explicit return types)
- Code quality (no implicit any, consistent patterns)
- Library consumers experience (clean re-exports, documented types)

**Stack:** React 18/19, TypeScript 5.9, Vite 7, Vitest, Storybook 10
**Config Style:** Flat config (eslint.config.js)
**Strictness:** Strict (library-grade)

## Dependencies

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

| Package | Purpose |
|---------|---------|
| `eslint` | Core linter (v9+) |
| `@eslint/js` | ESLint recommended rules |
| `typescript-eslint` | TS parser + rules (unified v8 package) |
| `eslint-plugin-react-hooks` | React hooks rules |
| `eslint-plugin-react-refresh` | HMR compatibility (dev only) |
| `globals` | Browser/node globals definitions |

## Implementation

### Phase 1: Create `eslint.config.js`

```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'storybook-static/**',
      '*.config.js',
      '*.config.ts',
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript strict + stylistic (type-aware)
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Main config for library source files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // === React Rules ===
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // === Library Type Safety ===
      // Explicit return types on exported functions (API contract)
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      // Explicit module boundary types (public API clarity)
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // === Import/Export Hygiene ===
      // Enforce type-only imports for types (tree-shaking, clarity)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      // Enforce type-only exports
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: false },
      ],

      // === Strict Null Safety ===
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: false,
          allowNullableNumber: false,
        },
      ],

      // === Code Quality ===
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',

      // === Naming Conventions (library consistency) ===
      '@typescript-eslint/naming-convention': [
        'error',
        // Types/Interfaces: PascalCase
        { selector: 'typeLike', format: ['PascalCase'] },
        // Constants: UPPER_CASE or camelCase
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        // React components: PascalCase
        {
          selector: 'function',
          modifiers: ['exported'],
          format: ['camelCase', 'PascalCase'],
        },
      ],

      // === Prevent Common Bugs ===
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
    },
  },

  // Test files - relaxed rules
  {
    files: ['src/**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },

  // Story files - relaxed for Storybook patterns
  {
    files: ['src/**/*.stories.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  }
);
```

### Phase 2: Update `package.json` scripts

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "lint:strict": "eslint src/ --max-warnings 0"
  }
}
```

### Phase 3: Verify & Fix

1. Run `npm run lint` to check for violations
2. Run `npm run lint:fix` to auto-fix where possible
3. Manually fix remaining issues (especially explicit return types)

## Library-Specific Rules Rationale

| Rule | Why for Libraries |
|------|-------------------|
| `explicit-function-return-type` | Exported functions = public API contract; explicit types prevent accidental breaking changes |
| `explicit-module-boundary-types` | Every export is a commitment; types must be explicit for consumers |
| `consistent-type-imports/exports` | Enables proper tree-shaking, clearer bundle analysis, better DX |
| `strict-boolean-expressions` | Prevents truthy/falsy bugs that confuse library consumers |
| `no-unsafe-*` rules | Libraries must be type-safe; consumers trust your types |
| `naming-convention` | Consistent public API naming (PascalCase components, camelCase hooks) |
| `no-floating-promises` | Async bugs in libraries are hard to debug for consumers |

## File Changes

| File | Action |
|------|--------|
| `eslint.config.js` | Create |
| `package.json` | Update scripts |

## Expected Initial Violations

Based on codebase analysis, expect fixes needed for:
1. **Missing explicit return types** on exported functions
2. **Type-only imports** not using `import type`
3. **Strict boolean expressions** (may need `!== undefined` checks)

## Validation Checklist

- [ ] `npm run lint` runs without config errors
- [ ] All exported functions have explicit return types
- [ ] All type imports use `import type { ... }`
- [ ] Test/story files have appropriately relaxed rules
- [ ] `npm run lint:strict` passes with 0 warnings (goal)
- [ ] Build still succeeds after fixes

## Notes

- Uses `typescript-eslint` v8 unified package
- `projectService: true` enables type-aware linting with better performance
- `import.meta.dirname` requires Node 20.11+ (ESM)
- May need to add more naming convention exceptions as patterns emerge
