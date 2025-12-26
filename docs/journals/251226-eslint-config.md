# ESLint 9 Migration: The Flat Config Inferno

**Date**: 2025-12-26 02:40
**Severity**: Medium
**Component**: DX / Build Tooling
**Status**: Resolved

## What Happened

Migrated the entire project from legacy ESLint to version 9 flat configuration (`eslint.config.js`). This wasn't just a version bump; it was a total overhaul of the linting strategy, introducing `typescript-eslint` v8 with `strictTypeChecked` and `stylisticTypeChecked` rules. Fixed 148 inherited lint violations in one go.

## The Brutal Truth

148 lint violations. That is the sound of a codebase screaming for help. We've been flying blind, pretending our types were sound while ignoring the "stylistic" decay. Migrating to Flat Config is a mandatory tax we paid to stop the bleeding. It’s frustrating that so much time was spent fighting configuration boilerplate just to get basic "don't break things" checks working, but the previous state was professionally embarrassing.

## Technical Details

- **Core**: ESLint 9, `typescript-eslint` v8.
- **Performance**: Enabled `projectService: true` to avoid the dreaded "infinite type-checking" lag while maintaining type-aware linting.
- **Strictness**: Enforced explicit return types for public APIs and type-only imports. No more tree-shaking ambiguity.
- **Violations**: 148 fixed, ranging from unsafe assignments to missing hook dependencies.

## What We Tried

Attempting a "soft" migration with the compatibility wrapper was a waste of time—it just delayed the inevitable plugin configuration errors. We eventually nuked the old config and rebuilt from `tseslint.config()` to ensure a clean slate.

## Root Cause Analysis

The project relied on default, permissive linting that allowed "quick and dirty" TypeScript. This created a false sense of security where `any` and missing return types were allowed to proliferate, complicating future refactors and bloating the final bundle with unused exports.

## Lessons Learned

Don't wait for 100+ violations to accumulate before tightening the screws. "Standard" configurations are usually too weak for library-grade code. Start strict, or suffer the manual fixing marathon later.

## Next Steps

- Monitor CI performance; type-aware linting is heavy.
- Ensure all new features adhere to the PascalCase component and explicit return type rules.
- No further action required for this migration.
