# Phase 1: Add BlurHash Dependency

## Tasks

### 1.1 Install blurhash package

```bash
npm install blurhash
```

### 1.2 Update package.json keywords

Remove "thumbhash" keyword, keep "blurhash".

**File:** `package.json`

```diff
   "keywords": [
     "react",
     "image-grid",
     "chat",
     "telegram",
     "media",
     "gallery",
     "virtual-list",
     "blurhash",
-    "thumbhash",
     "lightbox",
     "accessibility",
     "rtl"
   ],
```

## Verification

```bash
npm ls blurhash
# Should show: blurhash@x.x.x
```
