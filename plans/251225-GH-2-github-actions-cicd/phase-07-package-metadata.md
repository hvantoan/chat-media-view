# Phase 7: Package Metadata

## Overview

**Priority:** P1
**Status:** Pending
**Effort:** 10m

Fix missing/incomplete package.json metadata for professional npm presence.

## Requirements

### Functional
- Author field populated
- Repository URL correct
- LICENSE file exists
- Homepage points to docs

### Non-Functional
- Professional appearance on npmjs.com

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/package.json` | Modify |
| `/home/vif/chat-media-view/LICENSE` | Create |

## Implementation

### Step 1: Update package.json

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/USERNAME/chat-media-view.git"
  },
  "homepage": "https://USERNAME.github.io/chat-media-view",
  "bugs": {
    "url": "https://github.com/USERNAME/chat-media-view/issues"
  }
}
```

### Step 2: Create LICENSE file

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## npm Page Improvements

After these changes, npmjs.com will show:
- ✅ Repository link (sidebar)
- ✅ Homepage link (sidebar)
- ✅ Issues link (sidebar)
- ✅ License badge
- ✅ Author info

## Todo

- [ ] Get GitHub username for URLs
- [ ] Update package.json with author, repository, homepage, bugs
- [ ] Create LICENSE file with correct copyright holder
- [ ] Verify git remote URL matches repository field

## Success Criteria

- npm page shows repository/homepage links
- License correctly displayed
- No "missing repository" warning
