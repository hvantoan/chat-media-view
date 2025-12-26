# Beta Library Cleanup Plan

**Date:** 2025-12-26
**Branch:** `feat/beta-cleanup`
**Source:** `plans/reports/brainstorm-251226-0308-beta-cleanup.md`

## Objective

Remove deprecated APIs and migrate from ThumbHash to BlurHash to create a clean v1.0-ready API surface.

## Breaking Changes Summary

| Before | After |
|--------|-------|
| `images` prop | `items` prop |
| `onImageClick` | `onMediaClick` |
| `ImageItem` type | `MediaItem` type |
| `thumbhash` field | `blurhash` field |
| `isDownloading` | `status === 'downloading'` |
| ThumbHash utilities exported | Removed |

## Implementation Phases

### Phase 1: Add BlurHash Dependency
- Add `blurhash` package to dependencies
- Update `package.json` keywords

### Phase 2: Rewrite PlaceholderCanvas
- Replace ThumbHash decoder with BlurHash decoder
- Simplify component API (remove `hashType` prop)

### Phase 3: Update Types
- Remove `ImageItem` deprecated type
- Remove `thumbhash` field from `BaseMediaItem`
- Remove `images` and `onImageClick` from `ChatImageGridProps`
- Remove `images` from `LightboxProps`
- Remove `isDownloading` from `UseDownloadResult`

### Phase 4: Update Components
- `ChatImageGrid.tsx` - Remove backward compat logic
- `Lightbox.tsx` - Remove backward compat logic
- `ImageCell.tsx` - BlurHash only
- `VideoCell.tsx` - BlurHash only
- `useDownload.ts` - Remove `isDownloading`

### Phase 5: Update Public Exports
- Remove ThumbHash utilities from `index.ts`
- Remove `ImageItem` type export

### Phase 6: Delete ThumbHash Files
- Delete `src/thumbhash.ts`
- Delete `src/thumbhash.test.ts`

### Phase 7: Update Tests & Stories
- Update all tests using thumbhash samples
- Update stories with BlurHash examples
- Run full test suite

### Phase 8: Documentation
- Update README migration section
- Bump version in package.json

## Success Criteria

1. `npm run typecheck` passes
2. `npm run test` passes
3. `npm run build` succeeds
4. `npm run lint` passes
5. No deprecated exports in `index.ts`
6. No ThumbHash references in codebase

## Estimated Impact

- ~280 lines deleted (thumbhash files)
- ~50-80 lines removed from other files
- 1 new dependency added (`blurhash`)
- Cleaner, simpler public API

---

## Validation Summary

**Validated:** 2025-12-26
**Questions asked:** 6

### Confirmed Decisions
- **Version:** v0.2.0 (minor bump for breaking changes in 0.x)
- **blurhash package:** Listed in `dependencies` (not peerDependencies)
- **ImageCell prop type:** Use `ImageMediaItem` (stricter, matches pattern)
- **Execution:** Single PR for all 8 phases
- **Branch:** `feat/beta-cleanup`
- **Changelog:** README migration section only (no CHANGELOG.md)

### Action Items
- [x] Plan validated, no revisions needed
- [x] Phase 1: Add BlurHash Dependency - completed
- [x] Phase 2: Rewrite PlaceholderCanvas - completed
- [x] Phase 3: Update Types - completed
- [x] Phase 4: Update Components - completed
- [x] Phase 5: Update Public Exports - completed
- [x] Phase 6: Delete ThumbHash Files - completed
- [x] Phase 7: Update Tests & Stories - completed
- [x] Phase 8: Documentation & Version Bump - completed

### Code Review Status
- **Reviewed:** 2025-12-26
- **Reviewer:** code-reviewer
- **Result:** PASS with minor warnings

All implementation phases complete. See `plans/reports/code-reviewer-251226-0424-beta-cleanup.md` for details.
