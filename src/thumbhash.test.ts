import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  thumbHashToRGBA,
  base64ToBytes,
  thumbHashToDataURL
} from './thumbhash'

// Sample ThumbHash for testing (a small valid hash)
// This is a minimal valid thumbhash - results may vary
const sampleHash = 'YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA'

describe('thumbhash', () => {
  describe('base64ToBytes', () => {
    it('converts base64 to Uint8Array', () => {
      const result = base64ToBytes('SGVsbG8=') // "Hello" in base64
      expect(result).toBeInstanceOf(Uint8Array)
      expect(result.length).toBe(5)
      expect(String.fromCharCode(...result)).toBe('Hello')
    })

    it('handles empty string', () => {
      const result = base64ToBytes('')
      expect(result).toBeInstanceOf(Uint8Array)
      expect(result.length).toBe(0)
    })
  })

  describe('thumbHashToRGBA', () => {
    it('decodes hash to RGBA pixels', () => {
      const bytes = base64ToBytes(sampleHash)
      const result = thumbHashToRGBA(bytes)

      expect(result).toHaveProperty('w')
      expect(result).toHaveProperty('h')
      expect(result).toHaveProperty('rgba')
      expect(result.w).toBeGreaterThan(0)
      expect(result.h).toBeGreaterThan(0)
      expect(result.rgba).toBeInstanceOf(Uint8Array)
      expect(result.rgba.length).toBe(result.w * result.h * 4)
    })

    it('produces valid pixel values (0-255)', () => {
      const bytes = base64ToBytes(sampleHash)
      const { rgba } = thumbHashToRGBA(bytes)

      for (let i = 0; i < rgba.length; i++) {
        expect(rgba[i]).toBeGreaterThanOrEqual(0)
        expect(rgba[i]).toBeLessThanOrEqual(255)
      }
    })
  })

  describe('thumbHashToDataURL', () => {
    beforeEach(() => {
      // Mock canvas API for jsdom
      const mockContext = {
        putImageData: vi.fn()
      }
      HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext)
      HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,test')
    })

    it('converts hash to data URL', () => {
      const result = thumbHashToDataURL(sampleHash)
      expect(result).toBe('data:image/png;base64,test')
    })
  })
})
