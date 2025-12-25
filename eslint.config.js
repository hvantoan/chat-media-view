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
      // Excluded from tsconfig - not part of library output
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'src/**/*.stories.tsx',
      'src/test/**',
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
      // Ignore set-state-in-effect for intentional patterns
      'react-hooks/set-state-in-effect': 'off',

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

      // === Relaxed for library backward compatibility ===
      // Allow deprecated types usage (library backward compat)
      '@typescript-eslint/no-deprecated': 'off',
      // Allow numbers in template literals (common pattern)
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      // Allow non-null assertions (library knows its data)
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Relax strict booleans for React patterns
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableNumber: true,
        },
      ],
      // Allow void in arrow functions (common React pattern)
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],

      // === Code Quality ===
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
      // Allow inferrable types for cleaner code
      '@typescript-eslint/no-inferrable-types': 'off',
      // Relax unnecessary condition for defensive coding
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // Relax unnecessary type assertions
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',

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
  }
);
