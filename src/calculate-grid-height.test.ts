import { describe, it, expect } from 'vitest'
import { calculateGridHeight } from './calculate-grid-height'
import type { MediaItem } from './types'

const mockImage = (w: number, h: number): MediaItem => ({
  type: 'image',
  src: 'test.jpg',
  width: w,
  height: h,
})

describe('calculateGridHeight', () => {
  it('returns 0 for empty array', () => {
    expect(calculateGridHeight([])).toBe(0)
  })

  it('returns consistent height for same images', () => {
    const images = [mockImage(800, 600)]
    const h1 = calculateGridHeight(images, 400)
    const h2 = calculateGridHeight(images, 400)
    expect(h1).toBe(h2)
  })

  it('returns height matching layout calculation', () => {
    const images = [mockImage(800, 600)]
    const height = calculateGridHeight(images, 400)
    // 800/600 = 1.33 aspect ratio, width 400 -> height 300
    expect(height).toBe(300)
  })

  it('respects custom maxWidth', () => {
    const images = [mockImage(800, 800)] // 1:1 aspect ratio
    const height300 = calculateGridHeight(images, 300)
    const height400 = calculateGridHeight(images, 400)
    expect(height300).toBe(300)
    expect(height400).toBe(400)
  })

  it('respects custom gap', () => {
    const images = [mockImage(800, 800), mockImage(800, 800)]
    const heightGap2 = calculateGridHeight(images, 400, 2)
    const heightGap10 = calculateGridHeight(images, 400, 10)
    // Different gaps affect cell width which affects height
    expect(heightGap2).not.toBe(heightGap10)
  })

  it('handles 2 images', () => {
    const images = [mockImage(800, 800), mockImage(800, 800)]
    const height = calculateGridHeight(images, 400)
    expect(height).toBeGreaterThan(0)
  })

  it('handles 3 images', () => {
    const images = Array(3).fill(null).map(() => mockImage(800, 600))
    const height = calculateGridHeight(images, 400)
    expect(height).toBeGreaterThan(0)
  })

  it('handles 4 images', () => {
    const images = Array(4).fill(null).map(() => mockImage(800, 600))
    const height = calculateGridHeight(images, 400)
    // 2x2 grid with square cells
    const expectedCellSize = (400 - 2) / 2
    const expectedHeight = expectedCellSize * 2 + 2
    expect(height).toBeCloseTo(expectedHeight)
  })

  it('handles 5 images', () => {
    const images = Array(5).fill(null).map(() => mockImage(800, 600))
    const height = calculateGridHeight(images, 400)
    // 2 rows with rowHeight = 0.3 * maxWidth
    const rowHeight = 400 * 0.3
    const expectedHeight = rowHeight * 2 + 2
    expect(height).toBeCloseTo(expectedHeight)
  })

  it('uses default maxWidth of 400', () => {
    const images = [mockImage(800, 800)]
    const height = calculateGridHeight(images)
    expect(height).toBe(400)
  })

  it('uses default gap of 2', () => {
    const images = [mockImage(800, 800), mockImage(800, 800)]
    const heightDefault = calculateGridHeight(images, 400)
    const heightExplicit = calculateGridHeight(images, 400, 2)
    expect(heightDefault).toBe(heightExplicit)
  })
})
