# Phase 6: Delete ThumbHash Files

## Overview

Remove the ThumbHash implementation files that are no longer needed.

## Tasks

### 6.1 Delete source file

```bash
rm src/thumbhash.ts
```

### 6.2 Delete test file

```bash
rm src/thumbhash.test.ts
```

## Files Removed

| File | Lines | Purpose |
|------|-------|---------|
| `src/thumbhash.ts` | 212 | ThumbHash decoder implementation |
| `src/thumbhash.test.ts` | ~80 | Tests for ThumbHash decoder |

## Verification

```bash
# Ensure no remaining references
grep -r "thumbhash" src/
# Should return empty or only show blurhash-related comments

npm run typecheck
npm run build
```
