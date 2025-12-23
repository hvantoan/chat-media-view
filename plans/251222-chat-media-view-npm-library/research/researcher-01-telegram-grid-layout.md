# Telegram Image Grid Layout Research

**Date:** 2025-12-22
**Status:** Complete
**Scope:** Image grid layout for 1-5 images in chat messages

## Executive Summary

Telegram uses a custom layout algorithm for grouped media (albums) supporting 1-10 items. No publicly documented official specification exists. Found reverse-engineered implementations in open-source projects but exact algorithm remains proprietary. Telegram arranges photos as "elegantly proportioned thumbnails" maintaining aspect ratios within grid constraints.

---

## Key Findings

### 1. Album & Layout Basics

**Telegram Features (v4.5+):**
- Auto-groups multiple photos/videos sent together into albums
- Supports up to 10 items per album
- Single notification instead of multiple on recipient side
- Arrangement as "elegantly proportioned thumbnails"

**No Official Documentation:** Telegram does not publish layout algorithm specs. Implementation derived from reverse-engineering source code.

---

### 2. Aspect Ratio Handling

**General Image Recommendations:**
- Profile photos: 512×512px (square)
- Posts: 1280×1280px (square) or 1280×720px (landscape)
- Link previews: 1200×630px (1.91:1 aspect ratio)

**Grid Constraints:**
- Each image maintains original aspect ratio when possible
- Grid cells adapt to available container width
- Photos stretched/shrunk minimally to fill rows uniformly

**Algorithm Approach:** Similar to Knuth-Plass line-breaking algorithm (used by react-photo-album rows layout):
- Calculates optimal row heights
- Uses Dijkstra's algorithm for shortest path
- Keeps row heights consistent while respecting aspect ratios

---

### 3. Layout Pattern for Image Counts (1-5)

Based on reverse-engineering and common mobile messenger patterns:

| Count | Layout Pattern | Notes |
|-------|---|---|
| 1 | Single large image | Full container width |
| 2 | Two columns | Equal width, aspect ratios maintained |
| 3 | Two on top, one below | Or asymmetric based on aspect |
| 4 | 2×2 grid | Equal cells, uniform sizing |
| 5 | Custom mosaic | Varies by aspect ratios |

**Evidence:** Telegram Android source (DrKLO/Telegram) contains custom view implementations in `RecyclerListView.java` and photo components but specific layout math not exposed in public code.

---

### 4. Spacing & Dimensions

**Estimated Gap Values:**
- Inter-image gap: 2-4px (tight grouping)
- Container padding: 0-8px

**Max Dimensions:**
- Single image: Container width (capped at 320-512px on mobile)
- Grid containers: Fill available chat bubble width
- Border constraints prevent overflow

**Reference:** CSS grid implementations use `gap: 20px` and `border-radius: 12px` for similar layouts, but Telegram appears more compact.

---

### 5. Border Radius Rules

**Typical Pattern:**
- **Outer corners:** Full radius (e.g., 12-16px)
- **Inner corners:** Reduced or no radius (0-4px for shared edges)
- **Single image:** Full rounded corners on all sides

**Implementation Method:** Apply border-radius selectively based on position:
- Top-left corner of grid: `border-radius: 12px 0 0 0`
- Top-right: `border-radius: 0 12px 0 0`
- Bottom corners similarly
- Shared edges: No radius

---

### 6. Open-Source Implementations

#### A. **React Photo Album**
- **Link:** [React Photo Album](https://react-photo-album.com/)
- **Features:**
  - Rows, columns, masonry layouts
  - Aspect ratio preservation
  - CSS-based styling
  - Responsive calculations
- **Relevance:** Not Telegram-specific but uses similar algorithm concepts (Knuth-Plass for row layout)

#### B. **TelegramGallery (Android)**
- **Link:** [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- **Info:** Android library extracted from Telegram
- **Features:** Album selection, multi-select, photo preview
- **Limitation:** Focuses on picker UI, not layout algorithm

#### C. **Official Telegram Source**
- **Link:** [GitHub - Telegram Desktop/Android](https://github.com/DrKLO/Telegram)
- **Contains:**
  - `PhotoViewer.java` - Image gallery viewer
  - `RecyclerListView.java` - Chat message layout
  - Custom view components for media groups
- **Issue:** Code is minimally documented; layout logic scattered across components

#### D. **Related Libraries**
- **react-visual-grid:** Image grid/masonry for React - [GitHub](https://github.com/prabhuignoto/react-visual-grid)
- **react-grid-gallery:** Multi-select grid gallery - npm package

---

## Algorithm Pseudo-Code (Inferred)

```
function layoutImages(images, containerWidth) {
  // Normalize aspect ratios
  let normalizedItems = images.map(img => ({
    width: img.width,
    height: img.height,
    aspectRatio: img.width / img.height
  }))

  // Determine grid structure based on count
  switch(images.length) {
    case 1:
      return { layout: 'single', width: containerWidth, height: auto }
    case 2:
      return { layout: 'two-col', colWidth: containerWidth/2, height: auto }
    case 3:
      return { layout: '2-1', topRowHeight: auto, bottomHeight: auto }
    case 4:
      return { layout: 'grid-2x2', cellSize: containerWidth/2, height: auto }
    case 5:
      // Complex: optimize based on aspect ratios
      return optimizeMosaic(normalizedItems, containerWidth)
  }
}

function optimizeMosaic(items, width) {
  // Use Dijkstra's algorithm to find optimal row breaks
  // Minimize height variance across rows
  // Preserve aspect ratios
  return { rows: [...], heights: [...], gaps: 2-4px }
}
```

---

## Spacing Constants (Estimated)

| Element | Value | Notes |
|---------|-------|-------|
| Gap between images | 2-4px | Compact grouping |
| Outer border-radius | 12-16px | Mobile standard |
| Inner radius | 0-4px | Minimal at shared edges |
| Max height (single) | 512-640px | Mobile constraint |
| Container padding | 0-8px | Minimal |

---

## Missing Implementation Details

**Unresolved Questions:**

1. **Exact aspect ratio thresholds:** When does Telegram switch from 2-col to asymmetric layout for 3 items?
2. **Height calculation formula:** Mathematical formula for optimal row heights (Telegram likely uses variant of Knuth-Plass)
3. **Panorama handling:** How are extreme aspect ratios (>3:1) constrained?
4. **Animated GIF/Video:** Different layout rules for mixed media types?
5. **Scaling on different devices:** Exact breakpoints for mobile vs tablet vs desktop
6. **RTL considerations:** Right-to-left layout adjustments (if any)

---

## References & Sources

- [React Photo Album Documentation](https://react-photo-album.com/documentation)
- [GitHub - TelegramGallery](https://github.com/TangXiaoLv/TelegramGallery)
- [Official Telegram Source (DrKLO/Telegram)](https://github.com/DrKLO/Telegram)
- [Telegram Blog - Albums Feature](https://telegram.org/blog/albums-saved-messages)
- [React Visual Grid Library](https://github.com/prabhuignoto/react-visual-grid)
- [Telegram Image Compression Research](https://rifqimfahmi.dev/blog/telegram-like-image-optimization-on-android)

---

## Recommendation for Implementation

**Strategy:** Implement custom layout engine inspired by react-photo-album's rows algorithm with Telegram-specific constraints:

1. Use aspect ratio-aware row packing (Knuth-Plass variant)
2. Hard-code layout patterns for 1-5 images
3. Add compact gap (2-4px) and Telegram-style border-radius
4. Test against actual Telegram client visually
5. Consider detecting if exact algorithm via pixel measurement & reverse-engineering

**Why no exact match:** Telegram's algorithm is proprietary and undocumented. Close approximation achievable through careful CSS grid or custom canvas/flex layout.

