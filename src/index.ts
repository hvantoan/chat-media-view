// Components
export { ChatImageGrid } from './ChatImageGrid'
export { ImageCell } from './ImageCell'

// Hooks
export { useIntersectionObserver } from './hooks/useIntersectionObserver'

// Layout Engine
export { calculateLayout } from './GridLayoutEngine'
export { calculateGridHeight } from './calculate-grid-height'

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
