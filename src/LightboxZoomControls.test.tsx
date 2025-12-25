import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LightboxZoomControls } from './LightboxZoomControls'
import type { UseZoomResult } from './hooks/useZoom'

const mockZoom: UseZoomResult = {
  zoom: 1,
  zoomPercent: '100%',
  zoomIn: vi.fn(),
  zoomOut: vi.fn(),
  resetZoom: vi.fn(),
  setZoom: vi.fn(),
  canZoomIn: true,
  canZoomOut: true,
  isZoomed: false,
}

describe('LightboxZoomControls', () => {
  it('renders zoom percentage and buttons', () => {
    render(<LightboxZoomControls zoom={mockZoom} />)

    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
  })

  it('calls zoomIn when zoom in button is clicked', () => {
    render(<LightboxZoomControls zoom={mockZoom} />)

    fireEvent.click(screen.getByLabelText('Zoom in'))
    expect(mockZoom.zoomIn).toHaveBeenCalled()
  })

  it('calls zoomOut when zoom out button is clicked', () => {
    render(<LightboxZoomControls zoom={mockZoom} />)

    fireEvent.click(screen.getByLabelText('Zoom out'))
    expect(mockZoom.zoomOut).toHaveBeenCalled()
  })

  it('calls resetZoom when zoom percentage is clicked', () => {
    render(<LightboxZoomControls zoom={mockZoom} />)

    fireEvent.click(screen.getByText('100%'))
    expect(mockZoom.resetZoom).toHaveBeenCalled()
  })

  it('disables zoom in button when canZoomIn is false', () => {
    render(
      <LightboxZoomControls
        zoom={{ ...mockZoom, canZoomIn: false }}
      />
    )

    expect(screen.getByLabelText('Zoom in')).toBeDisabled()
  })

  it('disables zoom out button when canZoomOut is false', () => {
    render(
      <LightboxZoomControls
        zoom={{ ...mockZoom, canZoomOut: false }}
      />
    )

    expect(screen.getByLabelText('Zoom out')).toBeDisabled()
  })
})
