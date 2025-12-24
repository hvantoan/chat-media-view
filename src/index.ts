// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'
export { VideoCell } from './VideoCell'
export { MediaCell } from './MediaCell'
export { PlayIcon } from './PlayIcon'
export { PlaceholderCanvas } from './PlaceholderCanvas'
export { Lightbox, type LightboxProps } from './Lightbox'
export { LightboxVideo } from './LightboxVideo'
export { LightboxZoomControls } from './LightboxZoomControls'
export {
  CloseIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon
} from './LightboxIcons'

// Hooks
export { useIntersectionObserver } from './hooks/useIntersectionObserver'
export { useVideoVisibility } from './hooks/useVideoVisibility'
export { useDownload, type DownloadStatus, type UseDownloadResult } from './hooks/useDownload'
export { useZoom, type UseZoomOptions, type UseZoomResult } from './hooks/useZoom'

// Layout Engine
export { calculateLayout } from './GridLayoutEngine'
export { calculateGridHeight } from './calculate-grid-height'

// Download Manager
export {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  type DownloadProgress,
  type ProgressCallback,
  type DownloadOptions,
  type DownloadResult
} from './DownloadManager'

// ThumbHash utilities
export {
  thumbHashToRGBA,
  thumbHashToDataURL,
  base64ToBytes
} from './thumbhash'

// Accessibility utilities
export { getAriaLabel, handleKeyboardNav } from './accessibility'

// Types
export type {
  ChatImageGridProps,
  ImageItem,
  MediaItem,
  ImageMediaItem,
  VideoMediaItem,
  BaseMediaItem,
  GridLayout,
  CellDimensions,
  BorderRadius,
  CellLayout,
  GridLayoutResult,
  LayoutConfig,
} from './types'
