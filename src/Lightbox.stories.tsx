import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { ChatImageGrid } from './ChatImageGrid'
import type { MediaItem, VideoMediaItem } from './types'

const meta = {
  component: Lightbox,
  title: 'Components/Lightbox',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Optional lightbox component for full-screen media viewing.

## Features
- **Video playback** with controls (auto-play when opened)
- **Download button** with progress indicator
- Keyboard navigation (Arrow keys, Escape)
- Prev/Next buttons with counter
- Click outside to close
- Body scroll lock when open
- Fully accessible with ARIA attributes
- Tree-shakeable (only included if imported)
        `
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of media items to display (images or videos)',
      control: { type: 'object' }
    },
    images: {
      description: 'Array of images to display (deprecated, use items)',
      control: { type: 'object' }
    },
    initialIndex: {
      description: 'Initial image index to show',
      control: { type: 'number', min: 0 },
      table: { defaultValue: { summary: '0' } }
    },
    isOpen: {
      description: 'Whether the lightbox is open',
      control: 'boolean'
    },
    onClose: {
      description: 'Callback when lightbox closes',
      action: 'closed'
    },
    onIndexChange: {
      description: 'Callback when current index changes',
      action: 'indexChanged'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Lightbox>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages: MediaItem[] = [
  { type: 'image', src: 'https://picsum.photos/1200/800?random=10', width: 1200, height: 800, alt: 'Landscape photo 1' },
  { type: 'image', src: 'https://picsum.photos/800/1200?random=11', width: 800, height: 1200, alt: 'Portrait photo 2' },
  { type: 'image', src: 'https://picsum.photos/1000/1000?random=12', width: 1000, height: 1000, alt: 'Square photo 3' },
  { type: 'image', src: 'https://picsum.photos/1400/600?random=13', width: 1400, height: 600, alt: 'Wide photo 4' }
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
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    width: 1280,
    height: 720,
    duration: 596,
    alt: 'Big Buck Bunny'
  }
]

// Mixed media items
const mixedMedia: MediaItem[] = [
  sampleImages[0],
  sampleVideos[0],
  sampleImages[1],
  sampleVideos[1]
]

// Static lightbox (controlled via args)
export const Open: Story = {
  args: {
    items: sampleImages,
    isOpen: true,
    initialIndex: 0
  }
}

export const StartAtSecondImage: Story = {
  name: 'Start at Second Image',
  args: {
    items: sampleImages,
    isOpen: true,
    initialIndex: 1
  }
}

export const SingleImage: Story = {
  name: 'Single Image (No Navigation)',
  args: {
    items: [sampleImages[0]],
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'When only one image is provided, navigation buttons are hidden.'
      }
    }
  }
}

// Interactive demo with ChatImageGrid
function LightboxWithGridDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Click any image to open lightbox. Use arrow keys to navigate, Escape to close.
      </p>
      <ChatImageGrid
        items={sampleImages}
        maxWidth={400}
        onMediaClick={(index) => {
          setSelectedIndex(index)
          setIsOpen(true)
        }}
      />
      <Lightbox
        items={sampleImages}
        initialIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export const WithChatImageGrid: Story = {
  name: 'Interactive with ChatImageGrid',
  render: () => <LightboxWithGridDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete integration example showing ChatImageGrid opening a Lightbox on image click.'
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
    items: [sampleVideos[0]],
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Single video in lightbox with native controls. Video auto-plays when lightbox opens.'
      }
    }
  }
}

export const MultipleVideos: Story = {
  name: 'Multiple Videos',
  args: {
    items: sampleVideos,
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigate between videos. Current video pauses when navigating away.'
      }
    }
  }
}

export const MixedMediaLightbox: Story = {
  name: 'Mixed Media (Images + Videos)',
  args: {
    items: mixedMedia,
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightbox with both images and videos. Videos show native controls, images display normally.'
      }
    }
  }
}

export const VideoStartAtSecond: Story = {
  name: 'Start at Second Video',
  args: {
    items: sampleVideos,
    isOpen: true,
    initialIndex: 1
  }
}

// Interactive demo with mixed media grid
function MixedMediaGridDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Mixed media grid with images and videos. Click to open in lightbox.
      </p>
      <ChatImageGrid
        items={mixedMedia}
        maxWidth={400}
        onMediaClick={(index) => {
          setSelectedIndex(index)
          setIsOpen(true)
        }}
      />
      <Lightbox
        items={mixedMedia}
        initialIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export const InteractiveMixedMedia: Story = {
  name: 'Interactive Mixed Media',
  render: () => <MixedMediaGridDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete integration showing ChatImageGrid with videos opening a Lightbox.'
      }
    }
  }
}

// Interactive demo with video-only grid
function VideoGridDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Video grid. Click thumbnail to play inline, or open in lightbox.
      </p>
      <ChatImageGrid
        items={sampleVideos.slice(0, 3)}
        maxWidth={400}
        onMediaClick={(index) => {
          setSelectedIndex(index)
          setIsOpen(true)
        }}
      />
      <Lightbox
        items={sampleVideos.slice(0, 3)}
        initialIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export const InteractiveVideoGrid: Story = {
  name: 'Interactive Video Grid',
  render: () => <VideoGridDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Video-only grid with lightbox. Videos can play inline in grid or fullscreen in lightbox.'
      }
    }
  }
}
