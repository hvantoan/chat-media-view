import '@testing-library/jest-dom'

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
