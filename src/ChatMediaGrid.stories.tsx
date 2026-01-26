import type { Meta, StoryObj } from '@storybook/react'
import { ChatMediaGrid } from './ChatMediaGrid'
import type { VideoMediaItem, MediaItem, ImageMediaItem } from './types'

const meta = {
  component: ChatMediaGrid,
  title: 'Components/ChatMediaGrid',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Telegram-style media grid for React chat applications.

## Features
- Layouts for 1-5 images/videos (exact Telegram clone)
- **Built-in Lightbox** with zoom, download, thumbnails (toggleable via \`enableLightbox\`)
- **Video support** with inline playback, duration badge, and auto-pause
- Virtual list compatible via \`calculateGridHeight()\`
- BlurHash placeholder support
- Keyboard accessible (Tab, Enter, Arrow keys)
- RTL layout support
- < 8KB gzipped
        `
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of media items to display (1-5 items, supports images and videos)',
      control: { type: 'object' }
    },
    maxWidth: {
      description: 'Maximum width of the grid in pixels',
      control: { type: 'range', min: 200, max: 600, step: 50 },
      table: { defaultValue: { summary: '400' } }
    },
    gap: {
      description: 'Gap between images in pixels',
      control: { type: 'range', min: 0, max: 10, step: 1 },
      table: { defaultValue: { summary: '2' } }
    },
    borderRadius: {
      description: 'Border radius for outer corners',
      control: { type: 'range', min: 0, max: 24, step: 2 },
      table: { defaultValue: { summary: '12' } }
    },
    lazyLoad: {
      description: 'Enable lazy loading with Intersection Observer',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } }
    },
    rtl: {
      description: 'Enable RTL (right-to-left) layout',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } }
    },
    enableLightbox: {
      description: 'Enable built-in lightbox for full-screen media viewing',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } }
    },
    lightboxShowDownload: {
      description: 'Show download button in lightbox',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } }
    },
    lightboxShowThumbnails: {
      description: 'Show thumbnail strip in lightbox',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } }
    },
    lightboxShowZoomControls: {
      description: 'Show zoom controls for images in lightbox',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } }
    },
    onMediaClick: {
      description: 'Callback when a media item is clicked',
      action: 'mediaClicked'
    },
    className: {
      description: 'Custom class name for the grid container',
      control: 'text'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ChatMediaGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages: ImageMediaItem[] = [
  { type: 'image', src: 'https://picsum.photos/800/600?random=1', width: 800, height: 600 },
  { type: 'image', src: 'https://picsum.photos/600/800?random=2', width: 600, height: 800 },
  { type: 'image', src: 'https://picsum.photos/700/700?random=3', width: 700, height: 700 },
  { type: 'image', src: 'https://picsum.photos/900/500?random=4', width: 900, height: 500 },
  { type: 'image', src: 'https://picsum.photos/500/900?random=5', width: 500, height: 900 }
]

// Sample video items using public test videos
const sampleVideos: VideoMediaItem[] = [
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    width: 1280,
    height: 720,
    duration: 15,
    alt: 'For Bigger Blazes'
  },
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    width: 1280,
    height: 720,
    duration: 15,
    alt: 'For Bigger Escapes'
  },
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    width: 1280,
    height: 720,
    duration: 60,
    alt: 'For Bigger Fun'
  },
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    width: 1280,
    height: 720,
    duration: 15,
    alt: 'For Bigger Joyrides'
  }
]

// Mixed media items (images + videos)
const mixedMedia: MediaItem[] = [
  sampleImages[0],
  sampleVideos[0],
  sampleImages[1],
  sampleVideos[1]
]

export const OneImage: Story = {
  args: { items: sampleImages.slice(0, 1) }
}

export const TwoImages: Story = {
  args: { items: sampleImages.slice(0, 2) }
}

export const ThreeImages: Story = {
  args: { items: sampleImages.slice(0, 3) }
}

export const FourImages: Story = {
  args: { items: sampleImages.slice(0, 4) }
}

export const FiveImages: Story = {
  args: { items: sampleImages.slice(0, 5) }
}

export const WithClickHandler: Story = {
  args: {
    items: sampleImages.slice(0, 3),
    onMediaClick: (index, item) => {
      console.log('Clicked media', index, item.src)
      alert(`Clicked media ${index + 1}`)
    }
  }
}

export const CustomDimensions: Story = {
  args: {
    items: sampleImages.slice(0, 3),
    maxWidth: 300,
    gap: 4,
    borderRadius: 16
  }
}

export const NoLazyLoad: Story = {
  args: {
    items: sampleImages.slice(0, 3),
    lazyLoad: false
  }
}

// Sample blurhash for demo
const blurhashSample = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'

const imagesWithPlaceholder: ImageMediaItem[] = sampleImages.slice(0, 3).map((img, i) => ({
  ...img,
  blurhash: blurhashSample,
  alt: `Image ${i + 1} with placeholder`
}))

export const WithBlurHashPlaceholder: Story = {
  name: 'With BlurHash Placeholder',
  args: {
    items: imagesWithPlaceholder
  }
}

// Simulating error state with invalid URLs
const errorImages: ImageMediaItem[] = [
  { type: 'image', src: 'https://invalid-url-for-testing.local/image1.jpg', width: 800, height: 600 },
  { type: 'image', src: 'https://invalid-url-for-testing.local/image2.jpg', width: 600, height: 800 }
]

export const ErrorStateWithRetry: Story = {
  name: 'Error State (Retry Button)',
  args: {
    items: errorImages
  }
}

export const MixedWithAndWithoutPlaceholder: Story = {
  name: 'Mixed (Some With Placeholder)',
  args: {
    items: [
      { ...sampleImages[0], blurhash: blurhashSample },
      sampleImages[1],
      { ...sampleImages[2], blurhash: blurhashSample }
    ]
  }
}

// RTL Layout Demo
export const RTLLayout: Story = {
  name: 'RTL Layout (Right-to-Left)',
  args: {
    items: sampleImages.slice(0, 3),
    rtl: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates RTL support for languages like Arabic, Hebrew. Layout is mirrored horizontally.'
      }
    }
  }
}

// Accessibility Demo - Focus Visible
export const AccessibilityDemo: Story = {
  name: 'Accessibility (Tab to Navigate)',
  args: {
    items: sampleImages.slice(0, 4).map((img, i) => ({
      ...img,
      alt: `Scenic landscape photo ${i + 1}`
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab through images to see focus rings. Press Enter or Space to trigger click. Images have descriptive alt text for screen readers.'
      }
    }
  }
}

// =====================
// Video Stories
// =====================

export const SingleVideo: Story = {
  name: 'Single Video',
  args: {
    items: [sampleVideos[0]]
  },
  parameters: {
    docs: {
      description: {
        story: 'Single video with thumbnail, play icon overlay, and duration badge. Click to play inline.'
      }
    }
  }
}

export const TwoVideos: Story = {
  name: 'Two Videos',
  args: {
    items: sampleVideos.slice(0, 2)
  }
}

export const ThreeVideos: Story = {
  name: 'Three Videos',
  args: {
    items: sampleVideos.slice(0, 3)
  }
}

export const FourVideos: Story = {
  name: 'Four Videos',
  args: {
    items: sampleVideos.slice(0, 4)
  }
}

export const MixedMediaGrid: Story = {
  name: 'Mixed Media (Images + Videos)',
  args: {
    items: mixedMedia
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with both images and videos. Videos show play icon overlay and duration badge. Images load normally.'
      }
    }
  }
}

export const VideoWithPlaceholder: Story = {
  name: 'Video with BlurHash Placeholder',
  args: {
    items: [{
      ...sampleVideos[0],
      blurhash: blurhashSample
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Video with BlurHash placeholder while thumbnail loads.'
      }
    }
  }
}

export const VideoClickHandler: Story = {
  name: 'Video Click Handler',
  args: {
    items: sampleVideos.slice(0, 2),
    onMediaClick: (index, item) => {
      const type = item.type
      const duration = type === 'video' ? ` (${item.duration}s)` : ''
      alert(`Clicked ${type} at index ${index}${duration}`)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Click video to see the onMediaClick callback with item type and duration.'
      }
    }
  }
}

export const MixedMediaClickHandler: Story = {
  name: 'Mixed Media Click Handler',
  args: {
    items: mixedMedia,
    onMediaClick: (index, item) => {
      console.log('Clicked:', item)
      alert(`Clicked ${item.type} at index ${index}`)
    }
  }
}

export const LongDurationVideo: Story = {
  name: 'Video with Long Duration',
  args: {
    items: [{
      ...sampleVideos[0],
      duration: 3661 // 1:01:01
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Duration badge formats as H:MM:SS for videos over 1 hour.'
      }
    }
  }
}

export const VideoNoDuration: Story = {
  name: 'Video without Duration',
  args: {
    items: [{
      type: 'video' as const,
      src: sampleVideos[0].src,
      thumbnail: sampleVideos[0].thumbnail,
      width: 1280,
      height: 720
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Videos without duration info hide the duration badge.'
      }
    }
  }
}

export const VideoWithPoster: Story = {
  name: 'Video with Custom Poster',
  args: {
    items: [{
      ...sampleVideos[0],
      poster: 'https://picsum.photos/1280/720?random=10'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Video with custom poster image displayed before video loads. Useful for branding or preview frames.'
      }
    }
  }
}

export const VideoWithLoop: Story = {
  name: 'Looping Video',
  args: {
    items: [{
      ...sampleVideos[0],
      loop: true
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Video that loops continuously. Ideal for GIF-like behavior or background animations.'
      }
    }
  }
}

export const VideoWithLoopAndPoster: Story = {
  name: 'Looping Video with Poster',
  args: {
    items: [{
      ...sampleVideos[0],
      poster: 'https://picsum.photos/1280/720?random=11',
      loop: true
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Looping video with custom poster image. Poster shows before first playback, then loops continuously.'
      }
    }
  }
}

export const MultipleLoopingVideos: Story = {
  name: 'Multiple Looping Videos',
  args: {
    items: sampleVideos.slice(0, 2).map(v => ({
      ...v,
      loop: true
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with multiple looping videos. Each video loops independently.'
      }
    }
  }
}

// =====================
// Lightbox Stories
// =====================

export const WithLightbox: Story = {
  name: 'With Lightbox (Default)',
  args: {
    items: sampleImages.slice(0, 3),
    enableLightbox: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Click any image to open the built-in lightbox. Navigate with arrows, zoom with +/- keys.'
      }
    }
  }
}

export const LightboxDisabled: Story = {
  name: 'Lightbox Disabled',
  args: {
    items: sampleImages.slice(0, 3),
    enableLightbox: false,
    onMediaClick: (index, item) => {
      alert(`Custom handler: clicked ${item.type} at index ${index}`)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox disabled. Use onMediaClick to implement custom behavior.'
      }
    }
  }
}

export const LightboxMinimal: Story = {
  name: 'Lightbox Minimal UI',
  args: {
    items: sampleImages.slice(0, 4),
    enableLightbox: true,
    lightboxShowDownload: false,
    lightboxShowThumbnails: false,
    lightboxShowZoomControls: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox with minimal UI - no download button, thumbnails, or zoom controls.'
      }
    }
  }
}

export const LightboxWithVideos: Story = {
  name: 'Lightbox with Videos',
  args: {
    items: mixedMedia,
    enableLightbox: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox supports both images and videos. Videos play inline with native controls.'
      }
    }
  }
}
