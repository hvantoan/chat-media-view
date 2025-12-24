import { useState, useCallback, useMemo } from 'react'

export interface UseZoomOptions {
  /** Minimum zoom level (default: 0.5) */
  min?: number
  /** Maximum zoom level (default: 3) */
  max?: number
  /** Zoom step increment (default: 0.25) */
  step?: number
  /** Initial zoom level (default: 1) */
  initial?: number
}

export interface UseZoomResult {
  /** Current zoom level */
  zoom: number
  /** Formatted zoom percentage string (e.g., "100%") */
  zoomPercent: string
  /** Zoom in by step amount */
  zoomIn: () => void
  /** Zoom out by step amount */
  zoomOut: () => void
  /** Reset zoom to 1 (100%) */
  resetZoom: () => void
  /** Set zoom to specific value */
  setZoom: (level: number) => void
  /** Whether zoom can increase */
  canZoomIn: boolean
  /** Whether zoom can decrease */
  canZoomOut: boolean
  /** Whether currently zoomed (not at 100%) */
  isZoomed: boolean
}

/**
 * Hook for managing zoom state with constraints
 */
export function useZoom(options: UseZoomOptions = {}): UseZoomResult {
  const {
    min = 0.5,
    max = 3,
    step = 0.25,
    initial = 1
  } = options

  const [zoom, setZoomState] = useState(initial)

  const clamp = useCallback((value: number) => {
    return Math.min(max, Math.max(min, value))
  }, [min, max])

  const zoomIn = useCallback(() => {
    setZoomState(prev => clamp(prev + step))
  }, [clamp, step])

  const zoomOut = useCallback(() => {
    setZoomState(prev => clamp(prev - step))
  }, [clamp, step])

  const resetZoom = useCallback(() => {
    setZoomState(1)
  }, [])

  const setZoom = useCallback((level: number) => {
    setZoomState(clamp(level))
  }, [clamp])

  const zoomPercent = useMemo(() => {
    return `${Math.round(zoom * 100)}%`
  }, [zoom])

  const canZoomIn = zoom < max
  const canZoomOut = zoom > min
  const isZoomed = zoom !== 1

  return {
    zoom,
    zoomPercent,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    canZoomIn,
    canZoomOut,
    isZoomed
  }
}
