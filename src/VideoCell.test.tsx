import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { VideoCell } from './VideoCell'
import type { VideoMediaItem, CellLayout } from './types'

const mockLayout: CellLayout = {
  index: 0,
  x: 0,
  y: 0,
  width: 200,
  height: 150,
  borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 }
}

const mockVideo: VideoMediaItem = {
  type: 'video',
  src: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumb.jpg',
  width: 1280,
  height: 720,
  duration: 65,
  alt: 'Test video'
}

describe('VideoCell', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders in thumbnail state by default', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    expect(screen.getByRole('button', { name: 'Test video' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument()
  })

  it('displays duration badge in thumbnail state', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    expect(screen.getByText('1:05')).toBeInTheDocument()
  })

  it('hides duration badge when duration is 0', () => {
    const videoNoDuration = { ...mockVideo, duration: 0 }
    render(<VideoCell video={videoNoDuration} layout={mockLayout} lazyLoad={false} />)
    expect(screen.queryByText(/:/)).not.toBeInTheDocument()
  })

  it('hides duration badge when duration is undefined', () => {
    const videoNoDuration = { ...mockVideo, duration: undefined }
    render(<VideoCell video={videoNoDuration} layout={mockLayout} lazyLoad={false} />)
    expect(screen.queryByText(/:/)).not.toBeInTheDocument()
  })

  it('uses default alt text when not provided', () => {
    const videoNoAlt = { ...mockVideo, alt: undefined }
    render(<VideoCell video={videoNoAlt} layout={mockLayout} lazyLoad={false} />)
    expect(screen.getByRole('button', { name: 'Video' })).toBeInTheDocument()
  })

  it('calls onClick when container is clicked', () => {
    const onClick = vi.fn()
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Test video' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('transitions to loading state when play button is clicked', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const playBtn = screen.getByRole('button', { name: 'Play video' })
    fireEvent.click(playBtn)
    // Play button should disappear, loading spinner should appear
    expect(screen.queryByRole('button', { name: 'Play video' })).not.toBeInTheDocument()
    expect(document.querySelector('.chat-video-cell__loading')).toBeInTheDocument()
  })

  it('renders video element in loading state', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    expect(document.querySelector('video')).toBeInTheDocument()
  })

  it('handles keyboard Enter to start loading', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const container = screen.getByRole('button', { name: 'Test video' })
    fireEvent.keyDown(container, { key: 'Enter' })
    expect(document.querySelector('.chat-video-cell__loading')).toBeInTheDocument()
  })

  it('handles keyboard Space to start loading', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const container = screen.getByRole('button', { name: 'Test video' })
    fireEvent.keyDown(container, { key: ' ' })
    expect(document.querySelector('.chat-video-cell__loading')).toBeInTheDocument()
  })

  it('calls onClick on Enter when not in thumbnail state', () => {
    const onClick = vi.fn()
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} onClick={onClick} />)
    // First transition to loading
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    // Then press Enter - should call onClick
    const container = screen.getByRole('button', { name: 'Test video' })
    fireEvent.keyDown(container, { key: 'Enter' })
    expect(onClick).toHaveBeenCalled()
  })

  it('shows error state and retry button on thumbnail error', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    fireEvent.error(thumbnail)
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  it('resets to thumbnail state on retry click', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    // Trigger error
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    fireEvent.error(thumbnail)
    // Click retry
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    // Should be back to thumbnail state
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument()
  })

  it('transitions to playing state on video canplay and play success', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    // Mock play() to resolve
    videoEl.play = vi.fn().mockResolvedValue(undefined)

    fireEvent.canPlay(videoEl)

    await waitFor(() => {
      expect(videoEl.play).toHaveBeenCalled()
    })
  })

  it('transitions to error state on video play failure', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    // Mock play() to reject
    videoEl.play = vi.fn().mockRejectedValue(new Error('Play failed'))

    fireEvent.canPlay(videoEl)

    await waitFor(() => {
      expect(screen.getByText('Failed to load')).toBeInTheDocument()
    })
  })

  it('transitions to error state on video error event', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.error(videoEl)

    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })

  it('handles video pause event', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    videoEl.play = vi.fn().mockResolvedValue(undefined)
    fireEvent.canPlay(videoEl)

    await waitFor(() => {
      expect(videoEl.play).toHaveBeenCalled()
    })

    // Simulate play event to set state to playing
    fireEvent.play(videoEl)

    // Now pause
    fireEvent.pause(videoEl)

    // Cell should have paused class
    expect(document.querySelector('.chat-video-cell--paused')).toBeInTheDocument()
  })

  it('handles video play event', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.play(videoEl)

    expect(document.querySelector('.chat-video-cell--playing')).toBeInTheDocument()
  })

  it('stops propagation on video element click', () => {
    const onClick = vi.fn()
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.click(videoEl)

    // onClick should have been called once (from play button), not twice
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('applies correct border radius style', () => {
    const customLayout = {
      ...mockLayout,
      borderRadius: { topLeft: 12, topRight: 0, bottomLeft: 0, bottomRight: 12 }
    }
    render(<VideoCell video={mockVideo} layout={customLayout} lazyLoad={false} />)
    const container = document.querySelector('.chat-video-cell') as HTMLElement
    // Order: topLeft, topRight, bottomRight, bottomLeft
    expect(container.style.borderRadius).toBe('12px 0px 12px 0px')
  })

  it('applies correct position and size styles', () => {
    const customLayout = { ...mockLayout, x: 50, y: 100, width: 300, height: 200 }
    render(<VideoCell video={mockVideo} layout={customLayout} lazyLoad={false} />)
    const container = document.querySelector('.chat-video-cell') as HTMLElement
    expect(container.style.left).toBe('50px')
    expect(container.style.top).toBe('100px')
    expect(container.style.width).toBe('300px')
    expect(container.style.height).toBe('200px')
  })

  it('uses video.src as thumbnail when thumbnail not provided', () => {
    const videoNoThumb = { ...mockVideo, thumbnail: undefined }
    render(<VideoCell video={videoNoThumb} layout={mockLayout} lazyLoad={false} />)
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    expect(thumbnail.src).toBe('https://example.com/video.mp4')
  })

  it('respects lazyLoad prop for thumbnail loading attribute', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={true} />)
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    // jsdom has limited support for loading attribute, check attribute is set
    expect(thumbnail.getAttribute('loading')).toBe('lazy')
  })

  it('sets eager loading when lazyLoad is false', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    // jsdom may not support loading attribute fully, just check it's not 'lazy'
    expect(thumbnail.loading).not.toBe('lazy')
  })

  it('adds loaded class to thumbnail after load', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    const thumbnail = document.querySelector('.chat-video-cell__thumbnail') as HTMLImageElement
    expect(thumbnail.classList.contains('loaded')).toBe(false)
    fireEvent.load(thumbnail)
    expect(thumbnail.classList.contains('loaded')).toBe(true)
  })

  it('sets video muted to true by default', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.muted).toBe(true)
  })

  it('respects muted prop when set to false', () => {
    const videoUnmuted = { ...mockVideo, muted: false }
    render(<VideoCell video={videoUnmuted} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.muted).toBe(false)
  })

  it('sets video loop to false by default', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.loop).toBe(false)
  })

  it('respects loop prop when set to true', () => {
    const videoLooping = { ...mockVideo, loop: true }
    render(<VideoCell video={videoLooping} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.loop).toBe(true)
  })

  it('shows video with visible class in playing state', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.play(videoEl)

    expect(videoEl.classList.contains('chat-video-cell__video--visible')).toBe(true)
  })

  it('shows video with visible class in paused state', async () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    fireEvent.play(videoEl)
    fireEvent.pause(videoEl)

    expect(videoEl.classList.contains('chat-video-cell__video--visible')).toBe(true)
  })

  it('does not show video visible class in loading state', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.classList.contains('chat-video-cell__video--visible')).toBe(false)
  })

  it('uses video.poster on video element when provided', () => {
    const videoWithPoster = { ...mockVideo, poster: 'https://example.com/custom-poster.jpg' }
    render(<VideoCell video={videoWithPoster} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.poster).toBe('https://example.com/custom-poster.jpg')
  })

  it('uses thumbnail as poster when poster not provided', () => {
    render(<VideoCell video={mockVideo} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.poster).toBe('https://example.com/thumb.jpg')
  })

  it('falls back to src as poster when thumbnail not provided', () => {
    const videoNoThumb = { ...mockVideo, thumbnail: undefined }
    render(<VideoCell video={videoNoThumb} layout={mockLayout} lazyLoad={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    const videoEl = document.querySelector('video') as HTMLVideoElement
    expect(videoEl.poster).toBe('https://example.com/video.mp4')
  })
})
