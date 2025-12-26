import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { ChatMediaGrid } from './ChatMediaGrid'
import type { MediaItem, VideoMediaItem } from './types'

const meta = {
  component: Lightbox,
  title: 'Components/Lightbox',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Full-screen media viewer with glassmorphism UI.

## Features
- **Glassmorphism UI** with blurred background
- **Zoom controls** (+/-/reset) for images
- **Thumbnail strip** for quick navigation
- **Video playback** with native controls
- **Download button** with progress indicator
- **Keyboard shortcuts**: Arrows, Escape, +/-, 0
- Fully accessible with ARIA attributes
        `
      }
    }
  },
  argTypes: {
    items: { description: 'Array of media items', control: { type: 'object' } },
    initialIndex: { description: 'Starting index', control: { type: 'number', min: 0 } },
    isOpen: { description: 'Lightbox visibility', control: 'boolean' },
    showThumbnails: { description: 'Show thumbnail strip', control: 'boolean' },
    showZoomControls: { description: 'Show zoom controls', control: 'boolean' },
    showDownload: { description: 'Show download button', control: 'boolean' },
    onClose: { action: 'closed' },
    onIndexChange: { action: 'indexChanged' }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Lightbox>

export default meta
type Story = StoryObj<typeof meta>

// Simple sample data
const images: MediaItem[] = [
  { type: 'image', src: 'https://picsum.photos/1200/800?random=1', width: 1200, height: 800, alt: 'Landscape' },
  { type: 'image', src: 'https://picsum.photos/800/1200?random=2', width: 800, height: 1200, alt: 'Portrait' },
  { type: 'image', src: 'https://picsum.photos/1000/1000?random=3', width: 1000, height: 1000, alt: 'Square' },
  { type: 'image', src: 'https://picsum.photos/1600/900?random=4', width: 1600, height: 900, alt: 'Wide' }
]

const videos: VideoMediaItem[] = [
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    width: 1280, height: 720, alt: 'Video 1'
  },
  {
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    width: 1280, height: 720, alt: 'Video 2'
  }
]

const mixed: MediaItem[] = [images[0], videos[0], images[1], videos[1]]

// =====================
// Basic Stories
// =====================

export const Default: Story = {
  args: { items: images, isOpen: true }
}

export const SingleImage: Story = {
  args: { items: [images[0]], isOpen: true },
  parameters: { docs: { description: { story: 'Single image - no nav buttons or thumbnails' } } }
}

// =====================
// New Feature Stories
// =====================

export const WithZoomControls: Story = {
  name: 'Zoom Controls',
  args: { items: images, isOpen: true, showZoomControls: true },
  parameters: {
    docs: {
      description: {
        story: 'Use +/- buttons or keyboard (+, -, 0) to zoom. Click percentage to reset.'
      }
    }
  }
}

export const WithThumbnails: Story = {
  name: 'Thumbnail Strip',
  args: { items: images, isOpen: true, showThumbnails: true },
  parameters: {
    docs: {
      description: {
        story: 'Clickable thumbnail strip at bottom. Auto-scrolls to active item.'
      }
    }
  }
}

export const NoThumbnails: Story = {
  name: 'Without Thumbnails',
  args: { items: images, isOpen: true, showThumbnails: false },
  parameters: { docs: { description: { story: 'Thumbnail strip disabled via prop.' } } }
}

export const NoZoom: Story = {
  name: 'Without Zoom',
  args: { items: images, isOpen: true, showZoomControls: false },
  parameters: { docs: { description: { story: 'Zoom controls disabled via prop.' } } }
}

// =====================
// Video Stories
// =====================

export const Video: Story = {
  args: { items: [videos[0]], isOpen: true },
  parameters: { docs: { description: { story: 'Single video with native controls.' } } }
}

export const MixedMedia: Story = {
  args: { items: mixed, isOpen: true },
  parameters: { docs: { description: { story: 'Images and videos together. Zoom disabled for videos.' } } }
}

// =====================
// Interactive Demo
// =====================

function InteractiveDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div style={{ padding: 20 }}>
      <p style={{ marginBottom: 16, color: '#666' }}>
        Click image to open. Use arrows, +/-, thumbnails to navigate.
      </p>
      <ChatMediaGrid
        items={mixed}
        maxWidth={400}
        onMediaClick={(i) => { setIndex(i); setIsOpen(true) }}
      />
      <Lightbox
        items={mixed}
        initialIndex={index}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Full integration: ChatMediaGrid + Lightbox with all features.'
      }
    }
  }
}
