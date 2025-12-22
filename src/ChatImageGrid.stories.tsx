import type { Meta, StoryObj } from '@storybook/react'
import { ChatImageGrid } from './ChatImageGrid'

const meta = {
  component: ChatImageGrid,
  title: 'Components/ChatImageGrid',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Telegram-style image grid for React chat applications.

## Features
- Layouts for 1-5 images (exact Telegram clone)
- Virtual list compatible via \`calculateGridHeight()\`
- BlurHash/ThumbHash placeholder support
- Keyboard accessible (Tab, Enter, Arrow keys)
- RTL layout support
- < 5KB gzipped
        `
      }
    }
  },
  argTypes: {
    images: {
      description: 'Array of images to display (1-5 images)',
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
    onImageClick: {
      description: 'Callback when an image is clicked',
      action: 'imageClicked'
    },
    className: {
      description: 'Custom class name for the grid container',
      control: 'text'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ChatImageGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages = [
  { src: 'https://picsum.photos/800/600?random=1', width: 800, height: 600 },
  { src: 'https://picsum.photos/600/800?random=2', width: 600, height: 800 },
  { src: 'https://picsum.photos/700/700?random=3', width: 700, height: 700 },
  { src: 'https://picsum.photos/900/500?random=4', width: 900, height: 500 },
  { src: 'https://picsum.photos/500/900?random=5', width: 500, height: 900 }
]

export const OneImage: Story = {
  args: { images: sampleImages.slice(0, 1) }
}

export const TwoImages: Story = {
  args: { images: sampleImages.slice(0, 2) }
}

export const ThreeImages: Story = {
  args: { images: sampleImages.slice(0, 3) }
}

export const FourImages: Story = {
  args: { images: sampleImages.slice(0, 4) }
}

export const FiveImages: Story = {
  args: { images: sampleImages.slice(0, 5) }
}

export const WithClickHandler: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    onImageClick: (index, image) => {
      console.log('Clicked image', index, image.src)
      alert(`Clicked image ${index + 1}`)
    }
  }
}

export const CustomDimensions: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    maxWidth: 300,
    gap: 4,
    borderRadius: 16
  }
}

export const NoLazyLoad: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    lazyLoad: false
  }
}

// Sample thumbhash for demo (a pinkish color)
const thumbhashSample = 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'

const imagesWithPlaceholder = sampleImages.slice(0, 3).map((img, i) => ({
  ...img,
  thumbhash: thumbhashSample,
  alt: `Image ${i + 1} with placeholder`
}))

export const WithThumbHashPlaceholder: Story = {
  name: 'With ThumbHash Placeholder',
  args: {
    images: imagesWithPlaceholder
  }
}

// Simulating error state with invalid URLs
const errorImages = [
  { src: 'https://invalid-url-for-testing.local/image1.jpg', width: 800, height: 600 },
  { src: 'https://invalid-url-for-testing.local/image2.jpg', width: 600, height: 800 }
]

export const ErrorStateWithRetry: Story = {
  name: 'Error State (Retry Button)',
  args: {
    images: errorImages
  }
}

export const MixedWithAndWithoutPlaceholder: Story = {
  name: 'Mixed (Some With Placeholder)',
  args: {
    images: [
      { ...sampleImages[0], thumbhash: thumbhashSample },
      sampleImages[1],
      { ...sampleImages[2], thumbhash: thumbhashSample }
    ]
  }
}

// RTL Layout Demo
export const RTLLayout: Story = {
  name: 'RTL Layout (Right-to-Left)',
  args: {
    images: sampleImages.slice(0, 3),
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
    images: sampleImages.slice(0, 4).map((img, i) => ({
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
