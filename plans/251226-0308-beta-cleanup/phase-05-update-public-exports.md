# Phase 5: Update Public Exports

## Overview

Clean up `index.ts` to remove deprecated exports and ThumbHash utilities.

## Changes

### 5.1 Remove ThumbHash utilities section

**File:** `src/index.ts`

**Remove:**
```tsx
// ThumbHash utilities
export {
  thumbHashToRGBA,
  thumbHashToDataURL,
  base64ToBytes
} from './thumbhash'
```

### 5.2 Remove ImageItem from type exports

**Before:**
```tsx
export type {
  ChatImageGridProps,
  ImageItem,
  MediaItem,
  // ...
} from './types'
```

**After:**
```tsx
export type {
  ChatImageGridProps,
  MediaItem,
  ImageMediaItem,
  VideoMediaItem,
  BaseMediaItem,
  GridLayout,
  CellDimensions,
  BorderRadius,
  CellLayout,
  GridLayoutResult,
  LayoutConfig,
} from './types'
```

### 5.3 Final index.ts

```tsx
// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'
export { VideoCell } from './VideoCell'
export { MediaCell } from './MediaCell'
export { PlayIcon } from './PlayIcon'
export { PlaceholderCanvas } from './PlaceholderCanvas'
export { Lightbox, type LightboxProps } from './Lightbox'
export { LightboxVideo } from './LightboxVideo'
export { LightboxZoomControls } from './LightboxZoomControls'
export { LightboxThumbnails, type LightboxThumbnailsProps } from './LightboxThumbnails'
export {
  CloseIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon
} from './LightboxIcons'

// Hooks
export { useIntersectionObserver } from './hooks/useIntersectionObserver'
export { useVideoVisibility } from './hooks/useVideoVisibility'
export { useDownload, type DownloadStatus, type UseDownloadResult } from './hooks/useDownload'
export { useZoom, type UseZoomOptions, type UseZoomResult } from './hooks/useZoom'

// Layout Engine
export { calculateLayout } from './GridLayoutEngine'
export { calculateGridHeight } from './calculate-grid-height'

// Download Manager
export {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  type DownloadProgress,
  type ProgressCallback,
  type DownloadOptions,
  type DownloadResult
} from './DownloadManager'

// Accessibility utilities
export { getAriaLabel, handleKeyboardNav } from './accessibility'

// Types
export type {
  ChatImageGridProps,
  MediaItem,
  ImageMediaItem,
  VideoMediaItem,
  BaseMediaItem,
  GridLayout,
  CellDimensions,
  BorderRadius,
  CellLayout,
  GridLayoutResult,
  LayoutConfig,
} from './types'
```

## Verification

```bash
npm run typecheck
npm run build
```
