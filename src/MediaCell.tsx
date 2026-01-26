import type { ReactNode } from 'react'
import { ImageCell } from './ImageCell'
import { VideoCell } from './VideoCell'
import type { MediaItem, CellLayout } from './types'

interface MediaCellProps {
  item: MediaItem
  layout: CellLayout
  lazyLoad: boolean
  onClick?: () => void
}

/**
 * Wrapper component that renders appropriate cell based on media type
 */
export function MediaCell({ item, layout, lazyLoad, onClick }: MediaCellProps): ReactNode {
  if (item.type === 'video') {
    return (
      <VideoCell
        video={item}
        layout={layout}
        lazyLoad={lazyLoad}
        onClick={onClick}
      />
    )
  }

  // Default to image (handles inferred type)
  return (
    <ImageCell
      image={item}
      layout={layout}
      lazyLoad={lazyLoad}
      onClick={onClick}
    />
  )
}
