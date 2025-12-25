---
title: "GitHub Actions CI/CD for Library"
description: "Add CI pipeline with lint/typecheck/test/build, release workflow with npm publish, and Storybook deployment to GitHub Pages"
status: in-progress
priority: P1
effort: 2h
issue: 2
branch: feature/2-eslint-config
tags: [infra, ci-cd, github-actions]
created: 2025-12-25
---

# GitHub Actions CI/CD for Library

## Overview

Implement complete CI/CD pipeline for `chat-media-view` React component library using GitHub Actions.

**Selected Configuration:**
- Platform: GitHub Actions
- CI Checks: lint, typecheck, test, build
- Release: Manual tag (`v*`) triggers npm publish
- Docs: Storybook deployed to GitHub Pages
- Changelog: Manual CHANGELOG.md (Keep a Changelog format)
- Commits: Conventional Commits enforced via commitlint

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | CI Pipeline | DONE (2025-12-25) | 30m | [phase-01](./phase-01-ci-pipeline.md) |
| 2 | Release Workflow | DONE (2025-12-25) | 30m | [phase-02-release-workflow.md](./phase-02-release-workflow.md) |
| 3 | Storybook Deploy | DONE (2025-12-25) | 30m | [phase-03-storybook-deploy.md](./phase-03-storybook-deploy.md) |
| 4 | Changelog & Commits | DONE (2025-12-25) | 30m | [phase-04-changelog-commits.md](./phase-04-changelog-commits.md) |
| 5 | Test Coverage | DONE (2025-12-25) | 15m | [phase-05-test-coverage.md](./phase-05-test-coverage.md) |
| 6 | Dependabot | DONE (2025-12-25) | 10m | [phase-06-dependabot.md](./phase-06-dependabot.md) |
| 7 | Package Metadata | DONE (2025-12-25) | 10m | [phase-07-package-metadata.md](./phase-07-package-metadata.md) |
| 8 | Repository Config | Pending | 30m | [phase-08-repo-config.md](./phase-08-repo-config.md) |

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      GitHub Repository                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Push/PR to master ──► ci.yml                                   │
│                         ├─ lint                                  │
│                         ├─ typecheck                             │
│                         ├─ test                                  │
│                         └─ build                                 │
│                                                                  │
│  Tag v* ──────────────► release.yml                             │
│                          ├─ build                                │
│                          ├─ publish npm (with provenance)        │
│                          └─ deploy Storybook to GitHub Pages     │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## Files to Create

| File | Action | Description |
|------|--------|-------------|
| `.github/workflows/ci.yml` | Create | CI pipeline for PRs/pushes |
| `.github/workflows/release.yml` | Create | Release + npm publish + Storybook deploy |
| `.github/dependabot.yml` | Create | Automated dependency updates |
| `.nvmrc` | Create | Pin Node.js version |
| `CHANGELOG.md` | Create | Manual changelog (Keep a Changelog format) |
| `LICENSE` | Create | MIT license file |
| `commitlint.config.js` | Create | Conventional commits config |
| `.husky/commit-msg` | Create | Git hook for commit linting |
| `package.json` | Modify | Add author, repository, coverage script |

## Dependencies

- npm scripts already exist: `lint`, `typecheck`, `test`, `build`, `build-storybook`
- No existing GitHub workflows (clean slate)
- npm `publishConfig.access: public` already set

## Success Criteria

- [x] PRs blocked without passing CI (ci.yml created)
- [x] Tag push triggers npm publish with provenance (release.yml)
- [x] Storybook auto-deploys to GitHub Pages on release (deploy-docs job)
- [x] Node version pinned consistently (.nvmrc)
- [x] Commit messages validated locally via husky + commitlint
- [x] CHANGELOG.md follows Keep a Changelog format
- [x] Test coverage reported to Codecov (ci.yml updated)
- [x] Dependabot creates weekly PRs (dependabot.yml)
- [x] LICENSE file present
- [x] package.json has author and repository fields
- [ ] NPM_TOKEN secret added to GitHub (Phase 8)
- [ ] CODECOV_TOKEN secret added to GitHub (Phase 8)
- [ ] GitHub Pages enabled (Phase 8)
- [ ] Configure branch protection (Phase 8)
