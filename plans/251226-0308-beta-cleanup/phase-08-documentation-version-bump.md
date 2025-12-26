# Phase 8: Documentation & Version Bump

## Overview

Update documentation and bump version to mark the breaking change.

## Changes

### 8.1 Update README.md

Add migration section at the top (before Features):

```markdown
## Migration from v0.1.x

### Breaking Changes in v0.2.0

**Props renamed:**
- `images` → `items`
- `onImageClick` → `onMediaClick`

**Types removed:**
- `ImageItem` - use `MediaItem` instead

**Placeholder format:**
- `thumbhash` field removed - use `blurhash` instead
- ThumbHash utilities no longer exported

**Hook changes:**
- `useDownload().isDownloading` removed - use `status === 'downloading'`

### Before/After

```tsx
// Before (v0.1.x)
<ChatImageGrid
  images={data}
  onImageClick={(i, img) => console.log(i)}
/>

// After (v0.2.0)
<ChatImageGrid
  items={data}
  onMediaClick={(i, item) => console.log(i)}
/>
```
```

### 8.2 Update package.json version

**File:** `package.json`

```diff
-  "version": "0.1.0",
+  "version": "0.2.0",
```

### 8.3 Update eslint.config.js (if needed)

Check if there are any deprecated type allowances:

```bash
grep -n "deprecated" eslint.config.js
```

If found, remove rules that specifically allow deprecated types.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build

# Final check - no thumbhash or deprecated references
grep -r "thumbhash\|@deprecated\|ImageItem" src/
# Should return empty
```

## Commit Message

```
feat!: remove deprecated APIs and migrate to BlurHash

BREAKING CHANGE:
- Remove `images` prop, use `items` instead
- Remove `onImageClick` prop, use `onMediaClick` instead
- Remove `ImageItem` type, use `MediaItem` instead
- Remove `thumbhash` field, use `blurhash` instead
- Remove ThumbHash utility exports
- Remove `isDownloading` from useDownload, use `status === 'downloading'`

- Add blurhash package as runtime dependency
- Simplify PlaceholderCanvas to BlurHash-only
- Clean up backward compatibility code
- Update tests and stories
```
