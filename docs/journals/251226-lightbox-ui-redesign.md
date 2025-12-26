# Lightbox UI Redesign: The Glassmorphism Grind

**Date**: 2025-12-26 02:35
**Severity**: Medium
**Component**: UI / Lightbox
**Status**: Resolved

## What Happened

Completed a full structural and visual overhaul of the Lightbox component. This wasn't just a "coat of paint"—it was a destructive refactor of the DOM structure to support video, glassmorphism, and a much-needed thumbnail strip. We pushed through 6 phases from CSS tokens to final polish, including a custom `useZoom` hook and a complete move away from icon fonts to inline SVGs.

## The Brutal Truth

This was long overdue and frankly painful. The old Lightbox was a rigid, brittle mess that broke the moment we tried to add video support. We spent way too much time fighting CSS specificity and "magic numbers" in the layout. Moving to glassmorphism felt like chasing a trend, but the real nightmare was the zoom implementation—trying to get `transform-origin` to behave while maintaining a smooth UX across different aspect ratios is the kind of task that makes you want to quit frontend. It's "done," but the complexity we've added to support "polish" is a debt we'll be paying later.

## Technical Details

- **Zoom Logic**: Switched to `CSS transform` via a custom `useZoom` hook. Had to handle coordinate math manually to ensure zoom-to-mouse behavior didn't drift.
- **Icon Debt**: Ripped out Material Icons font dependency. It was causing FOUT and layout shifts. Replaced with `LightboxIcons.tsx` (inline SVGs).
- **State Management**: The thumbnail strip auto-scroll logic is fragile. It relies on `scrollIntoView` which behaves inconsistently across browsers when triggered rapidly via keyboard shortcuts.

## What We Tried

- Initially tried to keep the old DOM structure and just "theme" it. Failed miserably because the old z-index stack was a disaster.
- Attempted using a library for zoom/pinch. Too much bloat and lacked the specific "bottom control bar" integration we needed. Built `useZoom` from scratch instead.

## Root Cause Analysis

The fundamental mistake was letting the original Lightbox grow organically without a clear design system. We were hacking features (like video) onto a component designed only for images. We should have done this refactor 6 months ago instead of piling on tech debt.

## Lessons Learned

- **Inline SVGs > Icon Fonts**: Every single time. The control over sizing and the lack of network requests for font files is worth the slightly larger JS bundle.
- **Backward Compatibility is a Trap**: Trying to keep new features "opt-in" via props led to a complex component API. Sometimes it's better to just break the API and force the update.

## Next Steps

- Monitor performance on low-end mobile devices; the blurred background overlays (`backdrop-filter`) might tank the frame rate.
- Refactor the thumbnail scroll logic to use a more robust `requestAnimationFrame` approach if users report jitter.
