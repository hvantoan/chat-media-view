# Phase 6: Testing & Documentation

## Context

- [Plan Overview](./plan.md)
- All previous phases complete

## Overview

Final phase: comprehensive testing for all new functionality and documentation updates. Ensure backwards compatibility and bundle size targets met.

## Key Insights

1. Existing tests must pass (backwards compat)
2. New components need unit tests
3. Integration tests for full user flows
4. Storybook stories for visual testing
5. README updates for new API
6. Bundle size check (< 5KB gzipped increase)

## Requirements

- All user stories testable via automated tests
- Documentation covers new video features
- No regressions in existing functionality

## Test Coverage Matrix

| Component | Unit Tests | Integration | Storybook |
|-----------|------------|-------------|-----------|
| types.ts | Type tests | - | - |
| VideoCell | mount, states | with grid | Story |
| useVideoVisibility | observer behavior | scroll test | - |
| DownloadManager | abort, retry | - | - |
| useDownload | cancel, retry, progress | - | - |
| Lightbox | video playback | navigation | Story |
| MediaCell | type switching | with grid | Story |

## Related Files

| File | Action |
|------|--------|
| `src/types.test.ts` | Create - type narrowing tests |
| `src/VideoCell.test.tsx` | Create - component tests |
| `src/hooks/useVideoVisibility.test.ts` | Create - hook tests |
| `src/DownloadManager.test.ts` | Update - abort/retry tests |
| `src/hooks/useDownload.test.ts` | Update - cancel/retry tests |
| `src/Lightbox.test.tsx` | Update - video tests |
| `src/MediaCell.test.tsx` | Create - switch tests |
| `src/ChatImageGrid.stories.tsx` | Update - video stories |
| `README.md` | Update - video API docs |

## Implementation Steps

### Step 1: Type narrowing tests

```typescript
// src/types.test.ts
import { describe, it, expect } from 'vitest'
import type { MediaItem, ImageMediaItem, VideoMediaItem } from './types'

describe('MediaItem types', () => {
  it('discriminates image type', () => {
    const item: MediaItem = {
      type: 'image',
      src: 'test.jpg',
      width: 100,
      height: 100
    }

    if (item.type === 'image') {
      // TypeScript should allow ImageMediaItem properties
      const _img: ImageMediaItem = item
      expect(_img.type).toBe('image')
    }
  })

  it('discriminates video type', () => {
    const item: MediaItem = {
      type: 'video',
      src: 'test.mp4',
      width: 100,
      height: 100,
      duration: 30
    }

    if (item.type === 'video') {
      // TypeScript should allow VideoMediaItem properties
      const _vid: VideoMediaItem = item
      expect(_vid.duration).toBe(30)
    }
  })

  it('infers image for legacy items without type', () => {
    // Legacy ImageItem without type field
    const legacy = {
      src: 'test.jpg',
      width: 100,
      height: 100
    }

    // Should work when passed to normalizeMediaItem
    expect(legacy.src).toBe('test.jpg')
  })
})
```

### Step 2: VideoCell tests

```typescript
// src/VideoCell.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { VideoCell } from './VideoCell'
import type { VideoMediaItem, CellLayout } from './types'

const mockVideo: VideoMediaItem = {
  type: 'video',
  src: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumb.jpg',
  width: 640,
  height: 360,
  duration: 120,
  alt: 'Test video'
}

const mockLayout: CellLayout = {
  index: 0,
  x: 0,
  y: 0,
  width: 200,
  height: 150,
  borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 }
}

describe('VideoCell', () => {
  it('renders thumbnail state by default', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)

    expect(screen.getByRole('button', { name: 'Test video' })).toBeInTheDocument()
    expect(screen.getByLabelText('Play video')).toBeInTheDocument()
  })

  it('shows duration badge', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)

    expect(screen.getByText('2:00')).toBeInTheDocument()
  })

  it('starts playback on play click', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)

    const playButton = screen.getByLabelText('Play video')
    fireEvent.click(playButton)

    // Should transition to loading/playing state
    // Video element should be present
    expect(document.querySelector('video')).toBeInTheDocument()
  })

  it('calls onClick when container clicked', () => {
    const onClick = vi.fn()
    render(
      <VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} onClick={onClick} />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Test video' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('handles keyboard navigation', () => {
    const onClick = vi.fn()
    render(
      <VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} onClick={onClick} />
    )

    const cell = screen.getByRole('button', { name: 'Test video' })
    fireEvent.keyDown(cell, { key: 'Enter' })
    // Should trigger play or onClick
  })
})
```

### Step 3: DownloadManager abort/retry tests

```typescript
// Add to src/DownloadManager.test.ts

describe('downloadWithProgress with abort', () => {
  it('throws AbortError when cancelled', async () => {
    const controller = new AbortController()

    const downloadPromise = downloadWithProgress('https://example.com/large.jpg', {
      signal: controller.signal
    })

    // Cancel immediately
    controller.abort()

    await expect(downloadPromise).rejects.toThrow()
    await expect(downloadPromise).rejects.toMatchObject({
      name: 'AbortError'
    })
  })

  it('retries on 5xx errors', async () => {
    let attempts = 0
    global.fetch = vi.fn(() => {
      attempts++
      if (attempts < 3) {
        return Promise.resolve(new Response(null, { status: 500 }))
      }
      return Promise.resolve(new Response('OK', { status: 200 }))
    })

    const result = await downloadWithProgress('https://example.com/test.jpg', {
      maxRetries: 3,
      baseDelay: 10 // Fast for testing
    })

    expect(attempts).toBe(3)
    expect(result.retried).toBe(true)
  })

  it('does not retry on 404', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(null, { status: 404 }))
    )

    await expect(
      downloadWithProgress('https://example.com/notfound.jpg')
    ).rejects.toThrow('HTTP 404')

    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
```

### Step 4: useDownload cancel/retry tests

```typescript
// Add to src/hooks/useDownload.test.ts

describe('useDownload with cancel/retry', () => {
  it('cancels download and updates status', async () => {
    const { result } = renderHook(() => useDownload())

    // Start download
    act(() => {
      result.current.download('https://example.com/slow.jpg')
    })

    expect(result.current.status).toBe('downloading')

    // Cancel
    act(() => {
      result.current.cancel()
    })

    expect(result.current.status).toBe('cancelled')
  })

  it('retries last download', async () => {
    // Setup mock to fail first, succeed second
    let callCount = 0
    global.fetch = vi.fn(() => {
      callCount++
      if (callCount === 1) {
        return Promise.reject(new Error('Network error'))
      }
      return Promise.resolve(new Response('OK'))
    })

    const { result } = renderHook(() => useDownload())

    // First download fails
    await expect(
      act(() => result.current.download('https://example.com/test.jpg'))
    ).rejects.toThrow()

    expect(result.current.status).toBe('error')

    // Retry succeeds
    await act(() => result.current.retry())

    expect(result.current.status).toBe('completed')
    expect(callCount).toBe(2)
  })
})
```

### Step 5: Lightbox video tests

```typescript
// Add to src/Lightbox.test.tsx or create new

describe('Lightbox with video', () => {
  const videoItem: MediaItem = {
    type: 'video',
    src: 'https://example.com/video.mp4',
    width: 640,
    height: 360
  }

  it('renders video element for video items', () => {
    render(
      <Lightbox
        items={[videoItem]}
        isOpen={true}
        onClose={() => {}}
      />
    )

    expect(document.querySelector('video')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Video lightbox')
  })

  it('shows download button', () => {
    render(
      <Lightbox
        items={[videoItem]}
        isOpen={true}
        onClose={() => {}}
        showDownload={true}
      />
    )

    expect(screen.getByLabelText(/download/i)).toBeInTheDocument()
  })

  it('pauses video on navigation', () => {
    const items: MediaItem[] = [
      videoItem,
      { type: 'image', src: 'test.jpg', width: 100, height: 100 }
    ]

    const { rerender } = render(
      <Lightbox items={items} isOpen={true} onClose={() => {}} initialIndex={0} />
    )

    const video = document.querySelector('video')
    const pauseSpy = vi.spyOn(video!, 'pause')

    // Navigate to next
    fireEvent.click(screen.getByLabelText('Next'))

    expect(pauseSpy).toHaveBeenCalled()
  })
})
```

### Step 6: Storybook stories

```typescript
// Add to src/ChatImageGrid.stories.tsx

export const WithVideos: Story = {
  args: {
    items: [
      {
        type: 'video',
        src: 'https://example.com/video1.mp4',
        thumbnail: 'https://example.com/thumb1.jpg',
        width: 1920,
        height: 1080,
        duration: 125
      },
      {
        type: 'image',
        src: 'https://example.com/image1.jpg',
        width: 800,
        height: 600
      }
    ],
    maxWidth: 400
  }
}

export const VideoOnly: Story = {
  args: {
    items: [
      {
        type: 'video',
        src: 'https://example.com/video.mp4',
        thumbnail: 'https://example.com/thumb.jpg',
        width: 1280,
        height: 720,
        duration: 60,
        alt: 'Sample video'
      }
    ]
  }
}

export const MixedMediaGrid: Story = {
  args: {
    items: [
      { type: 'video', src: 'v1.mp4', thumbnail: 't1.jpg', width: 640, height: 360, duration: 30 },
      { type: 'image', src: 'i1.jpg', width: 800, height: 600 },
      { type: 'video', src: 'v2.mp4', thumbnail: 't2.jpg', width: 1920, height: 1080, duration: 180 },
      { type: 'image', src: 'i2.jpg', width: 600, height: 800 },
      { type: 'image', src: 'i3.jpg', width: 500, height: 500 }
    ]
  }
}
```

### Step 7: README updates

```markdown
## Video Support

ChatImageGrid now supports video alongside images using the `MediaItem` type:

\`\`\`tsx
import { ChatImageGrid, MediaItem } from 'chat-media-view'

const items: MediaItem[] = [
  {
    type: 'video',
    src: 'https://example.com/video.mp4',
    thumbnail: 'https://example.com/thumbnail.jpg',
    width: 1920,
    height: 1080,
    duration: 125, // optional, in seconds
    alt: 'Sample video'
  },
  {
    type: 'image',
    src: 'https://example.com/photo.jpg',
    width: 800,
    height: 600
  }
]

<ChatImageGrid items={items} />
\`\`\`

### Video Features

- **Thumbnail with play icon**: Videos display thumbnail with centered play button
- **Inline playback**: Click to play video within the grid cell
- **Native controls**: Play/pause, seek, volume, fullscreen
- **Auto-pause on scroll**: Videos pause when scrolled out of view
- **Duration badge**: Optional duration display (MM:SS format)

### Download with Cancel/Retry

\`\`\`tsx
import { useDownload } from 'chat-media-view'

function DownloadButton({ url }) {
  const { download, cancel, retry, progress, status, error } = useDownload()

  return (
    <div>
      {status === 'idle' && <button onClick={() => download(url)}>Download</button>}
      {status === 'downloading' && (
        <>
          <progress value={progress?.percentage} max={100} />
          <button onClick={cancel}>Cancel</button>
        </>
      )}
      {status === 'error' && <button onClick={retry}>Retry</button>}
      {status === 'completed' && <span>Done!</span>}
    </div>
  )
}
\`\`\`

### Backwards Compatibility

Existing code using `ImageItem[]` and `images` prop continues to work:

\`\`\`tsx
// Still works
<ChatImageGrid images={imageItems} />

// New way
<ChatImageGrid items={mediaItems} />
\`\`\`
```

### Step 8: Bundle size check

```bash
# Run in CI or locally
npm run build
npx bundlesize --config bundlesize.config.json

# Or manual check
ls -la dist/*.js | awk '{sum+=$5} END {print "Total: " sum/1024 "KB"}'
gzip -c dist/index.js | wc -c
```

## Todo List

- [ ] Create types.test.ts
- [ ] Create VideoCell.test.tsx
- [ ] Create useVideoVisibility.test.ts
- [ ] Update DownloadManager.test.ts
- [ ] Update useDownload.test.ts
- [ ] Update Lightbox.test.tsx
- [ ] Create MediaCell.test.tsx
- [ ] Add video stories to Storybook
- [ ] Update README.md with video docs
- [ ] Update README.md with download docs
- [ ] Run all tests (npm test)
- [ ] Check bundle size increase
- [ ] Update CHANGELOG.md

## Success Criteria

- [ ] All existing tests pass (no regressions)
- [ ] New tests achieve >80% coverage for new code
- [ ] Storybook stories render correctly
- [ ] README documents all new features
- [ ] Bundle size increase < 5KB gzipped
- [ ] npm run build succeeds
- [ ] npm run lint passes

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Test mocking video element | Use vi.spyOn for video methods |
| IntersectionObserver in tests | Mock with vitest |
| Storybook asset loading | Use placeholder URLs |
| Bundle size exceeded | Review imports, tree-shaking |

## Security Considerations

- No security changes in this phase
- Documentation should note CORS requirements

## Completion Checklist

After this phase:
1. All tests passing
2. Storybook updated
3. README complete
4. Bundle size verified
5. Ready for release
