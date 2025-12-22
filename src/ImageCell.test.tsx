import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ImageCell } from './ImageCell'
import type { ImageItem, CellLayout } from './types'

const mockImage: ImageItem = {
  src: 'test.jpg',
  width: 800,
  height: 600,
  alt: 'Test image'
}

const mockLayout: CellLayout = {
  index: 0,
  x: 0,
  y: 0,
  width: 200,
  height: 150,
  borderRadius: {
    topLeft: 12,
    topRight: 0,
    bottomLeft: 12,
    bottomRight: 0
  }
}

describe('ImageCell', () => {
  it('renders with correct dimensions', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    expect(cell.style.width).toBe('200px')
    expect(cell.style.height).toBe('150px')
    expect(cell.style.left).toBe('0px')
    expect(cell.style.top).toBe('0px')
  })

  it('applies border radius correctly', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    expect(cell.style.borderRadius).toBe('12px 0px 0px 12px')
  })

  it('renders image with alt text', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const img = screen.getByAltText('Test image')
    expect(img).toBeInTheDocument()
  })

  it('uses thumbnail when available', () => {
    const imageWithThumb = { ...mockImage, thumbnail: 'thumb.jpg' }
    render(<ImageCell image={imageWithThumb} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img')
    expect(img?.src).toContain('thumb.jpg')
  })

  it('falls back to src when no thumbnail', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img')
    expect(img?.src).toContain('test.jpg')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} onClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.click(cell)
    expect(onClick).toHaveBeenCalled()
  })

  it('handles Enter key for accessibility', () => {
    const onClick = vi.fn()
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} onClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: 'Enter' })
    expect(onClick).toHaveBeenCalled()
  })

  it('adds loaded class when image loads', async () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img') as HTMLImageElement
    fireEvent.load(img)
    await waitFor(() => {
      expect(img).toHaveClass('loaded')
    })
  })

  it('shows error state on image error', async () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img') as HTMLImageElement
    fireEvent.error(img)
    await waitFor(() => {
      expect(document.querySelector('.chat-image-cell__error')).toBeInTheDocument()
    })
  })

  it('has correct lazy loading attribute', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={true} />)
    const img = document.querySelector('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('has eager loading when lazyLoad is false', () => {
    render(<ImageCell image={mockImage} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('handles missing alt text gracefully', () => {
    const imageNoAlt = { src: 'test.jpg', width: 100, height: 100 }
    render(<ImageCell image={imageNoAlt} layout={mockLayout} lazyLoad={false} />)
    const img = document.querySelector('img')
    expect(img).toHaveAttribute('alt', '')
  })
})
