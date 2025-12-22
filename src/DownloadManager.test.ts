import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl
} from './DownloadManager'

describe('DownloadManager', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  describe('downloadWithProgress', () => {
    it('downloads and tracks progress', async () => {
      const progressCallback = vi.fn()
      const mockChunks = [
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6])
      ]
      let chunkIndex = 0

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'Content-Length': '6', 'Content-Type': 'image/jpeg' }),
        body: {
          getReader: () => ({
            read: vi.fn().mockImplementation(async () => {
              if (chunkIndex < mockChunks.length) {
                return { done: false, value: mockChunks[chunkIndex++] }
              }
              return { done: true, value: undefined }
            })
          })
        }
      })

      const blob = await downloadWithProgress('https://example.com/image.jpg', progressCallback)

      expect(blob).toBeInstanceOf(Blob)
      expect(progressCallback).toHaveBeenCalledTimes(2)
      expect(progressCallback).toHaveBeenCalledWith({ loaded: 3, total: 6, percentage: 50 })
      expect(progressCallback).toHaveBeenCalledWith({ loaded: 6, total: 6, percentage: 100 })
    })

    it('falls back to blob() when no Content-Length', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/jpeg' })

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'Content-Type': 'image/jpeg' }),
        blob: vi.fn().mockResolvedValue(mockBlob)
      })

      const result = await downloadWithProgress('https://example.com/image.jpg')

      expect(result).toBe(mockBlob)
    })

    it('throws error on non-ok response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      })

      await expect(downloadWithProgress('https://example.com/notfound.jpg'))
        .rejects.toThrow('HTTP 404')
    })

    it('works without progress callback', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/jpeg' })

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({}),
        blob: vi.fn().mockResolvedValue(mockBlob)
      })

      const result = await downloadWithProgress('https://example.com/image.jpg')

      expect(result).toBe(mockBlob)
    })
  })

  describe('createImageUrl', () => {
    it('creates object URL from blob', () => {
      const blob = new Blob(['test'], { type: 'image/jpeg' })
      const url = createImageUrl(blob)

      // URL should be a string (mock returns 'blob:mock-url')
      expect(typeof url).toBe('string')
      expect(url.length).toBeGreaterThan(0)
    })
  })

  describe('revokeImageUrl', () => {
    it('revokes object URL without throwing', () => {
      // Should not throw
      expect(() => revokeImageUrl('blob:http://localhost/test')).not.toThrow()
    })
  })
})
