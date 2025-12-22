import { useState, useEffect, RefObject } from 'react'

interface IntersectionOptions {
  rootMargin?: string
  threshold?: number | number[]
  skip?: boolean
}

/**
 * Hook to observe element visibility via Intersection Observer
 * Returns true once element enters viewport, stays true after
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: IntersectionOptions = {}
): boolean {
  const { rootMargin = '0px', threshold = 0, skip = false } = options
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (skip) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, skip])

  return isVisible
}
