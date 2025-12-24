import type { UseZoomResult } from './hooks/useZoom'
import { ZoomInIcon, ZoomOutIcon } from './LightboxIcons'

interface LightboxZoomControlsProps {
  zoom: UseZoomResult
}

/**
 * Zoom controls component with +/- buttons and percentage display
 * Clicking percentage resets zoom to 100%
 */
export function LightboxZoomControls({ zoom }: LightboxZoomControlsProps) {
  return (
    <div className="chat-lightbox__pill chat-lightbox__pill--interactive">
      <button
        className="chat-lightbox__pill-btn"
        onClick={zoom.zoomOut}
        disabled={!zoom.canZoomOut}
        aria-label="Zoom out"
        type="button"
      >
        <ZoomOutIcon />
      </button>
      <span
        className="chat-lightbox__zoom-value"
        onClick={zoom.resetZoom}
        role="button"
        tabIndex={0}
        aria-label={`Current zoom: ${zoom.zoomPercent}. Click to reset.`}
        onKeyDown={(e) => e.key === 'Enter' && zoom.resetZoom()}
      >
        {zoom.zoomPercent}
      </span>
      <button
        className="chat-lightbox__pill-btn"
        onClick={zoom.zoomIn}
        disabled={!zoom.canZoomIn}
        aria-label="Zoom in"
        type="button"
      >
        <ZoomInIcon />
      </button>
    </div>
  )
}
