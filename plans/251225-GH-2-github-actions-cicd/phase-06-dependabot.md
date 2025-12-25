# Phase 6: Dependabot

## Overview

**Priority:** P2
**Status:** Pending
**Effort:** 10m

Automated dependency updates via GitHub Dependabot.

## Requirements

### Functional
- Weekly dependency update PRs
- Group dev dependencies to reduce noise
- Exclude React peer deps from auto-updates

### Non-Functional
- Zero maintenance after setup
- PRs run CI automatically

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/.github/dependabot.yml` | Create |

## Implementation

### Create Dependabot config

```yaml
# /home/vif/chat-media-view/.github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
    open-pull-requests-limit: 5
    groups:
      dev-dependencies:
        dependency-type: development
        patterns:
          - "*"
      storybook:
        patterns:
          - "@storybook/*"
          - "storybook"
      testing:
        patterns:
          - "vitest"
          - "@vitest/*"
          - "@testing-library/*"
    ignore:
      # Peer deps - update manually
      - dependency-name: "react"
      - dependency-name: "react-dom"

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Weekly schedule | Balance freshness vs noise |
| Grouped updates | One PR for Storybook, one for testing, etc. |
| Ignore React | Peer deps need manual compatibility check |
| GitHub Actions too | Keep actions up to date |

## Todo

- [ ] Create `.github/dependabot.yml`
- [ ] Verify first PR appears within a week

## Success Criteria

- Dependabot creates grouped PRs weekly
- CI runs on Dependabot PRs
- React peer deps not auto-updated
