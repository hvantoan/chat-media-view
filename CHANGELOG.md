# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-12-26

### Changed
- **BREAKING**: Migrate from ThumbHash to BlurHash for placeholder generation
- **BREAKING**: Rename component from `ChatMediaView` to `ChatMediaGrid`
- Integrated Lightbox component directly into ChatMediaGrid
- Updated keywords: removed `thumbhash`, added `blurhash` and `lightbox`

### Fixed
- Improved placeholder rendering with BlurHash encoding

## [0.1.0] - 2025-12-25

### Added
- Initial library setup with Vite, TypeScript, Vitest, Storybook
- ChatMediaView component for responsive image grid
- Lightbox component with zoom and navigation
- ThumbHash placeholder support
- Accessibility features (keyboard navigation, ARIA)
