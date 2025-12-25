import { calculateLayout } from './GridLayoutEngine'
import type { ImageItem } from './types'

/**
 * Calculate the total height of a grid layout for virtual list integration.
 * This is a pure function that can be called before rendering to determine
 * the space needed for the grid.
 *
 * @param images Array of images (1-5)
 * @param maxWidth Maximum width of the grid in pixels (default: 400)
 * @param gap Gap between images in pixels (default: 2)
 * @returns Total grid height in pixels
 *
 * @example
 * ```tsx
 * // With react-window
 * const itemSize = (index: number) => {
 *   const message = messages[index]
 *   if (message.images) {
 *     return calculateGridHeight(message.images, 400) + padding
 *   }
 *   return defaultHeight
 * }
 * ```
 */
export function calculateGridHeight(
  images: ImageItem[],
  maxWidth = 400,
  gap = 2
): number {
  if (images.length === 0) return 0
  const layout = calculateLayout(images, { maxWidth, gap })
  return layout.totalHeight
}
