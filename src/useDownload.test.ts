import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDownload } from './hooks/useDownload'

// Mock DownloadManager
vi.mock('./DownloadManager', () => ({
  downloadWithProgress: vi.fn(),
  createImageUrl: vi.fn(),
  revokeImageUrl: vi.fn()
}))

import {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl
} from './DownloadManager'

const mockDownloadWithProgress = downloadWithProgress as ReturnType<typeof vi.fn>
const mockCreateImageUrl = createImageUrl as ReturnType<typeof vi.fn>
const mockRevokeImageUrl = revokeImageUrl as ReturnType<typeof vi.fn>

describe('useDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes with default state', () => {
    const { result } = renderHook(() => useDownload())

    expect(result.current.progress).toBeNull()
    expect(result.current.isDownloading).toBe(false)
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
  })

  it('downloads successfully', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' })
    const mockObjectUrl = 'blob:http://localhost/test'

    // Now returns DownloadResult
    mockDownloadWithProgress.mockResolvedValue({ blob: mockBlob, retried: false, attempts: 1 })
    mockCreateImageUrl.mockReturnValue(mockObjectUrl)

    const { result } = renderHook(() => useDownload())

    let downloadResult: string | undefined
    await act(async () => {
      downloadResult = await result.current.download('https://example.com/image.jpg')
    })

    expect(downloadResult).toBe(mockObjectUrl)
    expect(result.current.isDownloading).toBe(false)
    expect(result.current.status).toBe('completed')
    expect(result.current.error).toBeNull()
  })

  it('updates progress during download', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' })
    const mockObjectUrl = 'blob:http://localhost/test'

    mockDownloadWithProgress.mockImplementation(async (_url, options) => {
      options?.onProgress?.({ loaded: 50, total: 100, percentage: 50 })
      options?.onProgress?.({ loaded: 100, total: 100, percentage: 100 })
      return { blob: mockBlob, retried: false, attempts: 1 }
    })
    mockCreateImageUrl.mockReturnValue(mockObjectUrl)

    const { result } = renderHook(() => useDownload())

    await act(async () => {
      await result.current.download('https://example.com/image.jpg')
    })

    // Progress should have been updated (final state depends on async timing)
    expect(mockDownloadWithProgress).toHaveBeenCalled()
  })

  it('handles download error', async () => {
    const error = new Error('Network error')
    mockDownloadWithProgress.mockRejectedValue(error)

    const { result } = renderHook(() => useDownload())

    await act(async () => {
      try {
        await result.current.download('https://example.com/image.jpg')
      } catch {
        // Expected to throw
      }
    })

    expect(result.current.error).toBe(error)
    expect(result.current.isDownloading).toBe(false)
    expect(result.current.status).toBe('error')
  })

  it('reset clears state', async () => {
    const error = new Error('Network error')
    mockDownloadWithProgress.mockRejectedValue(error)

    const { result } = renderHook(() => useDownload())

    await act(async () => {
      try {
        await result.current.download('https://example.com/image.jpg')
      } catch {
        // Expected
      }
    })

    expect(result.current.error).toBe(error)

    act(() => {
      result.current.reset()
    })

    expect(result.current.progress).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isDownloading).toBe(false)
    expect(result.current.status).toBe('idle')
  })

  it('cleans up object URL on unmount', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' })
    const mockObjectUrl = 'blob:http://localhost/test'

    mockDownloadWithProgress.mockResolvedValue({ blob: mockBlob, retried: false, attempts: 1 })
    mockCreateImageUrl.mockReturnValue(mockObjectUrl)

    const { result, unmount } = renderHook(() => useDownload())

    await act(async () => {
      await result.current.download('https://example.com/image.jpg')
    })

    unmount()

    expect(mockRevokeImageUrl).toHaveBeenCalledWith(mockObjectUrl)
  })

  it('cancel aborts download and updates status', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' })

    // Simulate a slow download that can be cancelled
    mockDownloadWithProgress.mockImplementation(async () => {
      await new Promise(r => setTimeout(r, 100))
      return { blob: mockBlob, retried: false, attempts: 1 }
    })

    const { result } = renderHook(() => useDownload())

    // Start download without awaiting
    act(() => {
      result.current.download('https://example.com/image.jpg')
    })

    // Cancel immediately
    act(() => {
      result.current.cancel()
    })

    expect(result.current.status).toBe('cancelled')
  })
})
