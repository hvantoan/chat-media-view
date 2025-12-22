import { useState, useCallback, useRef, useEffect } from 'react'
import {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  DownloadProgress
} from '../DownloadManager'

export interface UseDownloadResult {
  /** Start download and return object URL */
  download: (url: string) => Promise<string>
  /** Current download progress */
  progress: DownloadProgress | null
  /** Whether download is in progress */
  isDownloading: boolean
  /** Error if download failed */
  error: Error | null
  /** Reset state for retry */
  reset: () => void
}

/**
 * Hook for downloading images with progress tracking
 * Automatically cleans up object URLs on unmount
 */
export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        revokeImageUrl(objectUrlRef.current)
      }
    }
  }, [])

  const reset = useCallback(() => {
    setProgress(null)
    setError(null)
    setIsDownloading(false)
  }, [])

  const download = useCallback(async (url: string): Promise<string> => {
    setIsDownloading(true)
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const blob = await downloadWithProgress(url, setProgress)
      const objectUrl = createImageUrl(blob)
      objectUrlRef.current = objectUrl
      return objectUrl
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      throw err
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { download, progress, isDownloading, error, reset }
}
