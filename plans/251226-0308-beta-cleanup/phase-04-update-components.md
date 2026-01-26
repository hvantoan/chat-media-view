# Phase 4: Update Components

## Overview

Remove backward compatibility code from all components that reference deprecated props or thumbhash.

## Changes

### 4.1 ChatImageGrid.tsx

**File:** `src/ChatImageGrid.tsx`

Remove:
- `ImageItem` import
- `normalizeMediaItem` function
- `images` prop destructuring
- `onImageClick` prop destructuring
- Backward compat memo logic
- Backward compat click handler

**Before:**
```tsx
import type { ChatImageGridProps, MediaItem, ImageItem } from './types'

function normalizeMediaItem(item: ImageItem | MediaItem): MediaItem {
  if ('type' in item) return item
  return { ...item, type: 'image' as const }
}

export function ChatImageGrid({
  items,
  images,
  // ...
  onMediaClick,
  onImageClick,
  // ...
}: ChatImageGridProps): ReactNode {
  const mediaItems = useMemo(() => {
    const source = items ?? images ?? []
    return source.map(normalizeMediaItem)
  }, [items, images])

  const handleClick = (index: number, item: MediaItem): void => {
    onMediaClick?.(index, item)
    onImageClick?.(index, item)
  }
```

**After:**
```tsx
import type { ChatImageGridProps, MediaItem } from './types'

export function ChatImageGrid({
  items = [],
  maxWidth = 400,
  gap = 2,
  borderRadius = 12,
  onMediaClick,
  lazyLoad = true,
  className,
  rtl = false
}: ChatImageGridProps): ReactNode {
  const layout = useMemo(
    () => calculateLayout(items, { maxWidth, gap, borderRadius, rtl }),
    [items, maxWidth, gap, borderRadius, rtl]
  )

  if (items.length === 0) return null

  return (
    <div
      className={`chat-image-grid ${className ?? ''}`}
      style={{
        width: layout.totalWidth,
        height: layout.totalHeight,
        position: 'relative'
      }}
      dir={rtl ? 'rtl' : undefined}
      role="group"
      aria-label={`Media gallery with ${items.length} item${items.length > 1 ? 's' : ''}`}
    >
      {layout.cells.map((cell) => {
        const item = items[cell.index]
        if (!item) return null

        return (
          <MediaCell
            key={cell.index}
            item={item}
            layout={cell}
            lazyLoad={lazyLoad}
            onClick={() => { onMediaClick?.(cell.index, item); }}
          />
        )
      })}
    </div>
  )
}
```

### 4.2 Lightbox.tsx

**File:** `src/Lightbox.tsx`

Remove:
- `ImageItem` import
- `normalizeMediaItem` function
- `images` prop from interface and destructuring
- Backward compat memo logic

**Before (interface):**
```tsx
export interface LightboxProps {
  items?: MediaItem[]
  /** @deprecated Use `items` instead */
  images?: ImageItem[]
  // ...
}
```

**After (interface):**
```tsx
export interface LightboxProps {
  /** Array of media items to display */
  items?: MediaItem[]
  /** Initial media index */
  initialIndex?: number
  // ...
}
```

**Before (implementation):**
```tsx
export function Lightbox({
  items,
  images,
  // ...
}: LightboxProps): ReactNode {
  const mediaItems = useMemo(() => {
    const source = items ?? images ?? []
    return source.map(normalizeMediaItem)
  }, [items, images])
```

**After (implementation):**
```tsx
export function Lightbox({
  items = [],
  initialIndex = 0,
  // ...
}: LightboxProps): ReactNode {
  // Use items directly, no normalization needed
```

Replace all `mediaItems` with `items` throughout the component.

### 4.3 ImageCell.tsx

**File:** `src/ImageCell.tsx`

Remove thumbhash references:

**Before:**
```tsx
import type { ImageItem, CellLayout } from './types'

interface ImageCellProps {
  image: ImageItem
  // ...
}

const hasPlaceholder = image.blurhash ?? image.thumbhash

<PlaceholderCanvas
  hash={(image.thumbhash ?? image.blurhash)!}
  hashType={image.thumbhash ? 'thumbhash' : 'blurhash'}
  // ...
/>
```

**After:**
```tsx
import type { ImageMediaItem, CellLayout } from './types'

interface ImageCellProps {
  image: ImageMediaItem
  // ...
}

const hasPlaceholder = !!image.blurhash

{hasPlaceholder && !loaded && !error && (
  <PlaceholderCanvas
    hash={image.blurhash!}
    width={layout.width}
    height={layout.height}
    className="chat-image-cell__placeholder"
  />
)}
```

### 4.4 VideoCell.tsx

**File:** `src/VideoCell.tsx`

Same pattern as ImageCell:

**Before:**
```tsx
const hasPlaceholder = video.blurhash ?? video.thumbhash

<PlaceholderCanvas
  hash={(video.thumbhash ?? video.blurhash)!}
  hashType={video.thumbhash ? 'thumbhash' : 'blurhash'}
  // ...
/>
```

**After:**
```tsx
const hasPlaceholder = !!video.blurhash

{hasPlaceholder && !thumbnailLoaded && state !== 'error' && (
  <PlaceholderCanvas
    hash={video.blurhash!}
    width={layout.width}
    height={layout.height}
    className="chat-video-cell__placeholder"
  />
)}
```

### 4.5 useDownload.ts

**File:** `src/hooks/useDownload.ts`

Remove `isDownloading` from interface and return value:

**Before:**
```tsx
export interface UseDownloadResult {
  // ...
  /** @deprecated Use status === 'downloading' instead */
  isDownloading: boolean
}

return {
  // ...
  isDownloading: status === 'downloading'
}
```

**After:**
```tsx
export interface UseDownloadResult {
  download: (url: string, options?: Omit<DownloadOptions, 'signal' | 'onProgress'>) => Promise<string>
  cancel: () => void
  retry: () => Promise<string | null>
  progress: DownloadProgress | null
  status: DownloadStatus
  error: Error | null
  reset: () => void
}

return {
  download,
  cancel,
  retry,
  progress,
  status,
  error,
  reset
}
```

## Verification

```bash
npm run typecheck
```
