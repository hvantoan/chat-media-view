# System Architecture - chat-media-view

## 1. Overview

The `chat-media-view` library is a React component library designed for efficient and flexible display of media (images and videos) in chat applications. Its architecture is built around modularity, performance, and a rich user experience, providing a responsive grid view and an interactive lightbox viewer.

## 2. High-Level Architecture

The library exposes two main components: `ChatMediaView` for grid display and `Lightbox` for full-screen viewing. These components interact with utility functions and hooks to manage layout, performance, and user interactions.

```
+-------------------------------------------------------------+
|                     Your React Application                  |
|                                                             |
|  +---------------------+        +---------------------+   |
|  |     ChatMediaView   |<-------|       Lightbox      |   |
|  |  (Grid Component)   |        |  (Viewer Component) |   |
|  +----------^----------+        +----------^----------+   |
|             | media[]                   | media[], index    |
|             | onMediaClick              | onClose, onNext, onPrev |
|             |                           |                     |
|  +----------|---------------------------|----------+          |
|  |          v                           v          |          |
|  |     chat-media-view NPM Library                 |          |
|  |                                                 |          |
|  |  +--------------------------------------------+ |          |
|  |  |                 src/                       | |          |
|  |  |   ├── ChatImageGrid.tsx (ChatMediaView)    | |          |
|  |  |   ├── Lightbox.tsx                       | |          |
|  |  |   ├── GridLayoutEngine.ts                | |-----------> Calculates grid item dimensions
|  |  |   ├── types.ts (MediaItem interface)     | |-----------> Defines media data structure
|  |  |   ├── hooks/useIntersectionObserver.ts   | |-----------> Handles lazy loading
|  |  |   ├── styles/image-grid.css              | |-----------> Grid styling
|  |  |   └── styles/lightbox.css                | |-----------> Lightbox styling
|  |  +--------------------------------------------+ |          |
|  |                                                 |          |
|  +-------------------------------------------------------------+
```

## 3. Component Breakdown

### 3.1 `ChatMediaView` (src/ChatImageGrid.tsx)

*   **Purpose**: The primary component for rendering a collection of media items in a responsive grid. It handles the overall layout, initial loading, and integration with the lightbox.
*   **Responsibilities**:
    *   Accepts an array of `MediaItem` objects and configuration props.
    *   Calculates the optimal grid layout using `GridLayoutEngine` based on container width, aspect ratio, and gaps.
    *   Renders individual media items (images/videos) within the grid.
    *   Implements lazy loading for media using `useIntersectionObserver`.
    *   Manages the state and opening of the `Lightbox` component.
    *   Provides `onMediaClick` callback for custom actions when a media item is selected.
*   **Key Interactions**:
    *   Uses `GridLayoutEngine` for layout calculations.
    *   Leverages `useIntersectionObserver` for performance optimization.
    *   Renders `Lightbox` when a media item is clicked.

### 3.2 `Lightbox` (src/Lightbox.tsx)

*   **Purpose**: A full-screen overlay component for detailed viewing and interaction with individual media items.
*   **Responsibilities**:
    *   Displays the currently selected `MediaItem` (image or video) using a layered DOM structure:
        *   `chat-lightbox__blur-bg`: Blurred background using media thumbnail.
        *   `chat-lightbox__gradient`: Contextual top/bottom overlays for legibility.
        *   `chat-lightbox__stage`: Main interactive area containing media and controls.
    *   Provides navigation controls (previous, next) using standardized circular glass buttons.
    *   Offers image and video zoom functionality using `useZoom` hook.
    *   Renders `LightboxZoomControls` in the bottom control area.
    *   Renders `LightboxThumbnails` at the bottom of the stage for quick navigation.
    *   Includes a top toolbar with rectangular glass buttons for download and close actions.
    *   Features a bottom control area for media counter, zoom controls, and future thumbnail support.
    *   Supports keyboard navigation (Escape to close, arrow keys for navigation, and zoom shortcuts).
    *   Handles responsiveness and high-performance overlay styling.
*   **Key Interactions**:
    *   Receives `media`, `currentIndex`, `isOpen`, `onClose`, `onNext`, `onPrev` and customization props (`showThumbnails`, `showZoomControls`, `minZoom`, `maxZoom`, `zoomStep`).
    *   Renders `LightboxVideo` for video items.
    *   Uses `useZoom` hook to manage zoom state and transitions.
    *   Renders `LightboxZoomControls` for interactive zooming.
    *   Renders `LightboxThumbnails` for quick media selection.

### 3.3 `GridLayoutEngine` (src/GridLayoutEngine.ts)

*   **Purpose**: A utility class responsible for calculating the dimensions and positions of media items within the responsive grid.
*   **Responsibilities**:
    *   Takes `MediaItem[]`, container width, target aspect ratio, and gap as input.
    *   Applies a heuristic algorithm to arrange media items into rows.
    *   Calculates the `width` and `height` for each media item to fill the grid row efficiently while respecting aspect ratios.
    *   Supports a `maxRows` constraint to limit the visible grid height.
*   **Key Interactions**:
    *   Instantiated and used by `ChatMediaView` during layout calculations.

### 3.4 `useIntersectionObserver` (src/hooks/useIntersectionObserver.ts)

*   **Purpose**: A custom React hook for observing changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. Used for lazy loading.
*   **Responsibilities**:
    *   Provides a simple API to integrate the Intersection Observer API into React components.
    *   Returns whether the observed element is currently intersecting.
*   **Key Interactions**:
    *   Used by `ChatMediaView` to determine when media items enter the viewport, triggering their loading.

### 3.5 `MediaItem` Type (src/types.ts)

*   **Purpose**: Defines the structure for a single media object throughout the library.
*   **Structure**: Includes properties like `id`, `type` (`image` | `video`), `url`, `alt`, optional `dimensions` (`width`, `height`), and `thumbnailUrl`.
*   **Key Interactions**:
    *   Used by `ChatMediaView` and `Lightbox` to represent and process media data consistently.

### 3.6 Styling (src/styles/image-grid.css, src/styles/lightbox.css)

*   **Purpose**: Provides the visual presentation for the grid and lightbox components.
*   **Technologies**: Standard CSS.
*   **Details**:
    *   `image-grid.css`: Defines grid item styling, responsive behaviors, and placeholder appearance.
    *   `lightbox.css`: Manages overlay, media element, and control button styling for the full-screen viewer. It utilizes a comprehensive design token system (CSS custom properties) to manage:
        *   **Colors & Opacity**: Themed overlays, glass backgrounds, and borders.
        *   **Blur & Effects**: Standardized blur levels for glassmorphism and backdrop-filters.
        *   **Sizing & Spacing**: Consistent button dimensions, navigation sizes, and gutters.
        *   **Transitions**: Unified duration and easing functions for all interactive elements.
        *   **Layering (Z-index)**: Explicitly defined z-index stack for background, media, controls, and toolbar.

## 4. Data Flow

1.  **Application Integration**: The consuming React application imports `ChatMediaView` and its associated CSS.
2.  **Media Provision**: The application provides an array of `MediaItem` objects to the `ChatMediaView` component via props.
3.  **Grid Layout Calculation**: `ChatMediaView` instantiates `GridLayoutEngine` with the media data and container dimensions to calculate the layout for each grid item.
4.  **Lazy Loading**: `useIntersectionObserver` monitors the visibility of `ChatMediaView` and individual media placeholders.
5.  **Media Rendering**: As media items become visible, `ChatMediaView` renders `<img>` or `<video>` tags, applying styles from `image-grid.css`.
6.  **Lightbox Interaction**: When a user clicks a media item in the grid:
    *   `ChatMediaView` updates its internal state, setting `lightboxOpen` to `true` and `currentMediaIndex` to the clicked item's index.
    *   The `Lightbox` component is rendered, displaying the selected media.
    *   User interactions (navigation, zoom, download) within the `Lightbox` are handled by its internal logic and passed-in callbacks (`onNext`, `onPrev`, `onClose`).
7.  **Closure**: When the `Lightbox` is closed, `ChatMediaView`'s state is updated, unmounting the `Lightbox` component.

## 5. Key Architectural Decisions

*   **Component-Based Design**: Emphasizes reusability and clear separation of concerns, making the library easy to integrate and extend.
*   **Declarative UI with React**: Leverages React's declarative nature for efficient rendering and state management.
*   **TypeScript-First**: Ensures type safety across the codebase, reducing bugs and improving developer experience.
*   **Performance Focus**: Integration of `useIntersectionObserver` for lazy loading and optimized `GridLayoutEngine` to ensure smooth performance with varying media counts.
*   **Minimal External Dependencies**: Keeps the bundle size small and reduces potential conflicts with consuming applications.
*   **Customizable via Props**: Most aspects of appearance and behavior are configurable through component props, allowing high flexibility without modifying the core library.

## 6. Future Considerations

-   **Pre-fetching/Pre-loading**: Implement strategies to pre-fetch adjacent media items in the lightbox for a smoother transition experience.
-   **Gesture Support**: Add swipe gestures for navigation and pinch-to-zoom for touch devices in the lightbox.
-   **Download Progress**: Enhance the download functionality in the lightbox to show progress.
-   **Accessibility Enhancements**: Further refine ARIA attributes and keyboard interactions for broader accessibility.
