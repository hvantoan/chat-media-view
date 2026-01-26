---
title: "Auto Version & Changelog"
description: "Automated semantic versioning and changelog generation"
status: completed
priority: P2
effort: 1-2h
branch: feat/21-complete-video-grid-support
tags: [ci, release, automation]
created: 2026-01-26
---

# Auto Version & Changelog

## Current State

- **Version**: 0.2.0 (manual in package.json)
- **Release trigger**: Manual git tag `v*` → GitHub Actions → npm publish
- **Commit convention**: Conventional commits (commitlint + husky)
- **Changelog**: None

## Approaches

### Approach A: release-please (Google) - RECOMMENDED

**How it works:**
1. PR merges to master with conventional commits
2. release-please creates/updates a "Release PR" with version bump + CHANGELOG
3. Merging Release PR triggers tag creation → existing release.yml publishes

**Pros:**
- Battle-tested (used by Google, widely adopted)
- Manifest mode supports monorepos (future-proof)
- Non-destructive: creates PR for review before release
- Handles version bumping + CHANGELOG atomically
- Works with existing release.yml (tag-triggered)

**Cons:**
- Extra PR step (some see as overhead)
- Requires GitHub token permissions

**Files to create/modify:**
- `.github/workflows/release-please.yml` (new)
- `.release-please-manifest.json` (new)
- `release-please-config.json` (new)

### Approach B: semantic-release

**How it works:**
1. Push to master analyzes commits
2. Auto-bumps version, generates CHANGELOG, creates tag, publishes

**Pros:**
- Fully automated (no manual approval)
- Single workflow does everything
- Popular in JS ecosystem

**Cons:**
- No review step before release (risky for libs)
- More complex config
- Replaces existing release.yml entirely
- Plugin ecosystem can be fragile

**Files to create/modify:**
- `.releaserc.json` (new)
- `.github/workflows/release.yml` (major rewrite)
- Remove manual tag trigger

### Approach C: Changesets

**How it works:**
1. Devs add changeset files during development
2. Version command bumps + generates CHANGELOG
3. Publish command releases

**Pros:**
- Explicit intent per change
- Great for monorepos
- Fine-grained control

**Cons:**
- Manual changeset creation (extra friction)
- Overkill for single-package lib
- Learning curve

## Recommendation: Approach A (release-please)

**Rationale:**
- Preserves existing release.yml workflow (minimal disruption)
- PR-based review before release (safer for public npm lib)
- Auto CHANGELOG from existing conventional commits
- Simple config, proven reliability

## Implementation Steps

### Phase 1: Setup release-please (30 min)

1. Create `.github/workflows/release-please.yml`:
   ```yaml
   name: Release Please
   on:
     push:
       branches: [master]
   permissions:
     contents: write
     pull-requests: write
   jobs:
     release-please:
       runs-on: ubuntu-latest
       steps:
         - uses: google-github-actions/release-please-action@v4
           with:
             release-type: node
   ```

2. Create `release-please-config.json` for custom commit types

3. Bootstrap `.release-please-manifest.json` with current version

### Phase 2: Initial CHANGELOG (15 min)

1. Generate initial CHANGELOG.md from recent commits manually or let first release-please PR create it

### Phase 3: Test & Validate (15 min)

1. Push test commit to master
2. Verify Release PR created with correct version bump
3. Verify CHANGELOG entries match commits
4. Merge Release PR → verify tag created → verify npm publish

## Success Criteria

- [ ] release-please workflow runs on master push
- [ ] Release PR auto-created with version bump
- [ ] CHANGELOG.md auto-generated with conventional commits
- [ ] Merging Release PR triggers existing release.yml
- [ ] npm publish succeeds with correct version

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Token permissions | Use GITHUB_TOKEN (auto-provided) |
| First run bootstrapping | Set initial version in manifest |
| Breaking existing releases | Keep release.yml tag-triggered (unchanged) |

## Unresolved Questions

1. Should CHANGELOG include all historical commits or start fresh from v0.2.0?
2. Preferred changelog sections grouping (feat/fix/docs etc)?
