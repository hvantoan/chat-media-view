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
})
