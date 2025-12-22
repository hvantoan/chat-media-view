import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { useRef } from 'react'

describe('useIntersectionObserver', () => {
  let observeMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>
  let mockCallback: IntersectionObserverCallback

  beforeEach(() => {
    observeMock = vi.fn()
    disconnectMock = vi.fn()

    // Store callback for manual triggering
    global.IntersectionObserver = vi.fn((callback) => {
      mockCallback = callback
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: vi.fn(),
        takeRecords: () => [],
        root: null,
        rootMargin: '',
        thresholds: []
      }
    }) as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false initially', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useIntersectionObserver(ref))
    expect(result.current).toBe(false)
  })

  it('returns true when skip is true', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useIntersectionObserver(ref, { skip: true })
    )
    expect(result.current).toBe(true)
  })

  it('observes element on mount', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    renderHook(() => useIntersectionObserver(ref))
    expect(observeMock).toHaveBeenCalledWith(element)
  })

  it('returns true when element becomes visible', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    const { result } = renderHook(() => useIntersectionObserver(ref))

    // Simulate intersection
    act(() => {
      mockCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    })

    expect(result.current).toBe(true)
  })

  it('disconnects observer when element becomes visible', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    renderHook(() => useIntersectionObserver(ref))

    act(() => {
      mockCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    })

    expect(disconnectMock).toHaveBeenCalled()
  })

  it('disconnects on unmount', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    const { unmount } = renderHook(() => useIntersectionObserver(ref))
    unmount()
    expect(disconnectMock).toHaveBeenCalled()
  })

  it('passes options to IntersectionObserver', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    renderHook(() =>
      useIntersectionObserver(ref, { rootMargin: '50px', threshold: 0.5 })
    )

    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { rootMargin: '50px', threshold: 0.5 }
    )
  })

  it('handles null ref gracefully', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useIntersectionObserver(ref))
    expect(result.current).toBe(false)
    expect(observeMock).not.toHaveBeenCalled()
  })

  it('stays true once visible (does not revert)', () => {
    const element = document.createElement('div')
    const ref = { current: element }
    const { result } = renderHook(() => useIntersectionObserver(ref))

    act(() => {
      mockCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    })

    // Observer disconnected, so no way to trigger false again
    expect(result.current).toBe(true)
  })
})
