import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LightboxThumbnails } from './LightboxThumbnails'
import type { MediaItem } from './types'
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

const mockItems: MediaItem[] = [
  { type: 'image', src: 'img1.jpg', width: 100, height: 100, alt: 'Image 1' },
  { type: 'video', src: 'video1.mp4', thumbnail: 'thumb1.jpg', width: 100, height: 100, alt: 'Video 1' },
  { type: 'image', src: 'img2.jpg', width: 100, height: 100 },
]

describe('LightboxThumbnails', () => {
  it('renders thumbnails for each media item', () => {
    render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={vi.fn()} />)
    const thumbnails = screen.getAllByRole('option')
    expect(thumbnails).toHaveLength(mockItems.length)
  })

  it('highlights the active thumbnail', () => {
    render(<LightboxThumbnails items={mockItems} currentIndex={1} onSelect={vi.fn()} />)
    const thumbnails = screen.getAllByRole('option')
    expect(thumbnails[1]).toHaveClass('chat-lightbox__thumb--active')
    expect(thumbnails[1]).toHaveAttribute('aria-selected', 'true')
    expect(thumbnails[0]).not.toHaveClass('chat-lightbox__thumb--active')
    expect(thumbnails[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onSelect when a thumbnail is clicked', () => {
    const onSelect = vi.fn()
    render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={onSelect} />)
    const thumbnails = screen.getAllByRole('option')
    fireEvent.click(thumbnails[2])
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('shows video indicator for video items', () => {
    render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={vi.fn()} />)
    const videoThumb = screen.getAllByRole('option')[1]
    expect(videoThumb.querySelector('.chat-lightbox__thumb-video-badge')).toBeInTheDocument()

    const imageThumb = screen.getAllByRole('option')[0]
    expect(imageThumb.querySelector('.chat-lightbox__thumb-video-badge')).not.toBeInTheDocument()
  })

  it('uses thumbnail URL when available, otherwise falls back to src', () => {
    render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={vi.fn()} />)
    const imgs = document.querySelectorAll('.chat-lightbox__thumb-img') as NodeListOf<HTMLImageElement>

    expect(imgs[0].src).toContain('img1.jpg')
    expect(imgs[1].src).toContain('thumb1.jpg') // Should use thumbnail
    expect(imgs[2].src).toContain('img2.jpg')
  })

  it('handles keyboard navigation (Enter and Space)', () => {
    const onSelect = vi.fn()
    render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={onSelect} />)
    const thumbnails = screen.getAllByRole('option')

    fireEvent.keyDown(thumbnails[1], { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith(1)

    fireEvent.keyDown(thumbnails[2], { key: ' ' })
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('handles arrow key navigation focus', () => {
    render(<LightboxThumbnails items={mockItems} currentIndex={1} onSelect={vi.fn()} />)
    const thumbnails = screen.getAllByRole('option')

    // Focus 2nd thumb
    thumbnails[1].focus()

    // ArrowRight
    fireEvent.keyDown(thumbnails[1], { key: 'ArrowRight' })
    expect(document.activeElement).toBe(thumbnails[2])

    // ArrowLeft
    fireEvent.keyDown(thumbnails[2], { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(thumbnails[1])
  })

  it('scrolls active thumbnail into view on index change', () => {
    const { rerender } = render(<LightboxThumbnails items={mockItems} currentIndex={0} onSelect={vi.fn()} />)

    // Initial render might call it during layout/mount
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()

    const callCount = (window.HTMLElement.prototype.scrollIntoView as any).mock.calls.length

    rerender(<LightboxThumbnails items={mockItems} currentIndex={1} onSelect={vi.fn()} />)
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(callCount + 1)
  })
})
