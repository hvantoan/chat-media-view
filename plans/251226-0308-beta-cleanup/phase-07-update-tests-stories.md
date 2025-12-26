# Phase 7: Update Tests & Stories

## Overview

Update all tests and stories that reference ThumbHash to use BlurHash instead.

## Sample BlurHash Values

Use these sample BlurHash strings for tests:
- Simple: `LEHV6nWB2yk8pyo0adR*.7kCMdnj` (blue sky gradient)
- Colorful: `LGF5]+Yk^6#M@-5c,1J5@[or[Q6.` (colorful)
- Simple gray: `L6PZfSi_.AyE_3t7t7R**0o#DgR4` (grayish)

## Changes

### 7.1 PlaceholderCanvas.test.tsx

**File:** `src/PlaceholderCanvas.test.tsx`

Replace all thumbhash references:

**Before:**
```tsx
const sampleThumbHash = 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'

<PlaceholderCanvas
  hash={sampleThumbHash}
  hashType="thumbhash"
  width={100}
  height={100}
/>
```

**After:**
```tsx
const sampleBlurHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'

<PlaceholderCanvas
  hash={sampleBlurHash}
  width={100}
  height={100}
/>
```

Remove tests:
- `it('falls back to gray for blurhash (not implemented)')` - no longer needed

Update tests:
- All `hashType` prop references
- Test descriptions mentioning thumbhash

### 7.2 ImageCell.test.tsx

**File:** `src/ImageCell.test.tsx`

**Before:**
```tsx
const imageWithPlaceholder = {
  // ...
  thumbhash: 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'
}

it('renders placeholder when thumbhash provided', () => {
```

**After:**
```tsx
const imageWithPlaceholder: ImageMediaItem = {
  type: 'image',
  src: 'https://example.com/image.jpg',
  width: 800,
  height: 600,
  blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'
}

it('renders placeholder when blurhash provided', () => {
```

### 7.3 ChatImageGrid.stories.tsx

**File:** `src/ChatImageGrid.stories.tsx`

**Changes:**

1. Update description:
```diff
-- BlurHash/ThumbHash placeholder support
+- BlurHash placeholder support
```

2. Remove thumbhash sample:
```diff
-// Sample thumbhash for demo (a pinkish color)
-const thumbhashSample = 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'
+// Sample BlurHash for demo
+const blurhashSample = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'
```

3. Rename story:
```diff
-export const WithThumbHashPlaceholder: Story = {
-  name: 'With ThumbHash Placeholder',
+export const WithBlurHashPlaceholder: Story = {
+  name: 'With BlurHash Placeholder',
```

4. Update all `thumbhash` references to `blurhash`:
```diff
-{ ...sampleImages[0], thumbhash: thumbhashSample },
+{ ...sampleImages[0], blurhash: blurhashSample },
```

5. Update argTypes descriptions:
```diff
-description: 'Array of images to display (1-5 images) - deprecated, use items',
+description: 'Array of media items to display (1-5 items)',
```

6. Remove deprecated prop argTypes:
- Remove `images` argType entry
- Remove `onImageClick` argType entry

### 7.4 Lightbox.stories.tsx

Check for any thumbhash references and update similarly.

## Verification

```bash
npm run test
npm run storybook
# Visually verify stories work correctly
```
