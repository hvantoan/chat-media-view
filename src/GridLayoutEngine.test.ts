import { describe, it, expect } from 'vitest'
import { calculateLayout } from './GridLayoutEngine'
import type { MediaItem } from './types'

const mockImage = (w: number, h: number): MediaItem => ({
  type: 'image',
  src: 'test.jpg',
  width: w,
  height: h,
})

describe('GridLayoutEngine', () => {
  describe('calculateLayout', () => {
    it('returns empty result for empty array', () => {
      const layout = calculateLayout([])
      expect(layout.cells).toHaveLength(0)
      expect(layout.totalWidth).toBe(0)
      expect(layout.totalHeight).toBe(0)
    })

    describe('edge cases', () => {
      it('handles zero height image gracefully', () => {
        const layout = calculateLayout([mockImage(800, 0)])
        expect(layout.cells).toHaveLength(1)
        expect(layout.cells[0].height).toBeGreaterThan(0)
      })

      it('handles zero width image gracefully', () => {
        const layout = calculateLayout([mockImage(0, 600)])
        expect(layout.cells).toHaveLength(1)
        expect(layout.cells[0].height).toBeGreaterThan(0)
      })

      it('handles negative dimensions gracefully', () => {
        const layout = calculateLayout([mockImage(-100, -100)])
        expect(layout.cells).toHaveLength(1)
        expect(layout.cells[0].height).toBeGreaterThan(0)
      })
    })

    describe('single image layout', () => {
      it('returns single cell for 1 image', () => {
        const layout = calculateLayout([mockImage(800, 600)])
        expect(layout.cells).toHaveLength(1)
        expect(layout.cells[0].index).toBe(0)
        expect(layout.cells[0].x).toBe(0)
        expect(layout.cells[0].y).toBe(0)
      })

      it('uses maxWidth for single image width', () => {
        const layout = calculateLayout([mockImage(800, 600)])
        expect(layout.cells[0].width).toBe(400)
        expect(layout.totalWidth).toBe(400)
      })

      it('preserves aspect ratio for single image', () => {
        const layout = calculateLayout([mockImage(800, 400)])
        expect(layout.cells[0].height).toBe(200) // 400 / 2 = 200
      })

      it('limits height for very tall images', () => {
        const layout = calculateLayout([mockImage(100, 1000)])
        expect(layout.cells[0].height).toBeLessThanOrEqual(400 * 1.2)
      })

      it('applies border radius to all corners', () => {
        const layout = calculateLayout([mockImage(800, 600)])
        const br = layout.cells[0].borderRadius
        expect(br.topLeft).toBe(12)
        expect(br.topRight).toBe(12)
        expect(br.bottomLeft).toBe(12)
        expect(br.bottomRight).toBe(12)
      })
    })

    describe('two images layout', () => {
      it('returns 2 cells side by side', () => {
        const layout = calculateLayout([mockImage(800, 600), mockImage(800, 600)])
        expect(layout.cells).toHaveLength(2)
        expect(layout.cells[1].x).toBeGreaterThan(0)
        expect(layout.cells[0].y).toBe(0)
        expect(layout.cells[1].y).toBe(0)
      })

      it('splits width evenly with gap', () => {
        const layout = calculateLayout([mockImage(800, 600), mockImage(800, 600)])
        const expectedCellWidth = (400 - 2) / 2 // (maxWidth - gap) / 2
        expect(layout.cells[0].width).toBeCloseTo(expectedCellWidth)
        expect(layout.cells[1].width).toBeCloseTo(expectedCellWidth)
      })

      it('applies correct border radius', () => {
        const layout = calculateLayout([mockImage(800, 600), mockImage(800, 600)])
        // Left cell: top-left and bottom-left
        expect(layout.cells[0].borderRadius.topLeft).toBe(12)
        expect(layout.cells[0].borderRadius.bottomLeft).toBe(12)
        expect(layout.cells[0].borderRadius.topRight).toBe(0)
        expect(layout.cells[0].borderRadius.bottomRight).toBe(0)
        // Right cell: top-right and bottom-right
        expect(layout.cells[1].borderRadius.topRight).toBe(12)
        expect(layout.cells[1].borderRadius.bottomRight).toBe(12)
        expect(layout.cells[1].borderRadius.topLeft).toBe(0)
        expect(layout.cells[1].borderRadius.bottomLeft).toBe(0)
      })
    })

    describe('three images layout', () => {
      it('returns 3 cells with 66/33 split', () => {
        const images = [mockImage(800, 600), mockImage(400, 400), mockImage(400, 400)]
        const layout = calculateLayout(images)
        expect(layout.cells).toHaveLength(3)
        // Left cell should be wider than right cells
        expect(layout.cells[0].width).toBeGreaterThan(layout.cells[1].width)
      })

      it('stacks right cells vertically', () => {
        const images = [mockImage(800, 600), mockImage(400, 400), mockImage(400, 400)]
        const layout = calculateLayout(images)
        expect(layout.cells[1].x).toBe(layout.cells[2].x)
        expect(layout.cells[2].y).toBeGreaterThan(layout.cells[1].y)
      })
    })

    describe('four images layout', () => {
      it('returns 4 cells in 2x2 grid', () => {
        const images = Array(4).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        expect(layout.cells).toHaveLength(4)
      })

      it('creates square cells', () => {
        const images = Array(4).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        layout.cells.forEach((cell) => {
          expect(cell.width).toBeCloseTo(cell.height)
        })
      })

      it('applies corner radius to corners only', () => {
        const images = Array(4).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        // Cell 0: top-left
        expect(layout.cells[0].borderRadius.topLeft).toBe(12)
        expect(layout.cells[0].borderRadius.topRight).toBe(0)
        // Cell 1: top-right
        expect(layout.cells[1].borderRadius.topRight).toBe(12)
        // Cell 2: bottom-left
        expect(layout.cells[2].borderRadius.bottomLeft).toBe(12)
        // Cell 3: bottom-right
        expect(layout.cells[3].borderRadius.bottomRight).toBe(12)
      })
    })

    describe('five images layout', () => {
      it('returns 5 cells in 2+3 pattern', () => {
        const images = Array(5).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        expect(layout.cells).toHaveLength(5)
      })

      it('has 2 cells on top row', () => {
        const images = Array(5).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        // First two cells should be on the same row (y = 0)
        expect(layout.cells[0].y).toBe(0)
        expect(layout.cells[1].y).toBe(0)
      })

      it('has 3 cells on bottom row', () => {
        const images = Array(5).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        // Last three cells should be on the same row
        expect(layout.cells[2].y).toBe(layout.cells[3].y)
        expect(layout.cells[3].y).toBe(layout.cells[4].y)
        expect(layout.cells[2].y).toBeGreaterThan(0)
      })

      it('applies correct corner radius', () => {
        const images = Array(5).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        // Top-left corner on cell 0
        expect(layout.cells[0].borderRadius.topLeft).toBe(12)
        // Top-right corner on cell 1
        expect(layout.cells[1].borderRadius.topRight).toBe(12)
        // Bottom-left corner on cell 2
        expect(layout.cells[2].borderRadius.bottomLeft).toBe(12)
        // Bottom-right corner on cell 4
        expect(layout.cells[4].borderRadius.bottomRight).toBe(12)
        // Cell 3 has no outer corners
        expect(layout.cells[3].borderRadius.topLeft).toBe(0)
        expect(layout.cells[3].borderRadius.topRight).toBe(0)
        expect(layout.cells[3].borderRadius.bottomLeft).toBe(0)
        expect(layout.cells[3].borderRadius.bottomRight).toBe(0)
      })
    })

    describe('with more than 5 images', () => {
      it('limits to 5 cells', () => {
        const images = Array(10).fill(null).map(() => mockImage(800, 600))
        const layout = calculateLayout(images)
        expect(layout.cells).toHaveLength(5)
      })
    })

    describe('custom config', () => {
      it('respects custom maxWidth', () => {
        const layout = calculateLayout([mockImage(800, 600)], { maxWidth: 300 })
        expect(layout.cells[0].width).toBe(300)
        expect(layout.totalWidth).toBe(300)
      })

      it('respects custom gap', () => {
        const layout = calculateLayout(
          [mockImage(800, 600), mockImage(800, 600)],
          { gap: 10 }
        )
        const expectedCellWidth = (400 - 10) / 2
        expect(layout.cells[0].width).toBeCloseTo(expectedCellWidth)
      })

      it('respects custom borderRadius', () => {
        const layout = calculateLayout([mockImage(800, 600)], { borderRadius: 20 })
        expect(layout.cells[0].borderRadius.topLeft).toBe(20)
      })
    })
  })
})
