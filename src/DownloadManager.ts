/**
 * Download progress information
 */
export interface DownloadProgress {
  /** Bytes loaded so far */
  loaded: number
  /** Total bytes (0 if unknown) */
  total: number
  /** Percentage complete (0-100) */
  percentage: number
}

export type ProgressCallback = (progress: DownloadProgress) => void

/**
 * Download file with progress tracking via ReadableStream
 * Falls back to regular blob() if Content-Length missing or no stream support
 */
export async function downloadWithProgress(
  url: string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const contentLength = response.headers.get('Content-Length')
  const total = contentLength ? parseInt(contentLength, 10) : 0

  // Fallback if no Content-Length or no ReadableStream
  if (!total || !response.body) {
    return response.blob()
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let loaded = 0

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    chunks.push(value)
    loaded += value.length

    onProgress?.({
      loaded,
      total,
      percentage: Math.round((loaded / total) * 100)
    })
  }

  // Combine all chunks into a single Uint8Array to avoid TypeScript strict issues
  const combined = new Uint8Array(loaded)
  let offset = 0
  for (const chunk of chunks) {
    combined.set(chunk, offset)
    offset += chunk.length
  }

  return new Blob([combined], {
    type: response.headers.get('Content-Type') || 'image/jpeg'
  })
}

/**
 * Create object URL from downloaded blob and revoke on cleanup
 */
export function createImageUrl(blob: Blob): string {
  return URL.createObjectURL(blob)
}

/**
 * Revoke object URL to free memory
 */
export function revokeImageUrl(url: string): void {
  URL.revokeObjectURL(url)
}
