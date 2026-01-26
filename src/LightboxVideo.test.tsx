import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { LightboxVideo } from './LightboxVideo'
import type { VideoMediaItem } from './types'

const mockVideo: VideoMediaItem = {
  type: 'video',
  src: 'https://example.com/video.mp4',
  width: 1920,
  height: 1080,
  alt: 'Test video'
}

describe('LightboxVideo', () => {
  beforeEach(() => {
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
    HTMLMediaElement.prototype.pause = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('video attributes', () => {
    it('renders video element with correct attributes', () => {
      render(<LightboxVideo video={mockVideo} isActive={true} />)
      const videoEl = document.querySelector('video') as HTMLVideoElement
      expect(videoEl).toBeInTheDocument()
      expect(videoEl.src).toContain('video.mp4')
      expect(videoEl.autoplay).toBe(true)
      expect(videoEl.muted).toBe(true)
    })

    it('sets loop to true by default', () => {
      render(<LightboxVideo video={mockVideo} isActive={true} />)
      const videoEl = document.querySelector('video') as HTMLVideoElement
      expect(videoEl.loop).toBe(true)
    })

    it('respects loop=false from video prop', () => {
      const videoNoLoop = { ...mockVideo, loop: false }
      render(<LightboxVideo video={videoNoLoop} isActive={true} />)
      const videoEl = document.querySelector('video') as HTMLVideoElement
      expect(videoEl.loop).toBe(false)
    })

    it('respects muted prop', () => {
      const videoUnmuted = { ...mockVideo, muted: false }
      render(<LightboxVideo video={videoUnmuted} isActive={true} />)
      const videoEl = document.querySelector('video') as HTMLVideoElement
      expect(videoEl.muted).toBe(false)
    })
  })

  describe('playback behavior', () => {
    it('autoplays when active', () => {
      render(<LightboxVideo video={mockVideo} isActive={true} />)
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
    })

    it('pauses when becoming inactive', () => {
      const { rerender } = render(<LightboxVideo video={mockVideo} isActive={true} />)

      const videoEl = document.querySelector('video') as HTMLVideoElement
      Object.defineProperty(videoEl, 'paused', { value: false, configurable: true })

      rerender(<LightboxVideo video={mockVideo} isActive={false} />)
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    })
  })

  describe('interactions', () => {
    it('stops propagation on click', () => {
      const parentClick = vi.fn()
      render(
        <div onClick={parentClick}>
          <LightboxVideo video={mockVideo} isActive={true} />
        </div>
      )
      const videoEl = document.querySelector('video') as HTMLVideoElement
      fireEvent.click(videoEl)
      expect(parentClick).not.toHaveBeenCalled()
    })
  })
})
