# Phase 1: CI Pipeline

## Overview

**Priority:** P1
**Status:** Complete
**Effort:** 30m

Create GitHub Actions workflow for continuous integration on push/PR.

## Requirements

### Functional
- Run on push to `master` and all PRs
- Execute: lint → typecheck → test → build (sequential for fail-fast)
- Cache npm dependencies for speed
- Node 20 LTS

### Non-Functional
- Fast feedback (<3 min target)
- Clear error messages on failure

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/.github/workflows/ci.yml` | Create |
| `/home/vif/chat-media-view/.nvmrc` | Create |

## Implementation

### Step 1: Create .nvmrc

```bash
# /home/vif/chat-media-view/.nvmrc
20
```

### Step 2: Create CI Workflow

```yaml
# /home/vif/chat-media-view/.github/workflows/ci.yml
name: CI

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

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

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Test
        run: npm test

      - name: Build
        run: npm run build
```

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Sequential steps | Fail-fast on lint before running slower tests |
| `concurrency` with cancel | Prevent queued runs on rapid pushes |
| `node-version-file` | DRY - single source of truth in `.nvmrc` |
| `npm ci` over `npm install` | Faster, deterministic, CI-appropriate |

## Todo

- [x] Create `.nvmrc` with Node 20
- [x] Create `.github/workflows/ci.yml`
- [ ] Test by pushing to branch or creating PR

## Success Criteria

- CI runs on PR creation
- CI fails if any step fails (lint, typecheck, test, build)
- Cached npm speeds up subsequent runs
