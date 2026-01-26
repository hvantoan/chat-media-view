# Code Review: Phase 3 Core Components

## Summary

| Metric | Value |
|--------|-------|
| Files reviewed | 6 |
| Lines analyzed | ~350 |
| Tests passing | 69/69 |
| Build status | Success |
| TypeScript errors | 1 (test file only) |

## Overall Assessment

**Solid implementation.** Clean component architecture, good separation of concerns, proper React patterns. Minor issues found - mostly test infra and accessibility edge cases.

---

## Critical Issues

**None found.**

- No XSS vulnerabilities - no `dangerouslySetInnerHTML` usage
- No injection risks - image URLs used directly in `src` attribute (browser-safe)
- No unsafe patterns detected

---

## High Priority

### 1. TypeScript Error in Test Setup

**File:** `src/test/setup.ts:29`

```typescript
global.IntersectionObserver = MockIntersectionObserver // TS2304: Cannot find name 'global'
```

**Impact:** Lint fails, though tests still run via Vitest

**Fix:** Add type declaration or use `globalThis`:
```typescript
;(globalThis as any).IntersectionObserver = MockIntersectionObserver
```

### 2. Missing `aria-label` on Interactive Cell

**File:** `src/ImageCell.tsx:37-52`

```tsx
<div
  role="button"
  tabIndex={0}
  // Missing aria-label for screen readers
>
```

**Impact:** Screen readers announce "button" without context

**Fix:** Add `aria-label`:
```tsx
aria-label={`View ${image.alt || 'image'} ${layout.index + 1}`}
```

---

## Medium Priority

### 3. Ref Dependency in useEffect

**File:** `src/hooks/useIntersectionObserver.ts:41`

```typescript
useEffect(() => { ... }, [ref, rootMargin, threshold, skip])
```

**Issue:** `ref` object identity is stable but value changes - could cause stale closure

**Suggestion:** Track `ref.current` via separate state or use callback ref pattern

### 4. Missing Error Boundary Consideration

**File:** `src/ChatImageGrid.tsx`

**Issue:** Component errors would crash parent. Consider wrapper `ErrorBoundary` or prop for custom error UI.

### 5. Unused CSS Variables

**File:** `src/styles/chat-image-grid.css:3-7`

```css
--cmv-gap: 2px;
--cmv-radius-outer: 12px;
--cmv-radius-inner: 4px;
--cmv-max-width: 400px;
```

**Issue:** Defined but not used - inline styles override. YAGNI violation.

**Fix:** Either use CSS vars or remove dead code

### 6. onKeyDown Handler Missing Space Key

**File:** `src/ImageCell.tsx:52`

```tsx
onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
```

**Issue:** Per WCAG, buttons should respond to both Enter and Space

**Fix:**
```tsx
onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
```

---

## Low Priority (Suggestions)

### 7. Magic Numbers

**File:** `src/GridLayoutEngine.ts`

```typescript
cfg.maxWidth * 1.2  // line 76
cfg.maxWidth * 0.6  // line 104
cfg.maxWidth * 0.8  // line 148
cfg.maxWidth * 0.3  // line 231
```

Consider named constants for maintainability.

### 8. Callback Memoization Optional

**File:** `src/ImageCell.tsx:38`

```tsx
onClick={() => onImageClick?.(cell.index, images[cell.index])}
```

Creating new function on each render. Minor - only matters for large lists with frequent re-renders. Consider `useCallback` if perf issue observed.

### 9. Consider `loading="lazy"` Redundancy

**File:** `src/ImageCell.tsx:61`

Using both Intersection Observer AND native `loading="lazy"`. Potentially redundant but harmless.

---

## Positive Observations

1. **Clean hook design** - `useIntersectionObserver` properly disconnects on visibility, prevents memory leaks
2. **Proper memoization** - `useMemo` on layout calc prevents recalc on every render
3. **Good TypeScript** - Types well-defined, proper generics usage
4. **DRY principle** - Layout logic centralized in GridLayoutEngine
5. **Graceful degradation** - Error state handled, empty array returns null
6. **Focus visible styling** - `:focus-visible` properly implemented
7. **Test coverage** - 69 tests, all passing

---

## Recommended Actions

| Priority | Action |
|----------|--------|
| High | Fix `global` type error in test setup |
| High | Add `aria-label` to ImageCell |
| Medium | Add Space key handler for accessibility |
| Medium | Remove or use CSS variables |
| Low | Consider callback memoization if perf issues arise |

---

## Metrics

| Metric | Status |
|--------|--------|
| Build | Pass |
| Tests | 69 passed |
| Type Coverage | Good (1 test file issue) |
| Bundle Size | 7.62 kB (ESM), 4.67 kB (CJS) |
| CSS Size | 0.77 kB |
