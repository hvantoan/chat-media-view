import type { ImageItem } from './types'

/**
 * Generate ARIA label for an image in the grid
 */
export function getAriaLabel(image: ImageItem, index: number, total: number): string {
  const base = image.alt ?? `Image ${index + 1}`
  return `${base}, ${index + 1} of ${total}`
}

/**
 * Handle keyboard navigation within a grid or lightbox
 */
export function handleKeyboardNav(
  event: KeyboardEvent,
  currentIndex: number,
  totalCount: number,
  onSelect: (index: number) => void
): void {
  const { key } = event

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    event.preventDefault()
    const next = (currentIndex + 1) % totalCount
    onSelect(next)
  } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
    event.preventDefault()
    const prev = (currentIndex - 1 + totalCount) % totalCount
    onSelect(prev)
  } else if (key === 'Home') {
    event.preventDefault()
    onSelect(0)
  } else if (key === 'End') {
    event.preventDefault()
    onSelect(totalCount - 1)
  }
}
