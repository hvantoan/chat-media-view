# chat-media-view

`chat-media-view` is an npm library designed to provide a flexible and efficient solution for displaying media in chat applications. It offers a responsive grid layout for images and videos, with features like dynamic resizing, lazy loading, and a customizable lightbox component for an enhanced viewing experience.

## Features

- **Responsive Grid Layout**: Automatically adjusts media display based on container size.
- **Dynamic Media Handling**: Supports both images and videos, with intelligent loading strategies.
- **Customizable Lightbox**: Full-screen media viewer with navigation and zoom capabilities.
- **Performance Optimized**: Lazy loading and efficient rendering for smooth user experience.
- **Accessibility**: Built with accessibility in mind, supporting keyboard navigation and ARIA attributes.
- **TypeScript Support**: Fully typed for better developer experience.

## Installation

```bash
npm install chat-media-view
# or
yarn add chat-media-view
```

## Usage

### ChatMediaView Component

The `ChatMediaView` component is the main entry point for displaying a collection of media items.

```typescript jsx
import React from 'react';
import { ChatMediaView, MediaItem } from 'chat-media-view';

const media: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://example.com/image1.jpg',
    alt: 'Description of image 1',
    dimensions: { width: 1200, height: 800 }, // Optional: for aspect ratio calculation
    thumbnailUrl: 'https://example.com/image1-thumb.jpg', // Optional: for faster loading
  },
  {
    id: '2',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    alt: 'Description of video 1',
    dimensions: { width: 1920, height: 1080 },
    thumbnailUrl: 'https://example.com/video1-thumb.jpg',
  },
  {
    id: '3',
    type: 'image',
    url: 'https://example.com/image2.jpg',
    alt: 'Description of image 2',
    dimensions: { width: 900, height: 1600 },
  },
];

const MyChatComponent = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <ChatMediaView media={media} />
    </div>
  );
};

export default MyChatComponent;
```

#### Props

| Prop Name         | Type                 | Description                                                        | Default   |
| :---------------- | :------------------- | :----------------------------------------------------------------- | :-------- |
| `media`           | `MediaItem[]`        | An array of media objects to display.                              | `[]`      |
| `onMediaClick`    | `(item: MediaItem) => void` | Callback when a media item is clicked. Receives the clicked item. | `undefined` |
| `aspectRatio`     | `number`             | Desired aspect ratio for grid items (width / height).              | `1`       |
| `gap`             | `number`             | Gap between grid items in pixels.                                  | `4`       |
| `initialIndex`    | `number`             | Initial index of the media item to display in the lightbox.        | `0`       |
| `placeholder`     | `React.ReactNode`    | Custom placeholder to display while media is loading.              | `undefined` |
| `maxRows`         | `number`             | Maximum number of rows to display in the grid.                     | `undefined` |
| `showControls`    | `boolean`            | Show/hide lightbox navigation controls.                            | `true`    |
| `zoomLevel`       | `number`             | Initial zoom level for images in the lightbox.                     | `1`       |
| `allowZoom`       | `boolean`            | Allow/disallow zooming in the lightbox.                            | `true`    |
| `downloadable`    | `boolean`            | Allow/disallow downloading media from the lightbox.                | `true`    |
| `downloadFileName`| `(item: MediaItem, index: number) => string` | Function to generate download file name.       | `undefined` |
| `overlayColor`    | `string`             | Color of the lightbox overlay.                                     | `'rgba(0, 0, 0, 0.9)'` |

### MediaItem Type

```typescript
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt: string;
  dimensions?: { width: number; height: number };
  thumbnailUrl?: string; // Optional: URL for a thumbnail image
}
```

### Lightbox Component (Internal Use)

The `Lightbox` component is used internally by `ChatMediaView` to display media in a full-screen overlay. While it's primarily for internal use, its props are documented here for comprehensive understanding.

#### Props

| Prop Name           | Type                   | Description                                                 | Default |
| :------------------ | :--------------------- | :---------------------------------------------------------- | :------ |
| `media`             | `MediaItem[]`          | An array of media objects to display.                       | `[]`    |
| `currentIndex`      | `number`               | The index of the currently displayed media item.            | `0`     |
| `isOpen`            | `boolean`              | Controls the visibility of the lightbox.                    | `false` |
| `onClose`           | `() => void`           | Callback function when the lightbox is closed.              |         |
| `onNext`            | `() => void`           | Callback function for navigating to the next media item.    |         |
| `onPrev`            | `() => void`           | Callback function for navigating to the previous media item.|         |
| `showControls`      | `boolean`              | Show/hide navigation controls (arrows, close button).       | `true`  |
| `zoomLevel`         | `number`               | Initial zoom level for images.                              | `1`     |
| `allowZoom`         | `boolean`              | Allow/disallow zooming.                                     | `true`  |
| `downloadable`      | `boolean`              | Allow/disallow downloading media.                           | `true`  |
| `downloadFileName`  | `(item: MediaItem, index: number) => string` | Function to generate download file name. |         |
| `overlayColor`      | `string`               | Color of the lightbox overlay.                              | `'rgba(0, 0, 0, 0.9)'` |

## Development

To set up the project for development:

```bash
git clone https://github.com/your-username/chat-media-view.git
cd chat-media-view
npm install
npm run dev
```

## Running Storybook

Storybook is used for component development and testing.

```bash
npm run storybook
```

This will start Storybook in development mode, usually at `http://localhost:6006`.

## Building the Library

To build the library for publishing:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

We welcome contributions! Please see our `CONTRIBUTING.md` for more details.

## License

This project is licensed under the MIT License.
