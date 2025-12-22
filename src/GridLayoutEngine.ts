import type {
  ImageItem,
  CellLayout,
  GridLayoutResult,
  LayoutConfig,
  BorderRadius,
} from './types'

/** Default layout configuration */
const DEFAULT_CONFIG: LayoutConfig = {
  maxWidth: 400,
  gap: 2,
  borderRadius: 12,
}

/** Safe aspect ratio calculation with fallback for invalid dimensions */
function getAspectRatio(width: number, height: number): number {
  if (height <= 0 || width <= 0) return 1
  return width / height
}

/**
 * Calculate grid layout for 1-5 images
 * @param images Array of images (1-5)
 * @param config Optional layout configuration
 * @returns Grid layout with cell positions and dimensions
 */
export function calculateLayout(
  images: ImageItem[],
  config: Partial<LayoutConfig> = {}
): GridLayoutResult {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const count = Math.min(images.length, 5)

  let result: GridLayoutResult
  switch (count) {
    case 1:
      result = layoutSingle(images, cfg)
      break
    case 2:
      result = layoutTwo(images, cfg)
      break
    case 3:
      result = layoutThree(images, cfg)
      break
    case 4:
      result = layoutFour(images, cfg)
      break
    case 5:
      result = layoutFive(images, cfg)
      break
    default:
      result = { cells: [], totalWidth: 0, totalHeight: 0 }
  }

  // Apply RTL transformation if enabled
  if (cfg.rtl) {
    result.cells = result.cells.map(cell => ({
      ...cell,
      x: cfg.maxWidth - cell.x - cell.width,
      borderRadius: {
        topLeft: cell.borderRadius.topRight,
        topRight: cell.borderRadius.topLeft,
        bottomLeft: cell.borderRadius.bottomRight,
        bottomRight: cell.borderRadius.bottomLeft
      }
    }))
  }

  return result
}

/** Create BorderRadius with all corners set to same value */
function allCorners(radius: number): BorderRadius {
  return { topLeft: radius, topRight: radius, bottomLeft: radius, bottomRight: radius }
}

/** Get corner radius based on position in 2x2 grid */
function getCornerRadius(index: number, total: number, radius: number): BorderRadius {
  const br: BorderRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
  if (total === 4) {
    if (index === 0) br.topLeft = radius
    if (index === 1) br.topRight = radius
    if (index === 2) br.bottomLeft = radius
    if (index === 3) br.bottomRight = radius
  }
  return br
}

/**
 * Layout for single image - full width, aspect ratio preserved
 */
function layoutSingle(images: ImageItem[], cfg: LayoutConfig): GridLayoutResult {
  const img = images[0]
  if (!img) {
    return { cells: [], totalWidth: 0, totalHeight: 0 }
  }
  const aspectRatio = getAspectRatio(img.width, img.height)
  const width = cfg.maxWidth
  // Limit height to 1.2x max width for very tall images
  const height = Math.min(width / aspectRatio, cfg.maxWidth * 1.2)

  return {
    cells: [
      {
        index: 0,
        x: 0,
        y: 0,
        width,
        height,
        borderRadius: allCorners(cfg.borderRadius),
      },
    ],
    totalWidth: width,
    totalHeight: height,
  }
}

/**
 * Layout for 2 images - side by side, 50/50 split
 */
function layoutTwo(images: ImageItem[], cfg: LayoutConfig): GridLayoutResult {
  const img0 = images[0]
  const img1 = images[1]
  if (!img0 || !img1) {
    return { cells: [], totalWidth: 0, totalHeight: 0 }
  }
  const cellWidth = (cfg.maxWidth - cfg.gap) / 2
  const minAspect = Math.min(
    getAspectRatio(img0.width, img0.height),
    getAspectRatio(img1.width, img1.height)
  )
  // Limit height to 0.6x max width
  const height = Math.min(cellWidth / minAspect, cfg.maxWidth * 0.6)

  return {
    cells: [
      {
        index: 0,
        x: 0,
        y: 0,
        width: cellWidth,
        height,
        borderRadius: {
          topLeft: cfg.borderRadius,
          topRight: 0,
          bottomLeft: cfg.borderRadius,
          bottomRight: 0,
        },
      },
      {
        index: 1,
        x: cellWidth + cfg.gap,
        y: 0,
        width: cellWidth,
        height,
        borderRadius: {
          topLeft: 0,
          topRight: cfg.borderRadius,
          bottomLeft: 0,
          bottomRight: cfg.borderRadius,
        },
      },
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: height,
  }
}

/**
 * Layout for 3 images - 66% left + 33% right (2 stacked)
 */
function layoutThree(images: ImageItem[], cfg: LayoutConfig): GridLayoutResult {
  const img0 = images[0]
  if (!img0) {
    return { cells: [], totalWidth: 0, totalHeight: 0 }
  }
  const leftWidth = (cfg.maxWidth - cfg.gap) * 0.66
  const rightWidth = cfg.maxWidth - leftWidth - cfg.gap
  const leftAspect = getAspectRatio(img0.width, img0.height)
  // Limit height to 0.8x max width
  const leftHeight = Math.min(leftWidth / leftAspect, cfg.maxWidth * 0.8)
  const rightCellHeight = (leftHeight - cfg.gap) / 2

  return {
    cells: [
      {
        index: 0,
        x: 0,
        y: 0,
        width: leftWidth,
        height: leftHeight,
        borderRadius: {
          topLeft: cfg.borderRadius,
          topRight: 0,
          bottomLeft: cfg.borderRadius,
          bottomRight: 0,
        },
      },
      {
        index: 1,
        x: leftWidth + cfg.gap,
        y: 0,
        width: rightWidth,
        height: rightCellHeight,
        borderRadius: {
          topLeft: 0,
          topRight: cfg.borderRadius,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        index: 2,
        x: leftWidth + cfg.gap,
        y: rightCellHeight + cfg.gap,
        width: rightWidth,
        height: rightCellHeight,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 0,
          bottomRight: cfg.borderRadius,
        },
      },
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: leftHeight,
  }
}

/**
 * Layout for 4 images - 2x2 grid
 */
function layoutFour(_images: ImageItem[], cfg: LayoutConfig): GridLayoutResult {
  const cellSize = (cfg.maxWidth - cfg.gap) / 2
  const cells: CellLayout[] = []

  for (let i = 0; i < 4; i++) {
    const row = Math.floor(i / 2)
    const col = i % 2
    cells.push({
      index: i,
      x: col * (cellSize + cfg.gap),
      y: row * (cellSize + cfg.gap),
      width: cellSize,
      height: cellSize,
      borderRadius: getCornerRadius(i, 4, cfg.borderRadius),
    })
  }

  return {
    cells,
    totalWidth: cfg.maxWidth,
    totalHeight: cellSize * 2 + cfg.gap,
  }
}

/**
 * Layout for 5 images - 2 top + 3 bottom
 */
function layoutFive(_images: ImageItem[], cfg: LayoutConfig): GridLayoutResult {
  const topCellWidth = (cfg.maxWidth - cfg.gap) / 2
  const bottomCellWidth = (cfg.maxWidth - cfg.gap * 2) / 3
  const rowHeight = cfg.maxWidth * 0.3

  return {
    cells: [
      // Top row (2 images)
      {
        index: 0,
        x: 0,
        y: 0,
        width: topCellWidth,
        height: rowHeight,
        borderRadius: {
          topLeft: cfg.borderRadius,
          topRight: 0,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        index: 1,
        x: topCellWidth + cfg.gap,
        y: 0,
        width: topCellWidth,
        height: rowHeight,
        borderRadius: {
          topLeft: 0,
          topRight: cfg.borderRadius,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      // Bottom row (3 images)
      {
        index: 2,
        x: 0,
        y: rowHeight + cfg.gap,
        width: bottomCellWidth,
        height: rowHeight,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: cfg.borderRadius,
          bottomRight: 0,
        },
      },
      {
        index: 3,
        x: bottomCellWidth + cfg.gap,
        y: rowHeight + cfg.gap,
        width: bottomCellWidth,
        height: rowHeight,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        index: 4,
        x: (bottomCellWidth + cfg.gap) * 2,
        y: rowHeight + cfg.gap,
        width: bottomCellWidth,
        height: rowHeight,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 0,
          bottomRight: cfg.borderRadius,
        },
      },
    ],
    totalWidth: cfg.maxWidth,
    totalHeight: rowHeight * 2 + cfg.gap,
  }
}
