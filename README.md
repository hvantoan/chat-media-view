# chat-media-view

Telegram-style image grid for React chat applications.

## Features

- Layouts for 1-5 images (exact Telegram clone)
- Virtual list compatible via `calculateGridHeight()`
- BlurHash/ThumbHash placeholder support
- Download progress tracking
- Keyboard accessible (Tab, Enter, Arrow keys)
- RTL layout support
- Optional lightbox component
- < 5KB gzipped

## Installation

```bash
npm install chat-media-view
```

## Quick Start

```tsx
import { ChatImageGrid, calculateGridHeight } from 'chat-media-view'
import 'chat-media-view/styles.css'

const images = [
  { src: '/photo1.jpg', width: 800, height: 600 },
  { src: '/photo2.jpg', width: 600, height: 800, blurhash: 'LEHV6nWB...' }
]

// For virtual lists - calculate height before rendering
const height = calculateGridHeight(images, 400)

function App() {
  return (
    <ChatImageGrid
      images={images}
      maxWidth={400}
      onImageClick={(index, image) => console.log('Clicked:', index)}
    />
  )
}
```

## API Reference

### ChatImageGrid

Main component for displaying the image grid.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `ImageItem[]` | required | Array of images (1-5) |
| `maxWidth` | `number` | `400` | Maximum grid width in pixels |
| `gap` | `number` | `2` | Gap between images in pixels |
| `borderRadius` | `number` | `12` | Border radius for outer corners |
| `onImageClick` | `(index, image) => void` | - | Click handler |
| `lazyLoad` | `boolean` | `true` | Enable lazy loading |
| `rtl` | `boolean` | `false` | Enable RTL layout |
| `className` | `string` | - | Custom class name |

### ImageItem

```typescript
interface ImageItem {
  src: string          // Image URL (required)
  width: number        // Original width in pixels (required)
  height: number       // Original height in pixels (required)
  thumbnail?: string   // Low-res preview URL
  blurhash?: string    // BlurHash placeholder string
  thumbhash?: string   // ThumbHash placeholder string (preferred)
  alt?: string         // Alt text for accessibility
}
```

### calculateGridHeight

Utility for virtual list integration. Returns the calculated height for a given set of images.

```typescript
function calculateGridHeight(
  images: ImageItem[],
  maxWidth?: number,  // default: 400
  gap?: number        // default: 2
): number
```

### Lightbox (Optional)

Full-screen image viewer. Tree-shakeable - only included if imported.

```tsx
import { Lightbox } from 'chat-media-view'

<Lightbox
  images={images}
  isOpen={isOpen}
  initialIndex={0}
  onClose={() => setIsOpen(false)}
  onIndexChange={(index) => console.log('Current:', index)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `ImageItem[]` | required | Array of images |
| `isOpen` | `boolean` | required | Lightbox visibility |
| `onClose` | `() => void` | required | Close handler |
| `initialIndex` | `number` | `0` | Starting image index |
| `onIndexChange` | `(index) => void` | - | Index change handler |

## Virtual List Integration

Works with react-window, react-virtualized, @tanstack/virtual:

```tsx
import { calculateGridHeight } from 'chat-media-view'

// Calculate row height for virtual list
const getItemSize = (index: number) => {
  const message = messages[index]
  if (message.images) {
    return calculateGridHeight(message.images, 400) + 16 // + padding
  }
  return 60 // text message height
}
```

## Accessibility

- Full keyboard navigation (Tab, Enter/Space, Arrow keys)
- ARIA labels for screen readers
- Focus-visible outlines
- Escape key closes lightbox

## RTL Support

```tsx
<ChatImageGrid images={images} rtl />
```

Layout automatically mirrors for right-to-left languages (Arabic, Hebrew, etc.)

## CSS Customization

Override CSS custom properties:

```css
.chat-image-grid {
  --cmv-bg-placeholder: #e0e0e0;
  --cmv-transition-duration: 0.3s;
  --cmv-accent-color: #007bff;
}
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build library
npm run test         # Run tests
npm run storybook    # Start Storybook
```

## License

MIT
