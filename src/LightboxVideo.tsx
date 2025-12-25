import { useRef, useEffect } from 'react'
import type { VideoMediaItem } from './types'

interface LightboxVideoProps {
  video: VideoMediaItem
  isActive: boolean
}

/**
 * Video player for lightbox - handles autoplay/pause based on active state
 */
export function LightboxVideo({ video, isActive }: LightboxVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Pause when not active (navigated away)
  useEffect(() => {
    if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }, [isActive])

  // Autoplay when becomes active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - user must interact
      })
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      className="chat-lightbox__video"
      src={video.src}
      controls
      autoPlay
      muted={video.muted ?? true}
      playsInline
      onClick={(e) => e.stopPropagation()}
    >
      Your browser does not support video playback.
    </video>
  )
}
