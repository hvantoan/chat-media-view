import { describe, expect, it, vi } from 'vitest'
import { getAriaLabel, handleKeyboardNav } from './accessibility'

describe('getAriaLabel', () => {
  it('returns label with alt text when provided', () => {
    const image = { src: 'test.jpg', width: 100, height: 100, alt: 'Test image' }
    expect(getAriaLabel(image, 0, 3)).toBe('Test image, 1 of 3')
  })

  it('returns default label when alt is undefined', () => {
    const image = { src: 'test.jpg', width: 100, height: 100 }
    expect(getAriaLabel(image, 2, 5)).toBe('Image 3, 3 of 5')
  })
})

describe('handleKeyboardNav', () => {
  it('navigates to next on ArrowRight', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    vi.spyOn(event, 'preventDefault')
    handleKeyboardNav(event, 0, 3, onSelect)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('wraps to first on ArrowRight at end', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    handleKeyboardNav(event, 2, 3, onSelect)
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('navigates to next on ArrowDown', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    handleKeyboardNav(event, 1, 5, onSelect)
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('navigates to prev on ArrowLeft', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    handleKeyboardNav(event, 1, 3, onSelect)
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('wraps to last on ArrowLeft at start', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    handleKeyboardNav(event, 0, 3, onSelect)
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('navigates to prev on ArrowUp', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    handleKeyboardNav(event, 2, 5, onSelect)
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('navigates to first on Home', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'Home' })
    handleKeyboardNav(event, 3, 5, onSelect)
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('navigates to last on End', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'End' })
    handleKeyboardNav(event, 1, 5, onSelect)
    expect(onSelect).toHaveBeenCalledWith(4)
  })

  it('does nothing for other keys', () => {
    const onSelect = vi.fn()
    const event = new KeyboardEvent('keydown', { key: 'a' })
    handleKeyboardNav(event, 1, 5, onSelect)
    expect(onSelect).not.toHaveBeenCalled()
  })
})
