/**
 * Base properties shared by all media types
 */
export interface BaseMediaItem {
  /** Source URL of the media */
  src: string
  /** Optional thumbnail URL for low-res preview */
  thumbnail?: string
  /** BlurHash string for placeholder */
  blurhash?: string
  /** Original media width in pixels */
  width: number
  /** Original media height in pixels */
  height: number
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Image media item
 */
export interface ImageMediaItem extends BaseMediaItem {
  type: 'image'
}

/**
 * Video media item
 */
export interface VideoMediaItem extends BaseMediaItem {
  type: 'video'
  /** Video duration in seconds (optional for streaming) */
  duration?: number
  /** Whether video starts muted (default: true for autoplay compat) */
  muted?: boolean
  /** URL of the poster image to display before video loads */
  poster?: string
}

/**
 * Unified media item type - discriminated union
 */
export type MediaItem = ImageMediaItem | VideoMediaItem

/**
 * Props for the ChatMediaGrid component
 */
export interface ChatMediaGridProps {
  /** Array of media items to display (1-5 items) - supports images and videos */
  items?: MediaItem[]
  /** Maximum width of the grid in pixels */
  maxWidth?: number
  /** Gap between images in pixels */
  gap?: number
  /** Border radius for outer corners */
  borderRadius?: number
  /** Callback when a media item is clicked */
  onMediaClick?: (index: number, item: MediaItem) => void
  /** Callback for download progress updates */
  onDownload?: (item: MediaItem, progress: number) => void
  /** Enable lazy loading with Intersection Observer */
  lazyLoad?: boolean
  /** Custom class name for the grid container */
  className?: string
  /** Enable RTL layout */
  rtl?: boolean
  /** Enable lightbox for full-screen media viewing (default: true) */
  enableLightbox?: boolean
  /** Show download button in lightbox (default: true) */
  lightboxShowDownload?: boolean
  /** Show thumbnail strip in lightbox (default: true) */
  lightboxShowThumbnails?: boolean
  /** Show zoom controls for images in lightbox (default: true) */
  lightboxShowZoomControls?: boolean
}

/**
 * Grid layout configuration for a specific image count
 */
export interface GridLayout {
  /** Number of columns */
  columns: number
  /** Number of rows */
  rows: number
  /** Grid template columns CSS value */
  gridTemplateColumns: string
  /** Grid template rows CSS value */
  gridTemplateRows: string
  /** Grid areas for each image position */
  areas: string[][]
}

/**
 * Calculated dimensions for a cell in the grid
 */
export interface CellDimensions {
  /** Cell width in pixels */
  width: number
  /** Cell height in pixels */
  height: number
  /** Grid column start position */
  gridColumn: string
  /** Grid row start position */
  gridRow: string
}

/**
 * Border radius for each corner of a cell
 */
export interface BorderRadius {
  topLeft: number
  topRight: number
  bottomLeft: number
  bottomRight: number
}

/**
 * Layout calculation result for a single cell
 */
export interface CellLayout {
  /** Index of the image in the source array */
  index: number
  /** X position in pixels */
  x: number
  /** Y position in pixels */
  y: number
  /** Cell width in pixels */
  width: number
  /** Cell height in pixels */
  height: number
  /** Border radius for each corner */
  borderRadius: BorderRadius
}

/**
 * Complete grid layout calculation result
 */
export interface GridLayoutResult {
  /** Layout for each cell */
  cells: CellLayout[]
  /** Total grid width in pixels */
  totalWidth: number
  /** Total grid height in pixels */
  totalHeight: number
}

/**
 * Configuration for layout calculations
 */
export interface LayoutConfig {
  /** Maximum grid width in pixels */
  maxWidth: number
  /** Gap between cells in pixels */
  gap: number
  /** Outer corner border radius */
  borderRadius: number
  /** Enable RTL layout */
  rtl?: boolean
}
