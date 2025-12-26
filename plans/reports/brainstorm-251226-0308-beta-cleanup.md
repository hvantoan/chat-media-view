# Beta Library Cleanup - Brainstorm Report

**Date:** 2025-12-26
**Context:** Beta library cleanup - remove deprecated/obsolete components

## Problem Statement

The `chat-media-view` library has accumulated backward-compatibility shims from a migration (image-only → unified media). As a beta library, this is the ideal time to remove these before v1.0 establishes API contracts.

## User Decisions

- **Backward compatibility:** Remove all deprecated (breaking change OK)
- **Placeholder format:** BlurHash only (remove ThumbHash)
- **Problematic components:** Analyze and recommend

---

## Items to Remove

### 1. Deprecated Types & Props

| Location | Remove | Rationale |
|----------|--------|-----------|
| `types.ts:46-48` | `ImageItem` type | Replaced by `MediaItem` |
| `types.ts:56-57` | `images?: ImageItem[]` prop | Replaced by `items` |
| `types.ts:66-67` | `onImageClick` prop | Replaced by `onMediaClick` |
| `Lightbox.tsx:29` | `images` prop | Same as above |
| `useDownload.ts:29` | `isDownloading` boolean | Use `status === 'downloading'` |
| `index.ts:55` | `ImageItem` export | Remove from public API |

### 2. ThumbHash → BlurHash Migration

**Discovery:** BlurHash is NOT implemented - shows gray fallback. ThumbHash is working.
**Decision:** Add blurhash package, implement decoder, remove ThumbHash.

| File | Action |
|------|--------|
| `src/thumbhash.ts` (212 lines) | **DELETE** entire file |
| `src/thumbhash.test.ts` | **DELETE** entire test file |
| `src/PlaceholderCanvas.tsx` | Replace with blurhash decoder import |
| `src/types.ts:11-12` | Remove `thumbhash?: string` from `BaseMediaItem` |
| `src/ImageCell.tsx:31,66-67` | Remove thumbhash checks, use blurhash only |
| `src/VideoCell.tsx:53,130-131` | Remove thumbhash checks, use blurhash only |
| `src/index.ts:42-47` | Remove ThumbHash utility exports |
| `package.json` | Add `blurhash` dep (~2KB gzip), remove "thumbhash" keyword |
| Stories/tests | Update to use BlurHash samples only |

**New Dependency:** `blurhash` package
- NPM: https://www.npmjs.com/package/blurhash
- Size: ~2KB gzipped
- API: `decode(blurhash, width, height)` → Uint8ClampedArray

### 3. Component Analysis - No Issues Found

After analysis, all current components serve clear purposes:

| Component | LOC | Verdict |
|-----------|-----|---------|
| `ChatImageGrid` | ~100 | Core - keep |
| `Lightbox` | 300 | Core - keep |
| `GridLayoutEngine` | 340 | Core layout logic - keep |
| `ImageCell` / `VideoCell` | ~100/204 | Essential - keep |
| `MediaCell` | ~30 | Clean dispatcher - keep |
| `LightboxVideo/Thumbnails/ZoomControls` | ~50-80 each | Modular lightbox parts - keep |
| `DownloadManager` | 207 | Feature-complete - keep |
| `PlaceholderCanvas` | 112 | Will simplify after ThumbHash removal |
| `accessibility.ts` | ~20 | Minimal, useful - keep |
| `calculate-grid-height.ts` | ~20 | Utility - keep |

---

## Cleanup Summary

### Files to DELETE (2 files, ~280 lines)
1. `src/thumbhash.ts`
2. `src/thumbhash.test.ts`

### Files to MODIFY (11 files)
1. `src/types.ts` - Remove deprecated types/props + thumbhash field
2. `src/index.ts` - Remove deprecated exports + thumbhash utilities
3. `src/ChatImageGrid.tsx` - Remove images/onImageClick handling
4. `src/Lightbox.tsx` - Remove images prop
5. `src/ImageCell.tsx` - Remove thumbhash logic
6. `src/VideoCell.tsx` - Remove thumbhash logic
7. `src/PlaceholderCanvas.tsx` - Implement blurhash decoder
8. `src/hooks/useDownload.ts` - Remove isDownloading
9. `src/ChatImageGrid.stories.tsx` - Update examples
10. `src/PlaceholderCanvas.test.tsx` - Update tests
11. `package.json` - Add blurhash dep, remove thumbhash keyword

### New Dependency
- `blurhash` - add to dependencies (not devDeps - runtime needed)

### Estimated Reduction
- ~280 lines deleted (thumbhash files)
- ~50-80 lines removed from other files
- **Total: ~350+ lines removed**
- Simpler API surface
- Single placeholder format = less confusion

---

## Implementation Considerations

### Breaking Changes for Consumers
1. Must rename `images` → `items`
2. Must rename `onImageClick` → `onMediaClick`
3. Must change `thumbhash` → `blurhash` in data
4. Must check `status === 'downloading'` instead of `isDownloading`

### Migration Guide Needed
Create brief MIGRATION.md or add to README:
```
// Before (deprecated)
<ChatImageGrid images={data} onImageClick={fn} />

// After
<ChatImageGrid items={data} onMediaClick={fn} />
```

### Tests to Update
- `PlaceholderCanvas.test.tsx` - all thumbhash tests
- `ImageCell.test.tsx:24,129` - thumbhash tests
- Any stories using thumbhash samples

---

## Risks

| Risk | Mitigation |
|------|------------|
| New dependency (blurhash) | Small (~2KB), well-maintained, widely used |
| Breaking existing consumers | v0.x → v1.0 is expected to break, document changes |
| ThumbHash → BlurHash data migration | Users must regenerate hashes server-side |

---

## Unresolved Questions

1. **BlurHash sample for stories:** Need valid BlurHash string to replace ThumbHash samples in tests/stories.

---

## Next Steps

1. Add `blurhash` package dependency
2. Implement BlurHash decoder in PlaceholderCanvas
3. Remove all deprecated APIs and ThumbHash code
4. Update tests and stories with BlurHash samples
5. Update README with breaking changes notice
6. Bump version to v0.2.0 or v1.0.0-beta
