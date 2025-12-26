import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PlaceholderCanvas } from './PlaceholderCanvas'

// Mock canvas context
const mockPutImageData = vi.fn()
const mockFillRect = vi.fn()
const mockImageData = { data: new Uint8ClampedArray(32 * 32 * 4) }
const mockCreateImageData = vi.fn().mockReturnValue(mockImageData)
const mockContext = {
  putImageData: mockPutImageData,
  fillRect: mockFillRect,
  fillStyle: '',
  createImageData: mockCreateImageData
}

beforeEach(() => {
  vi.clearAllMocks()
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext)
})

// Sample BlurHash for testing
const sampleBlurHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'

describe('PlaceholderCanvas', () => {
  it('renders canvas element', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash={sampleBlurHash}
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
        hash={sampleBlurHash}
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
        hash={sampleBlurHash}
        width={100}
        height={100}
        className="custom-class"
      />
    )
    const canvas = container.querySelector('canvas')
    expect(canvas).toHaveClass('custom-class')
  })

  it('calls putImageData for blurhash', () => {
    render(
      <PlaceholderCanvas
        hash={sampleBlurHash}
        width={100}
        height={100}
      />
    )
    expect(mockPutImageData).toHaveBeenCalled()
  })

  it('handles empty hash gracefully', () => {
    const { container } = render(
      <PlaceholderCanvas
        hash=""
        width={100}
        height={100}
      />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })

  it('handles invalid hash gracefully with fallback', () => {
    // Should not throw, renders canvas with fallback gray
    const { container } = render(
      <PlaceholderCanvas
        hash="invalid"
        width={100}
        height={100}
      />
    )
    // Canvas should still render regardless of hash validity
    expect(container.querySelector('canvas')).toBeTruthy()
    // Fallback should use fillRect for gray
    expect(mockFillRect).toHaveBeenCalled()
  })
})
