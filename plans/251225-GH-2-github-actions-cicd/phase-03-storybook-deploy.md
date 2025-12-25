# Phase 3: Storybook Deployment

## Overview

**Priority:** P2
**Status:** Pending
**Effort:** 30m

Deploy Storybook documentation to GitHub Pages on release.

## Requirements

### Functional
- Build Storybook on release
- Deploy to GitHub Pages
- Available at `https://{username}.github.io/{repo}/`

### Non-Functional
- Fast deployment
- No manual intervention needed

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/.github/workflows/release.yml` | Modify (add deploy job) |

## Implementation

### Update Release Workflow

Add Storybook deployment job after npm publish:

```yaml
# Add to .github/workflows/release.yml

jobs:
  release:
    # ... existing release job ...

  deploy-docs:
    runs-on: ubuntu-latest
    needs: release

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: storybook-static

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Repository Configuration Required

1. Go to Repository Settings → Pages
2. Set Source: "GitHub Actions"
3. (Optional) Add custom domain

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Deploy on release only | Docs match published version |
| Separate job with `needs` | npm publish can fail independently |
| `storybook-static` path | Default Storybook build output |

## Todo

- [ ] Update `release.yml` with deploy-docs job
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployment on first release

## Success Criteria

- Storybook builds and deploys on tag push
- Docs accessible at GitHub Pages URL
- Deployment only runs if release succeeds
