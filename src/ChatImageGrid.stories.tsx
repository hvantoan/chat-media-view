import type { Meta, StoryObj } from '@storybook/react'
import { ChatImageGrid } from './ChatImageGrid'

const meta = {
  component: ChatImageGrid,
  title: 'Components/ChatImageGrid',
  parameters: { layout: 'centered' },
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
