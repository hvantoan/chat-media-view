# Phase 5: Test Coverage

## Overview

**Priority:** P2
**Status:** Pending
**Effort:** 15m

Add test coverage reporting to CI using Vitest coverage (already installed) and Codecov.

## Requirements

### Functional
- Generate coverage report on CI runs
- Upload to Codecov for tracking/badges
- Coverage visible in PR comments

### Non-Functional
- No coverage threshold enforcement (yet)
- Fast - coverage adds ~10s to test run

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/.github/workflows/ci.yml` | Modify |
| `/home/vif/chat-media-view/package.json` | Modify |

## Implementation

### Step 1: Add coverage script to package.json

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 2: Update CI workflow

```yaml
# Replace test step in ci.yml
- name: Test with coverage
  run: npm run test:coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v5
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    fail_ci_if_error: false
```

### Step 3: Setup Codecov

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Add repository
4. Copy token → add as `CODECOV_TOKEN` secret in GitHub

### Optional: Add badge to README

```markdown
[![codecov](https://codecov.io/gh/username/chat-media-view/branch/master/graph/badge.svg)](https://codecov.io/gh/username/chat-media-view)
```

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| No threshold | Avoid blocking PRs on arbitrary %, focus on trend |
| `fail_ci_if_error: false` | Coverage upload failure shouldn't fail CI |
| Codecov over Coveralls | Better UX, free for open source |

## Todo

- [ ] Add `test:coverage` script to package.json
- [ ] Update ci.yml with coverage upload step
- [ ] Add CODECOV_TOKEN secret to GitHub
- [ ] (Optional) Add coverage badge to README

## Success Criteria

- Coverage report generated on each CI run
- Codecov shows coverage trend
- PR comments show coverage diff
