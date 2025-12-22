import { describe, it, expect } from 'vitest'
import { ChatImageGrid, calculateGridHeight } from './index'
import type { ImageItem } from './types'

describe('chat-media-view exports', () => {
  it('exports ChatImageGrid component', () => {
    expect(ChatImageGrid).toBeDefined()
    expect(typeof ChatImageGrid).toBe('function')
  })

  it('exports calculateGridHeight utility', () => {
    expect(calculateGridHeight).toBeDefined()
    expect(typeof calculateGridHeight).toBe('function')
  })

  it('calculateGridHeight returns a number', () => {
    const images: ImageItem[] = [
      { src: 'test.jpg', width: 100, height: 100 },
    ]
    const result = calculateGridHeight(images, 400)
    expect(typeof result).toBe('number')
  })
})
