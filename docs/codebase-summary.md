# Codebase Summary

## Phase 3: Core Components (chat-media-view npm library)

This section summarizes the core components and key features introduced in Phase 3.

### Key Files and Components:

-   **src/ChatImageGrid.tsx**:
    -   Main container component for displaying a grid of images.
    -   Accepts an array of image data and renders positioned `ImageCell` components.
    -   Handles overall layout and interaction.

-   **src/ImageCell.tsx**:
    -   Represents a single image within the grid.
    -   Implements lazy loading for images using `useIntersectionObserver`.
    -   Supports click handlers for individual image interaction.
    -   Enables keyboard navigation (Enter/Space) for accessibility.
    -   Includes smooth fade-in transitions for loaded images.
    -   Manages error states for image loading.

-   **src/hooks/useIntersectionObserver.ts**:
    -   Custom React hook for efficient lazy loading of components.
    -   Utilizes the Intersection Observer API to detect when elements enter or exit the viewport.

-   **src/styles/lightbox.css**:
    -   Manages overlay, media element, and control button styling for the full-screen viewer.
    -   Implements a comprehensive design system using 28+ CSS custom properties (design tokens).
    -   Supports glassmorphism UI components (buttons, pills, badges).
    -   Includes advanced gradient overlays and backdrop-filter fallbacks for better visual quality.

## Phase 4: Video Support & Lightbox UI Redesign (Phase 2 & 3)

This section summarizes the enhancements for video playback and the comprehensive Lightbox UI redesign, including the new zoom system.

### Key Files and Components:

-   **src/Lightbox.tsx**:
    -   Refactored with a modern layered DOM structure.
    -   Integrated `useZoom` hook for advanced media manipulation.
    -   New props: `showThumbnails`, `showZoomControls`, `minZoom`, `maxZoom`, `zoomStep`.
    -   Internalized SVG icons for better portability.
-   **src/LightboxZoomControls.tsx**:
    -   New component for zoom interactions (In/Out/Reset).
    -   Glassmorphism UI consistent with the redesign.
-   **src/hooks/useZoom.ts**:
    -   Custom hook for managing zoom state, transforms, and keyboard shortcuts (`+`, `-`, `0`).
    -   Handles scale constraints and reset logic.
-   **src/styles/lightbox.css**:
    -   New classes for `blur-bg`, `stage`, `media-wrapper`, `toolbar`, `nav`, and `bottom`.
    -   Added zoom control specific styles (`chat-lightbox__zoom-controls`, `chat-lightbox__zoom-btn`).
    -   Enhanced glassmorphism and gradient overlays.
-   **src/VideoCell.tsx**:
    -   Specialized component for rendering videos in the grid.
    -   Supports autoplay, muted, and looping for preview.
-   **src/components/video/**:
    -   New directory for video-specific components and hooks (e.g., `VideoPlayer`, `useVideoControls`).

## Phase 5: Thumbnail Strip & Navigation Refinement

This section summarizes the implementation of the Lightbox thumbnail strip and associated navigation enhancements.

### Key Files and Components:

-   **src/LightboxThumbnails.tsx**:
    -   New component for horizontal thumbnail navigation.
    -   Features auto-scroll to keep active item centered.
    -   Includes `VideoIndicator` badge for video content.
    -   Accessibility: `role="listbox"`, `role="option"`, and keyboard support (`Enter`, `Space`, `ArrowLeft`, `ArrowRight`).
-   **src/Lightbox.tsx**:
    -   Integrated `LightboxThumbnails` into the `bottom` control area.
    -   Enabled `showThumbnails` prop (default: `true`).
-   **src/styles/lightbox.css**:
    -   Added thumbnail specific design tokens and styles.
    -   Implemented responsive sizing (56px/48px/40px).
    -   Added fade edge indicators for scrollable areas.
-   **src/index.ts**:
    -   Exported `LightboxThumbnails` for public use.

### Core Features:

-   **Thumbnail Navigation**: Rapid media switching via a scrollable strip.
-   **Visual Indicators**: Badges for video thumbnails.
-   **Responsive UI**: Fluid thumbnail sizing based on viewport.
-   **Accessibility**: Full keyboard and screen reader support for the thumbnail strip.
