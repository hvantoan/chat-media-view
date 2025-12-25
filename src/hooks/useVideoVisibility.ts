import type { RefObject} from 'react';
import { useEffect, useRef } from 'react'

interface UseVideoVisibilityOptions {
  /** Threshold below which video pauses (0-1). Default 0.1 */
  threshold?: number
  /** Whether visibility-based playback is enabled */
  enabled?: boolean
}

/**
 * Hook to auto-pause/resume video based on visibility
 * Pauses video when scrolled out of view, resumes when scrolled back in
 */
export function useVideoVisibility(
  containerRef: RefObject<Element | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  options: UseVideoVisibilityOptions = {}
): void {
  const { threshold = 0.1, enabled = true } = options
  const wasPlayingRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !videoRef.current) return

        const isVisible = entry.intersectionRatio >= threshold

        if (isVisible) {
          // Resume if was playing before scrolling away
          if (wasPlayingRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {
              // Autoplay blocked - user must interact
            })
          }
        } else {
          // Pause if playing and scrolled out
          if (!videoRef.current.paused) {
            wasPlayingRef.current = true
            videoRef.current.pause()
          }
        }
      },
      { threshold: [0, threshold, 0.5, 1] }
    )

    observer.observe(container)
    return () => { observer.disconnect(); }
  }, [containerRef, videoRef, threshold, enabled])
}
