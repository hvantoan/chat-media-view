import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Lightbox } from './Lightbox'
import type { MediaItem } from './types'

const mockItems: MediaItem[] = [
  { type: 'image', src: 'test1.jpg', width: 800, height: 600, alt: 'Image 1' },
  { type: 'image', src: 'test2.jpg', width: 600, height: 800, alt: 'Image 2' },
  { type: 'video', src: 'test.mp4', width: 1920, height: 1080, duration: 60, thumbnail: 'thumb.jpg' }
]

describe('Lightbox', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Lightbox items={mockItems} isOpen={false} onClose={() => {}} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders when open', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByAltText('Image 1')).toBeInTheDocument()
  })

  it('shows blurred background with current image', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )
    const blurBg = document.querySelector('.chat-lightbox__blur-bg') as HTMLElement
    expect(blurBg.style.backgroundImage).toContain('test1.jpg')
  })

  it('navigates to next item', () => {
    const onIndexChange = vi.fn()
    render(
      <Lightbox
        items={mockItems}
        isOpen={true}
        onClose={() => {}}
        onIndexChange={onIndexChange}
      />
    )

    const nextBtn = screen.getByLabelText('Next')
    fireEvent.click(nextBtn)

    expect(screen.getByAltText('Image 2')).toBeInTheDocument()
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('navigates to previous item', () => {
    render(
      <Lightbox
        items={mockItems}
        isOpen={true}
        initialIndex={1}
        onClose={() => {}}
      />
    )

    const prevBtn = screen.getByLabelText('Previous')
    fireEvent.click(prevBtn)

    expect(screen.getByAltText('Image 1')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={onClose} />
    )

    const closeBtn = screen.getByLabelText('Close')
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking backdrop', () => {
    const onClose = vi.fn()
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={onClose} />
    )

    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not close when clicking stage', () => {
    const onClose = vi.fn()
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={onClose} />
    )

    const stage = document.querySelector('.chat-lightbox__stage') as HTMLElement
    fireEvent.click(stage)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders video when item is video', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} initialIndex={2} onClose={() => {}} />
    )
    // LightboxVideo should be rendered (it contains a video tag usually)
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
  })

  it('shows counter when multiple items exist', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} />
    )
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('shows zoom controls for images and hides them for videos', () => {
    const { rerender } = render(
      <Lightbox items={mockItems} isOpen={true} initialIndex={0} onClose={() => {}} />
    )
    // Index 0 is an image
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()

    // Navigate to index 2 which is a video
    rerender(
      <Lightbox items={mockItems} isOpen={true} initialIndex={2} onClose={() => {}} />
    )
    expect(screen.queryByLabelText('Zoom in')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Zoom out')).not.toBeInTheDocument()
  })

  it('applies zoom transform to image', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} initialIndex={0} onClose={() => {}} />
    )

    const img = screen.getByAltText('Image 1')
    expect(img.style.transform).toBe('scale(1)')

    fireEvent.click(screen.getByLabelText('Zoom in'))
    expect(img.style.transform).toBe('scale(1.25)')
    expect(img).toHaveClass('chat-lightbox__media--zoomed')

    fireEvent.click(screen.getByLabelText(/Current zoom: 125%/))
    expect(img.style.transform).toBe('scale(1)')
    expect(img).not.toHaveClass('chat-lightbox__media--zoomed')
  })

  it('handles zoom keyboard shortcuts', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} initialIndex={0} onClose={() => {}} />
    )

    const img = screen.getByAltText('Image 1')

    fireEvent.keyDown(document, { key: '+' })
    expect(img.style.transform).toBe('scale(1.25)')

    fireEvent.keyDown(document, { key: '-' })
    expect(img.style.transform).toBe('scale(1)')

    fireEvent.keyDown(document, { key: '=' }) // Alternative for +
    expect(img.style.transform).toBe('scale(1.25)')

    fireEvent.keyDown(document, { key: '0' })
    expect(img.style.transform).toBe('scale(1)')
  })

  it('resets zoom when navigating to another item', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} initialIndex={0} onClose={() => {}} />
    )

    fireEvent.click(screen.getByLabelText('Zoom in'))
    expect(screen.getByAltText('Image 1').style.transform).toBe('scale(1.25)')

    fireEvent.click(screen.getByLabelText('Next'))
    // Wait for the next image to be rendered and check its zoom
    const nextImg = screen.getByAltText('Image 2')
    expect(nextImg.style.transform).toBe('scale(1)')
  })

  it('respects showDownload prop', () => {
    const { rerender } = render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showDownload={true} />
    )
    expect(screen.queryByLabelText('Download')).toBeInTheDocument()

    rerender(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showDownload={false} />
    )
    expect(screen.queryByLabelText('Download')).not.toBeInTheDocument()
  })

  it('shows thumbnails when enabled and multiple items', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showThumbnails={true} />
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('hides thumbnails when disabled', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showThumbnails={false} />
    )
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('hides thumbnails for single item', () => {
    render(
      <Lightbox items={[mockItems[0]]} isOpen={true} onClose={() => {}} showThumbnails={true} />
    )
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('navigates via thumbnail click', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showThumbnails={true} />
    )
    const thumbnails = screen.getAllByRole('option')
    fireEvent.click(thumbnails[1])
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('hides zoom controls when showZoomControls is false', () => {
    render(
      <Lightbox items={mockItems} isOpen={true} onClose={() => {}} showZoomControls={false} />
    )
    expect(screen.queryByLabelText('Zoom in')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Zoom out')).not.toBeInTheDocument()
  })
})
