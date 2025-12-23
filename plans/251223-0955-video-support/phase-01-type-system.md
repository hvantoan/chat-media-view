# Phase 1: Type System Updates

## Context

- [Plan Overview](./plan.md)
- [Research: Video Player](./research/researcher-01-video-player.md)

## Overview

Introduce unified `MediaItem` type using discriminated union pattern. Maintain full backwards compatibility with existing `ImageItem` usage.

## Key Insights

1. Discriminated unions enable type-safe property access
2. Type alias preserves backwards compat without runtime changes
3. Grid layout engine already uses width/height - videos share this
4. Duration optional for videos (streaming may not know upfront)

## Requirements

- US-01: Video must have thumbnail, dimensions, optional blurhash/thumbhash
- Backwards compat: existing `ImageItem[]` code must compile and work

## Architecture

```typescript
// Base properties shared by all media types
interface BaseMediaItem {
  src: string
  thumbnail?: string
  blurhash?: string
  thumbhash?: string
  width: number
  height: number
  alt?: string
}

// Discriminated union
interface ImageMediaItem extends BaseMediaItem {
  type: 'image'
}

interface VideoMediaItem extends BaseMediaItem {
  type: 'video'
  duration?: number  // seconds, optional for streaming
  muted?: boolean    // default true for autoplay compat
}

type MediaItem = ImageMediaItem | VideoMediaItem

// Backwards compat - ImageItem still works
type ImageItem = ImageMediaItem | Omit<BaseMediaItem, never>
```

## Related Files

| File | Changes |
|------|---------|
| `src/types.ts` | Add MediaItem union, VideoMediaItem interface |
| `src/ChatImageGrid.tsx` | Accept `MediaItem[]`, infer type if missing |
| `src/index.ts` | Export new types |

## Implementation Steps

### Step 1: Update types.ts

```typescript
// Add to types.ts - new interfaces

/** Base properties for all media types */
export interface BaseMediaItem {
  src: string
  thumbnail?: string
  blurhash?: string
  thumbhash?: string
  width: number
  height: number
  alt?: string
}

/** Image media item */
export interface ImageMediaItem extends BaseMediaItem {
  type: 'image'
}

/** Video media item */
export interface VideoMediaItem extends BaseMediaItem {
  type: 'video'
  /** Video duration in seconds (optional for streaming) */
  duration?: number
  /** Whether video starts muted (default: true for autoplay) */
  muted?: boolean
}

/** Unified media item type */
export type MediaItem = ImageMediaItem | VideoMediaItem

// Keep ImageItem as alias for backwards compat
// Existing code passes objects without 'type' field
// We infer type: 'image' when missing
```

### Step 2: Update ChatImageGridProps

```typescript
export interface ChatImageGridProps {
  /** Array of media items (1-5) - supports images and videos */
  items: MediaItem[]
  /** @deprecated Use `items` instead */
  images?: ImageItem[]
  // ... rest unchanged
}
```

### Step 3: Add type inference helper

```typescript
// In ChatImageGrid.tsx or utils
function normalizeMediaItem(item: ImageItem | MediaItem): MediaItem {
  if ('type' in item) return item
  return { ...item, type: 'image' as const }
}
```

### Step 4: Update ChatImageGrid component

```typescript
export function ChatImageGrid({
  items,
  images, // deprecated
  ...props
}: ChatImageGridProps) {
  // Support both props for backwards compat
  const mediaItems = useMemo(() => {
    const source = items ?? images ?? []
    return source.map(normalizeMediaItem)
  }, [items, images])

  // Rest of component uses mediaItems
}
```

### Step 5: Export new types from index.ts

```typescript
export type {
  MediaItem,
  ImageMediaItem,
  VideoMediaItem,
  BaseMediaItem,
  // Keep existing exports
  ImageItem,
  // ...
}
```

## Todo List

- [ ] Add BaseMediaItem, ImageMediaItem, VideoMediaItem interfaces
- [ ] Add MediaItem union type
- [ ] Update ChatImageGridProps with `items` prop
- [ ] Add normalizeMediaItem helper
- [ ] Update ChatImageGrid to use MediaItem internally
- [ ] Export new types from index.ts
- [ ] Add JSDoc deprecation to `images` prop
- [ ] Update existing tests to pass

## Success Criteria

- [ ] `ImageItem[]` still works without changes (backwards compat)
- [ ] `MediaItem[]` with videos accepted
- [ ] TypeScript discriminates correctly on `type` field
- [ ] No runtime changes for image-only usage
- [ ] All existing tests pass

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking changes to ImageItem | Keep ImageItem as type alias, infer missing `type` |
| GridLayoutEngine expects ImageItem | Engine only uses width/height - no changes needed |
| Third-party code depends on ImageItem | Export both ImageItem and MediaItem |

## Security Considerations

- No security impact - type-only changes

## Next Steps

After completion:
1. Proceed to [Phase 2: VideoCell Component](./phase-02-video-cell.md)
2. VideoCell will use `VideoMediaItem` type
