import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock HTMLMediaElement play/pause for jsdom
Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockImplementation(() => Promise.resolve()),
})

Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: vi.fn(),
})

// Mock IntersectionObserver for jsdom environment
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    // Immediately trigger as visible for testing
    this.callback([{
      target,
      isIntersecting: true,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRatio: 1,
      intersectionRect: target.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now()
    }], this as unknown as IntersectionObserver)
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}

(globalThis as unknown as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver

// Mock scrollIntoView for jsdom
if (typeof window.HTMLElement.prototype.scrollIntoView !== 'function') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
}
if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = () => 'blob:mock-url'
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = () => {}
}

// Mock ImageData for jsdom
if (typeof globalThis.ImageData === 'undefined') {
  (globalThis as unknown as Record<string, unknown>).ImageData = class ImageData {
    readonly data: Uint8ClampedArray
    readonly width: number
    readonly height: number
    readonly colorSpace: PredefinedColorSpace = 'srgb'

    constructor(dataOrWidth: Uint8ClampedArray | number, widthOrHeight: number, height?: number) {
      if (typeof dataOrWidth === 'number') {
        this.width = dataOrWidth
        this.height = widthOrHeight
        this.data = new Uint8ClampedArray(this.width * this.height * 4)
      } else {
        this.data = dataOrWidth
        this.width = widthOrHeight
        this.height = height ?? (dataOrWidth.length / (widthOrHeight * 4))
      }
    }
  }
}
