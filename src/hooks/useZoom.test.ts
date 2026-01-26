import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useZoom } from './useZoom'

describe('useZoom', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useZoom())

    expect(result.current.zoom).toBe(1)
    expect(result.current.zoomPercent).toBe('100%')
    expect(result.current.canZoomIn).toBe(true)
    expect(result.current.canZoomOut).toBe(true)
    expect(result.current.isZoomed).toBe(false)
  })

  it('initializes with custom options', () => {
    const { result } = renderHook(() => useZoom({ initial: 2, min: 1, max: 4 }))

    expect(result.current.zoom).toBe(2)
    expect(result.current.zoomPercent).toBe('200%')
    expect(result.current.canZoomIn).toBe(true)
    expect(result.current.canZoomOut).toBe(true)
    expect(result.current.isZoomed).toBe(true)
  })

  it('zooms in', () => {
    const { result } = renderHook(() => useZoom({ initial: 1, step: 0.25 }))

    act(() => {
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(1.25)
    expect(result.current.zoomPercent).toBe('125%')
    expect(result.current.isZoomed).toBe(true)
  })

  it('zooms out', () => {
    const { result } = renderHook(() => useZoom({ initial: 1, step: 0.25 }))

    act(() => {
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.75)
    expect(result.current.zoomPercent).toBe('75%')
    expect(result.current.isZoomed).toBe(true)
  })

  it('respects max zoom limit', () => {
    const { result } = renderHook(() => useZoom({ initial: 2.75, max: 3, step: 0.5 }))

    act(() => {
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(3)
    expect(result.current.canZoomIn).toBe(false)

    act(() => {
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(3)
  })

  it('respects min zoom limit', () => {
    const { result } = renderHook(() => useZoom({ initial: 0.75, min: 0.5, step: 0.5 }))

    act(() => {
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.5)
    expect(result.current.canZoomOut).toBe(false)

    act(() => {
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.5)
  })

  it('resets zoom', () => {
    const { result } = renderHook(() => useZoom({ initial: 2 }))

    expect(result.current.zoom).toBe(2)

    act(() => {
      result.current.resetZoom()
    })

    expect(result.current.zoom).toBe(1)
    expect(result.current.isZoomed).toBe(false)
  })

  it('sets specific zoom level', () => {
    const { result } = renderHook(() => useZoom({ min: 0.5, max: 3 }))

    act(() => {
      result.current.setZoom(1.5)
    })
    expect(result.current.zoom).toBe(1.5)

    act(() => {
      result.current.setZoom(0.2) // Below min
    })
    expect(result.current.zoom).toBe(0.5)

    act(() => {
      result.current.setZoom(5) // Above max
    })
    expect(result.current.zoom).toBe(3)
  })
})
