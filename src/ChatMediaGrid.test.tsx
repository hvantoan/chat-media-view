import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ChatMediaGrid } from './ChatMediaGrid'
import type { MediaItem } from './types'

const mockItems: MediaItem[] = [
  { type: 'image', src: 'test1.jpg', width: 800, height: 600 },
  { type: 'image', src: 'test2.jpg', width: 600, height: 800 }
]

describe('ChatMediaGrid', () => {
  it('renders correct number of cells', () => {
    render(<ChatMediaGrid items={mockItems} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    expect(cells).toHaveLength(2)
  })

  it('calls onMediaClick with index and item', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={mockItems} onMediaClick={onClick} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[1]!)
    expect(onClick).toHaveBeenCalledWith(1, mockItems[1])
  })

  it('renders nothing for empty items', () => {
    const { container } = render(<ChatMediaGrid items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies custom className', () => {
    render(<ChatMediaGrid items={mockItems} className="custom" />)
    expect(document.querySelector('.chat-media-grid.custom')).toBeTruthy()
  })

  it('applies grid dimensions from layout', () => {
    render(<ChatMediaGrid items={[mockItems[0]!]} maxWidth={400} />)
    const grid = document.querySelector('.chat-media-grid') as HTMLElement
    expect(grid.style.width).toBe('400px')
    expect(parseInt(grid.style.height)).toBeGreaterThan(0)
  })

  it('renders with custom config', () => {
    render(
      <ChatMediaGrid
        items={mockItems}
        maxWidth={300}
        gap={4}
        borderRadius={16}
      />
    )
    const grid = document.querySelector('.chat-media-grid') as HTMLElement
    expect(grid.style.width).toBe('300px')
  })

  it('cells have accessible role and tabIndex', () => {
    render(<ChatMediaGrid items={[mockItems[0]!]} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    expect(cell).toHaveAttribute('role', 'button')
    expect(cell).toHaveAttribute('tabIndex', '0')
  })

  it('handles keyboard navigation', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={[mockItems[0]!]} onMediaClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledWith(0, mockItems[0])
  })

  it('ignores non-Enter/Space keyboard events', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={[mockItems[0]!]} onMediaClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: 'Tab' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('handles Space key for accessibility', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={[mockItems[0]!]} onMediaClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: ' ' })
    expect(onClick).toHaveBeenCalledWith(0, mockItems[0])
  })

  it('supports items prop with MediaItem array', () => {
    const items: MediaItem[] = [
      { type: 'image', src: 'img.jpg', width: 100, height: 100 },
      { type: 'video', src: 'vid.mp4', width: 200, height: 200, duration: 30 }
    ]
    render(<ChatMediaGrid items={items} />)
    // Should render both cells (video uses VideoCell)
    const cells = document.querySelectorAll('[role="button"]')
    expect(cells).toHaveLength(2)
  })

  it('calls onMediaClick with video item', () => {
    const onMediaClick = vi.fn()
    const items: MediaItem[] = [
      { type: 'video', src: 'vid.mp4', width: 200, height: 200, duration: 30 }
    ]
    render(<ChatMediaGrid items={items} onMediaClick={onMediaClick} />)
    const cell = document.querySelector('[role="button"]') as HTMLElement
    fireEvent.click(cell)
    expect(onMediaClick).toHaveBeenCalledWith(0, items[0])
  })
})

describe('ChatMediaGrid Lightbox Integration', () => {
  it('opens lightbox when media is clicked (enableLightbox=true by default)', () => {
    render(<ChatMediaGrid items={mockItems} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    // Lightbox should open with dialog role
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not render lightbox when enableLightbox=false', () => {
    render(<ChatMediaGrid items={mockItems} enableLightbox={false} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    // Lightbox should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes lightbox on escape key', () => {
    render(<ChatMediaGrid items={mockItems} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    // Press escape
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens lightbox at correct index when clicking second image', () => {
    render(<ChatMediaGrid items={mockItems} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[1]!)
    // Lightbox should show counter "2 / 2"
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
  })

  it('passes showDownload prop to lightbox', () => {
    render(<ChatMediaGrid items={mockItems} lightboxShowDownload={false} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    // Download button should not be present
    expect(screen.queryByLabelText('Download')).not.toBeInTheDocument()
  })

  it('passes showThumbnails prop to lightbox', () => {
    render(<ChatMediaGrid items={mockItems} lightboxShowThumbnails={false} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    // Thumbnails should not be present
    expect(document.querySelector('.chat-lightbox__thumbnails')).not.toBeInTheDocument()
  })

  it('still calls onMediaClick when lightbox is enabled', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={mockItems} onMediaClick={onClick} enableLightbox={true} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    expect(onClick).toHaveBeenCalledWith(0, mockItems[0])
    // And lightbox should also open
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('still calls onMediaClick when lightbox is disabled', () => {
    const onClick = vi.fn()
    render(<ChatMediaGrid items={mockItems} onMediaClick={onClick} enableLightbox={false} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[0]!)
    expect(onClick).toHaveBeenCalledWith(0, mockItems[0])
    // Lightbox should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
