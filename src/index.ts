// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'
export { PlaceholderCanvas } from './PlaceholderCanvas'
export { Lightbox, type LightboxProps } from './Lightbox'

// Hooks
export { useIntersectionObserver } from './hooks/useIntersectionObserver'
export { useDownload } from './hooks/useDownload'

// Layout Engine
export { calculateLayout } from './GridLayoutEngine'
export { calculateGridHeight } from './calculate-grid-height'

// Download Manager
export {
  downloadWithProgress,
  createImageUrl,
  revokeImageUrl,
  type DownloadProgress,
  type ProgressCallback
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
  GridLayout,
  CellDimensions,
  BorderRadius,
  CellLayout,
  GridLayoutResult,
  LayoutConfig,
} from './types'
