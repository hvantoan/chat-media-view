import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChatImageGrid } from './ChatImageGrid'
import type { ImageItem } from './types'

const mockImages: ImageItem[] = [
  { src: 'test1.jpg', width: 800, height: 600 },
  { src: 'test2.jpg', width: 600, height: 800 }
]

describe('ChatImageGrid', () => {
  it('renders correct number of cells', () => {
    render(<ChatImageGrid images={mockImages} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    expect(cells).toHaveLength(2)
  })

  it('calls onImageClick with index and image', () => {
    const onClick = vi.fn()
    render(<ChatImageGrid images={mockImages} onImageClick={onClick} />)
    const cells = document.querySelectorAll('.chat-image-cell')
    fireEvent.click(cells[1])
    expect(onClick).toHaveBeenCalledWith(1, mockImages[1])
  })

  it('renders nothing for empty images', () => {
    const { container } = render(<ChatImageGrid images={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies custom className', () => {
    render(<ChatImageGrid images={mockImages} className="custom" />)
    expect(document.querySelector('.chat-image-grid.custom')).toBeTruthy()
  })

  it('applies grid dimensions from layout', () => {
    render(<ChatImageGrid images={[mockImages[0]]} maxWidth={400} />)
    const grid = document.querySelector('.chat-image-grid') as HTMLElement
    expect(grid.style.width).toBe('400px')
    expect(parseInt(grid.style.height)).toBeGreaterThan(0)
  })

  it('renders with custom config', () => {
    render(
      <ChatImageGrid
        images={mockImages}
        maxWidth={300}
        gap={4}
        borderRadius={16}
      />
    )
    const grid = document.querySelector('.chat-image-grid') as HTMLElement
    expect(grid.style.width).toBe('300px')
  })

  it('cells have accessible role and tabIndex', () => {
    render(<ChatImageGrid images={[mockImages[0]]} />)
    const cell = document.querySelector('.chat-image-cell')
    expect(cell).toHaveAttribute('role', 'button')
    expect(cell).toHaveAttribute('tabIndex', '0')
  })

  it('handles keyboard navigation', () => {
    const onClick = vi.fn()
    render(<ChatImageGrid images={[mockImages[0]]} onImageClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledWith(0, mockImages[0])
  })

  it('ignores non-Enter/Space keyboard events', () => {
    const onClick = vi.fn()
    render(<ChatImageGrid images={[mockImages[0]]} onImageClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: 'Tab' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('handles Space key for accessibility', () => {
    const onClick = vi.fn()
    render(<ChatImageGrid images={[mockImages[0]]} onImageClick={onClick} />)
    const cell = document.querySelector('.chat-image-cell') as HTMLElement
    fireEvent.keyDown(cell, { key: ' ' })
    expect(onClick).toHaveBeenCalledWith(0, mockImages[0])
  })
})
