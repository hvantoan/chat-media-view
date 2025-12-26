# Phase 3: Update Types

## Overview

Remove all deprecated types and props from `types.ts`.

## Changes

### 3.1 Remove thumbhash from BaseMediaItem

**File:** `src/types.ts`

```diff
 export interface BaseMediaItem {
   src: string
   thumbnail?: string
   blurhash?: string
-  /** ThumbHash string for placeholder (preferred over blurhash) */
-  thumbhash?: string
   width: number
   height: number
   alt?: string
 }
```

### 3.2 Remove deprecated ImageItem type

```diff
-/**
- * Legacy ImageItem type for backwards compatibility
- * @deprecated Use MediaItem instead
- */
-export type ImageItem = BaseMediaItem
```

### 3.3 Remove deprecated props from ChatImageGridProps

```diff
 export interface ChatImageGridProps {
   items?: MediaItem[]
-  /** @deprecated Use `items` instead. Array of images to display (1-5 images) */
-  images?: ImageItem[]
   maxWidth?: number
   gap?: number
   borderRadius?: number
   onMediaClick?: (index: number, item: MediaItem) => void
-  /** @deprecated Use `onMediaClick` instead */
-  onImageClick?: (index: number, image: ImageItem) => void
   onDownload?: (item: MediaItem, progress: number) => void
   lazyLoad?: boolean
   className?: string
   rtl?: boolean
 }
```

### 3.4 Final types.ts (relevant sections)

```typescript
/**
 * Base properties shared by all media types
 */
export interface BaseMediaItem {
  /** Source URL of the media */
  src: string
  /** Optional thumbnail URL for low-res preview */
  thumbnail?: string
  /** BlurHash string for placeholder */
  blurhash?: string
  /** Original media width in pixels */
  width: number
  /** Original media height in pixels */
  height: number
  /** Alt text for accessibility */
  alt?: string
}

// ... ImageMediaItem, VideoMediaItem, MediaItem unchanged ...

/**
 * Props for the ChatImageGrid component
 */
export interface ChatImageGridProps {
  /** Array of media items to display (1-5 items) */
  items?: MediaItem[]
  /** Maximum width of the grid in pixels */
  maxWidth?: number
  /** Gap between images in pixels */
  gap?: number
  /** Border radius for outer corners */
  borderRadius?: number
  /** Callback when a media item is clicked */
  onMediaClick?: (index: number, item: MediaItem) => void
  /** Callback for download progress updates */
  onDownload?: (item: MediaItem, progress: number) => void
  /** Enable lazy loading with Intersection Observer */
  lazyLoad?: boolean
  /** Custom class name for the grid container */
  className?: string
  /** Enable RTL layout */
  rtl?: boolean
}
```

## Verification

```bash
npm run typecheck
# Will fail until components are updated in Phase 4
```
