---
title: "ChatImageGrid Video Support"
description: "Add video playback support with inline controls, enhanced downloads, and lightbox integration"
status: pending
priority: P1
effort: 24h
branch: master
tags: [video, media, download, ux]
created: 2025-12-23
---

# Video Support Implementation Plan

## Overview

Extend chat-media-view library to support video alongside images. Key goals:
- Unified MediaItem type with backwards compatibility
- Inline video playback with controls
- Enhanced download manager with cancel/retry
- Video support in Lightbox

## User Stories

| ID | Story | Phase |
|----|-------|-------|
| US-01 | Display video in grid (thumbnail, play icon, blurhash) | 2 |
| US-02 | Play video inline with controls (play/pause, seek, mute) | 3 |
| US-03 | Blurhash/thumbhash loading for video thumbnails | 2 |
| US-04 | Download with progress/cancel/retry for all media | 4 |

## Phase Summary

| Phase | Description | Effort | Files |
|-------|-------------|--------|-------|
| [Phase 1](./phase-01-type-system.md) | Type system updates, backwards compat | 2h | types.ts, ChatImageGrid.tsx |
| [Phase 2](./phase-02-video-cell.md) | VideoCell component with thumbnail/overlay | 4h | VideoCell.tsx, MediaCell.tsx |
| [Phase 3](./phase-03-video-playback.md) | Inline playback, auto-pause on scroll | 6h | VideoCell.tsx, useVideoVisibility.ts |
| [Phase 4](./phase-04-download-manager.md) | Enhanced DownloadManager with AbortController | 4h | DownloadManager.ts, useDownload.ts |
| [Phase 5](./phase-05-lightbox-video.md) | Lightbox video support | 4h | Lightbox.tsx |
| [Phase 6](./phase-06-testing-docs.md) | Testing and documentation | 4h | *.test.ts, README.md |

## Architecture Decisions

1. **Discriminated union** for MediaItem: `type: 'image' | 'video'`
2. **Native HTML5 video** - no external player libraries (KISS)
3. **IntersectionObserver** for auto-pause (performance)
4. **AbortController** for download cancellation (native API)
5. **Exponential backoff** for retry (1s, 2s, 4s, cap 10s)

## Validated Decisions (2025-12-23)

| Decision | Choice |
|----------|--------|
| Video controls | Custom minimal (play/pause overlay, seek bar, mute) |
| Backwards compat | Support both `images` and `items` props forever |
| Progress UI | Overlay indicator with percentage + MB/MB format |
| Autoplay | Tap to play (no autoplay) |
| Duration display | Badge on thumbnail (bottom-right, e.g., "0:32") |
| Bulk download | Single-item only (YAGNI) |

## Dependencies

- No new runtime dependencies (YAGNI)
- Dev: existing Vitest + Storybook

## Success Criteria

- [ ] All existing ImageItem tests pass (backwards compat)
- [ ] Videos display with thumbnail + play icon overlay
- [ ] Inline playback with minimal controls works
- [ ] Download cancel/retry functional
- [ ] Lightbox supports video playback
- [ ] Bundle size increase < 5KB gzipped

## Research References

- [Video Player Patterns](./research/researcher-01-video-player.md)
- [Download Patterns](./research/researcher-02-download-patterns.md)
