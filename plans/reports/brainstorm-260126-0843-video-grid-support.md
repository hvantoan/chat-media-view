# Brainstorm Report: Complete Video Grid Support

**Date:** 2026-01-26
**Status:** Complete - Ready for Planning

---

## Problem Statement

Video support exists but incomplete in `chat-media-view` grid. Missing: autoplay controls, loop functionality, poster images, optimized loading, keyboard navigation, ARIA labels, and lightbox download. Inconsistent behavior vs images.

---

## Requirements Summary

| Requirement | Decision |
|------------|----------|
| Grid autoplay | **No** - click-to-play only |
| Grid loop | **Yes** - loop by default |
| Grid poster | **Reuse `thumbnail` prop** (explicit URL required) |
| Grid preload | `preload="metadata"` |
| Lightbox autoplay | **Yes** - autoplay muted when active |
| Lightbox loop | **Yes** - loop by default |
| Lazy loading | **Yes** - use IntersectionObserver |
| Keyboard nav | **Yes** - Enter/Space support |
| ARIA labels | **Yes** - screen reader support |
| Lightbox download | **Yes** - enable video download |

---

## Approaches Evaluated

### 1. Enhanced Props (KISS) ✅ SELECTED

**Changes:**
- Add `loop`, `autoplay` props to `VideoMediaItem` type
- Add `preload="metadata"` to grid video elements
- Fix poster display using existing `thumbnail` prop
- Ensure keyboard nav works (already implemented)
- Verify ARIA labels (already implemented)
- Enable video download in lightbox

**Pros:**
- Minimal code change (~100 lines)
- No breaking changes
- Maintains existing architecture
- Fast to implement
- Easy to test

**Cons:**
- VideoCell/ImageCell remain divergent
- Some inconsistency remains

**Effort:** 2-3 hours

### 2. Full ImageCell Parity

Make video grid behavior match images exactly: same hover, transitions, lazy loading.

**Pros:**
- Consistent UX across media types

**Cons:**
- Significant refactoring
- Over-engineering for stated requirements
- Risk of breaking existing image functionality

**Effort:** 6-8 hours

### 3. Shared Abstraction

Extract `useMediaCell` hook for both cells.

**Pros:**
- DRY principle honored
- Long-term maintainability

**Cons:**
- Over-engineering for current scope
- Abstracting too early
- Unnecessary complexity

**Effort:** 4-6 hours

---

## Recommended Solution: Enhanced Props

### Implementation Scope

1. **Type Updates** (`src/types.ts`)
   ```typescript
   export interface VideoMediaItem extends BaseMediaItem {
     type: 'video'
     duration?: number
     muted?: boolean
     loop?: boolean      // NEW
     autoplay?: boolean  // NEW
   }
   ```

2. **VideoCell Updates** (`src/VideoCell.tsx`)
   - Add `loop={video.loop ?? true}` to video element
   - Remove autoplay (click-to-play only per requirements)
   - Add `preload="metadata"` attribute
   - Verify poster uses `thumbnail` prop correctly (already does)

3. **LightboxVideo Updates** (`src/LightboxVideo.tsx`)
   - Add `loop={video.loop ?? true}` to video element
   - Verify autoplay muted (already implemented)

4. **Lightbox Updates** (`src/Lightbox.tsx`)
   - Enable download button for video type (currently image-only logic)

5. **Tests**
   - Update `VideoCell.test.tsx` for new props
   - Update `LightboxVideo.test.tsx` for loop behavior
   - Verify download works for video in lightbox

### Files to Modify

| File | Changes |
|------|---------|
| `src/types.ts` | Add `loop`, `autoplay` to VideoMediaItem |
| `src/VideoCell.tsx` | Add loop, preload attributes |
| `src/LightboxVideo.tsx` | Add loop attribute |
| `src/Lightbox.tsx` | Enable video download |
| `src/VideoCell.test.tsx` | Test new props |
| `src/LightboxVideo.test.tsx` | Test loop behavior |

### Already Implemented (No Changes Needed)

- ✅ Lazy loading via `useIntersectionObserver`
- ✅ Keyboard navigation (Enter/Space in VideoCell)
- ✅ ARIA labels (`aria-label`, `role="button"`)
- ✅ Muted autoplay in lightbox
- ✅ Auto-pause on scroll out (`useVideoVisibility`)
- ✅ Duration badge display
- ✅ Error handling with retry
- ✅ Poster/thumbnail display

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Browser autoplay policies | Grid is click-to-play, lightbox is muted autoplay |
| Bandwidth overuse | `preload="metadata"` only loads size/duration |
| Missing thumbnails | Already handles gracefully with blurhash fallback |
| Download compatibility | Standard HTML5 download attribute, widely supported |

**Low risk overall.** All features use standard HTML5 video APIs with broad browser support.

---

## Success Criteria

- [ ] Videos display with correct aspect ratios in grid
- [ ] Click-to-play works in grid (no autoplay)
- [ ] Videos loop by default in both grid and lightbox
- [ ] Poster thumbnails display using `thumbnail` prop
- [ ] `preload="metadata"` reduces bandwidth usage
- [ ] Lazy loading works for off-screen videos
- [ ] Keyboard navigation (Enter/Space) functional
- [ ] ARIA labels present for screen readers
- [ ] Videos downloadable from lightbox
- [ ] All tests pass (>90% coverage maintained)

---

## Unresolved Questions

**None.** Requirements clarified through user questions.

---

## Next Steps

User confirmed they want to proceed with detailed implementation plan.

**Run:** `/plan` with this brainstorm summary as context to create detailed phase-by-phase implementation plan.

---

## Implementation Considerations

1. **YAGNI:** Only add requested features. Skip auto-thumbnail generation, custom poster props, complex preload strategies.

2. **KISS:** Minimal prop additions, leverage existing code. No new abstractions.

3. **DRY:** Loop/autoplay values already have sensible defaults (`loop ?? true`). No duplicate logic needed.

4. **Backward Compatibility:** New props optional with defaults. Existing usage unaffected.

5. **Type Safety:** TypeScript strict mode enforced. Explicit types for new props.

---

*Report generated via brainstorm skill*
