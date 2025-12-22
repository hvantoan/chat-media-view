import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { ChatImageGrid } from './ChatImageGrid'

const meta = {
  component: Lightbox,
  title: 'Components/Lightbox',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Optional lightbox component for full-screen image viewing.

## Features
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
    images: {
      description: 'Array of images to display',
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

const sampleImages = [
  { src: 'https://picsum.photos/1200/800?random=10', width: 1200, height: 800, alt: 'Landscape photo 1' },
  { src: 'https://picsum.photos/800/1200?random=11', width: 800, height: 1200, alt: 'Portrait photo 2' },
  { src: 'https://picsum.photos/1000/1000?random=12', width: 1000, height: 1000, alt: 'Square photo 3' },
  { src: 'https://picsum.photos/1400/600?random=13', width: 1400, height: 600, alt: 'Wide photo 4' }
]

// Static lightbox (controlled via args)
export const Open: Story = {
  args: {
    images: sampleImages,
    isOpen: true,
    initialIndex: 0
  }
}

export const StartAtSecondImage: Story = {
  name: 'Start at Second Image',
  args: {
    images: sampleImages,
    isOpen: true,
    initialIndex: 1
  }
}

export const SingleImage: Story = {
  name: 'Single Image (No Navigation)',
  args: {
    images: [sampleImages[0]],
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
        images={sampleImages}
        maxWidth={400}
        onImageClick={(index) => {
          setSelectedIndex(index)
          setIsOpen(true)
        }}
      />
      <Lightbox
        images={sampleImages}
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
