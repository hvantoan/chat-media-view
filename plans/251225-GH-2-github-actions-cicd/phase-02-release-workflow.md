# Phase 2: Release Workflow

## Overview

**Priority:** P1
**Status:** Pending
**Effort:** 30m

Automated npm publishing when version tags are pushed.

## Requirements

### Functional
- Trigger on `v*` tag push (e.g., `v1.0.0`, `v0.2.3`)
- Build library
- Publish to npm with provenance
- Create GitHub Release with auto-generated notes

### Non-Functional
- Supply chain security via npm provenance
- Idempotent (re-running won't break anything)

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/.github/workflows/release.yml` | Create |

## Implementation

### Create Release Workflow

```yaml
# /home/vif/chat-media-view/.github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write
  id-token: write

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| `id-token: write` | Required for npm provenance (OIDC) |
| `--provenance` flag | Supply chain security, shows build attestation on npm |
| `softprops/action-gh-release` | Auto-generates release notes from commits |
| No tests in release | CI already passed on master; tag = verified code |

## Secret Setup Required

1. Go to npmjs.com → Account Settings → Access Tokens
2. Generate "Automation" token (for CI/CD)
3. Add to GitHub: Settings → Secrets → Actions → `NPM_TOKEN`

## Release Process (for maintainers)

```bash
# After merging to master
npm version patch  # or minor/major
git push --follow-tags
# GitHub Actions handles the rest
```

## Todo

- [ ] Create `.github/workflows/release.yml`
- [ ] Add `NPM_TOKEN` secret to GitHub repository
- [ ] Test with first release tag

## Success Criteria

- Tag push triggers release workflow
- Package published to npm with provenance badge
- GitHub Release created with changelog
