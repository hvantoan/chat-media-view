/**
 * Props for a single image in the grid
 */
export interface ImageItem {
  /** Source URL of the image */
  src: string
  /** Optional thumbnail URL for low-res preview */
  thumbnail?: string
  /** BlurHash string for placeholder */
  blurhash?: string
  /** ThumbHash string for placeholder (preferred over blurhash) */
  thumbhash?: string
  /** Original image width in pixels */
  width: number
  /** Original image height in pixels */
  height: number
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Props for the ChatImageGrid component
 */
export interface ChatImageGridProps {
  /** Array of images to display (1-5 images) */
  images: ImageItem[]
  /** Maximum width of the grid in pixels */
  maxWidth?: number
  /** Gap between images in pixels */
  gap?: number
  /** Border radius for outer corners */
  borderRadius?: number
  /** Callback when an image is clicked */
  onImageClick?: (index: number, image: ImageItem) => void
  /** Callback for download progress updates */
  onDownload?: (image: ImageItem, progress: number) => void
  /** Enable lazy loading with Intersection Observer */
  lazyLoad?: boolean
  /** Custom class name for the grid container */
  className?: string
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
