import { useState, useCallback, useRef, useEffect } from 'react'
import {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  DownloadProgress,
  DownloadOptions
} from '../DownloadManager'

export type DownloadStatus = 'idle' | 'downloading' | 'completed' | 'cancelled' | 'error'

export interface UseDownloadResult {
  /** Start download and return object URL */
  download: (url: string, options?: Omit<DownloadOptions, 'signal' | 'onProgress'>) => Promise<string>
  /** Cancel current download */
  cancel: () => void
  /** Retry last failed download */
  retry: () => Promise<string | null>
  /** Current download progress */
  progress: DownloadProgress | null
  /** Download status */
  status: DownloadStatus
  /** Error if download failed */
  error: Error | null
  /** Reset state */
  reset: () => void
  /** @deprecated Use status === 'downloading' instead */
  isDownloading: boolean
}

/**
 * Hook for downloading files with progress tracking, cancel, and retry
 * Automatically cleans up object URLs on unmount
 */
export function useDownload(): UseDownloadResult {
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [status, setStatus] = useState<DownloadStatus>('idle')
  const [error, setError] = useState<Error | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const lastUrlRef = useRef<string | null>(null)
  const lastOptionsRef = useRef<Omit<DownloadOptions, 'signal' | 'onProgress'> | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
      if (objectUrlRef.current) {
        revokeImageUrl(objectUrlRef.current)
      }
    }
  }, [])

  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    if (objectUrlRef.current) {
      revokeImageUrl(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setProgress(null)
    setStatus('idle')
    setError(null)
    lastUrlRef.current = null
    lastOptionsRef.current = null
  }, [])

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort()
    setStatus('cancelled')
    setProgress(null)
  }, [])

  const download = useCallback(async (
    url: string,
    options?: Omit<DownloadOptions, 'signal' | 'onProgress'>
  ): Promise<string> => {
    // Cancel any existing download
    abortControllerRef.current?.abort()

    // Revoke previous object URL
    if (objectUrlRef.current) {
      revokeImageUrl(objectUrlRef.current)
      objectUrlRef.current = null
    }

    // Store for retry
    lastUrlRef.current = url
    lastOptionsRef.current = options ?? null

    // Create new abort controller
    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus('downloading')
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    try {
      const result = await downloadWithProgress(url, {
        ...options,
        signal: controller.signal,
        onProgress: setProgress
      })

      const objectUrl = createImageUrl(result.blob)
      objectUrlRef.current = objectUrl
      setStatus('completed')
      return objectUrl

    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setStatus('cancelled')
        throw e
      }

      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      setStatus('error')
      throw err
    }
  }, [])

  const retry = useCallback(async (): Promise<string | null> => {
    if (!lastUrlRef.current) return null
    return download(lastUrlRef.current, lastOptionsRef.current ?? undefined)
  }, [download])

  return {
    download,
    cancel,
    retry,
    progress,
    status,
    error,
    reset,
    // Backwards compat
    isDownloading: status === 'downloading'
  }
}
