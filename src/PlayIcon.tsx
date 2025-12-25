interface PlayIconProps {
  size?: number
  className?: string
}

/**
 * SVG play button icon with semi-transparent circle background
 */
export function PlayIcon({ size = 48, className }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.6)" />
      <path d="M19 15 L35 24 L19 33 Z" fill="white" />
    </svg>
  )
}
