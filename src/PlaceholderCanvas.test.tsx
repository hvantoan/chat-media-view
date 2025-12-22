import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PlaceholderCanvas } from './PlaceholderCanvas'

// Mock canvas context
const mockPutImageData = vi.fn()
const mockFillRect = vi.fn()
const mockContext = {
  putImageData: mockPutImageData,
  fillRect: mockFillRect,
  fillStyle: ''
}

beforeEach(() => {
  vi.clearAllMocks()
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext)
})

// Sample ThumbHash for testing
const sampleThumbHash = 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'

describe('PlaceholderCanvas', () => {
  it('renders canvas element', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash={sampleThumbHash}
        hashType="thumbhash"
        width={100}
        height={100}
      />
    )
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeTruthy()
  })

  it('has aria-hidden for accessibility', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash={sampleThumbHash}
        hashType="thumbhash"
        width={100}
        height={100}
      />
    )
    const canvas = container.querySelector('canvas')
    expect(canvas).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash={sampleThumbHash}
        hashType="thumbhash"
        width={100}
        height={100}
        className="custom-class"
      />
    )
    const canvas = container.querySelector('canvas')
    expect(canvas).toHaveClass('custom-class')
  })

  it('calls putImageData for thumbhash', () => {
    render(
      <PlaceholderCanvas
        hash={sampleThumbHash}
        hashType="thumbhash"
        width={100}
        height={100}
      />
    )
    expect(mockPutImageData).toHaveBeenCalled()
  })

  it('falls back to gray for blurhash (not implemented)', () => {
    render(
      <PlaceholderCanvas
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        hashType="blurhash"
        width={100}
        height={100}
      />
    )
    expect(mockFillRect).toHaveBeenCalled()
  })

  it('handles empty hash gracefully', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash=""
        hashType="thumbhash"
        width={100}
        height={100}
      />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })

  it('handles invalid hash gracefully', () => {
    // Should not throw, renders canvas and tries to decode
    const { container } = render(
      <PlaceholderCanvas
        hash="invalid"
        hashType="thumbhash"
        width={100}
        height={100}
      />
    )
    // Canvas should still render regardless of hash validity
    expect(container.querySelector('canvas')).toBeTruthy()
  })
})
