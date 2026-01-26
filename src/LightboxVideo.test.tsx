import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LightboxVideo } from './LightboxVideo'
import type { VideoMediaItem } from './types'

const mockVideo: VideoMediaItem = {
  type: 'video',
  src: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumb.jpg',
  width: 1920,
  height: 1080,
  duration: 60,
  alt: 'Test video'
}

describe('LightboxVideo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders video element with correct src', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl).toBeInTheDocument()
    expect(videoEl.src).toBe('https://example.com/video.mp4')
  })

  it('applies correct video attributes', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl).toHaveAttribute('controls')
    expect(videoEl).toHaveAttribute('autoPlay')
    expect(videoEl).toHaveAttribute('playsInline')
  })

  it('sets muted to true by default', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.muted).toBe(true)
  })

  it('respects muted prop when set to false', () => {
    const videoUnmuted = { ...mockVideo, muted: false }
    render(<LightboxVideo video={videoUnmuted} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.muted).toBe(false)
  })

  it('sets loop to false by default', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.loop).toBe(false)
  })

  it('respects loop prop when set to true', () => {
    const videoLooping = { ...mockVideo, loop: true }
    render(<LightboxVideo video={videoLooping} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.loop).toBe(true)
  })

  it('sets poster when provided', () => {
    const videoWithPoster = { ...mockVideo, poster: 'https://example.com/custom-poster.jpg' }
    render(<LightboxVideo video={videoWithPoster} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.poster).toBe('https://example.com/custom-poster.jpg')
  })

  it('does not set poster when not provided', () => {
    const videoNoPoster = { ...mockVideo, poster: undefined }
    render(<LightboxVideo video={videoNoPoster} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.poster).toBe('')
  })

  it('applies correct CSS class', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl).toHaveClass('chat-lightbox__video')
  })

  it('stops propagation on video click', () => {
    const onClick = vi.fn()
    render(
      <div onClick={onClick}>
        <LightboxVideo video={mockVideo} isActive={true} />
      </div>
    )
    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.click(videoEl)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('pauses video when isActive becomes false', async () => {
    const { rerender } = render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement

    // Mock play to resolve
    videoEl.play = vi.fn().mockResolvedValue(undefined)
    // paused is a getter, so we need to use Object.defineProperty
    Object.defineProperty(videoEl, 'paused', { value: false, configurable: true })

    rerender(<LightboxVideo video={mockVideo} isActive={false} />)

    await waitFor(() => {
      expect(videoEl.pause).toHaveBeenCalled()
    })
  })

  it('does not pause video when already paused and isActive becomes false', () => {
    const { rerender } = render(<LightboxVideo video={mockVideo} isActive={true} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    videoEl.pause = vi.fn()
    // paused is a getter, so we need to use Object.defineProperty
    Object.defineProperty(videoEl, 'paused', { value: true, configurable: true })

    rerender(<LightboxVideo video={mockVideo} isActive={false} />)

    expect(videoEl.pause).not.toHaveBeenCalled()
  })

  it('attempts to play video when isActive becomes true', async () => {
    const { rerender } = render(<LightboxVideo video={mockVideo} isActive={false} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    videoEl.play = vi.fn().mockResolvedValue(undefined)

    rerender(<LightboxVideo video={mockVideo} isActive={true} />)

    await waitFor(() => {
      expect(videoEl.play).toHaveBeenCalled()
    })
  })

  it('handles autoplay blocked gracefully', async () => {
    const { rerender } = render(<LightboxVideo video={mockVideo} isActive={false} />)
    const videoEl = document.querySelector('video') as HTMLVideoElement
    videoEl.play = vi.fn().mockRejectedValue(new Error('Autoplay blocked'))

    // Should not throw
    rerender(<LightboxVideo video={mockVideo} isActive={true} />)

    await waitFor(() => {
      expect(videoEl.play).toHaveBeenCalled()
    })
  })

  it('shows fallback text for unsupported browsers', () => {
    render(<LightboxVideo video={mockVideo} isActive={true} />)
    expect(screen.getByText('Your browser does not support video playback.')).toBeInTheDocument()
  })
})
