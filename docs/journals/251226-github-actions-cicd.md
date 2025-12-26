# GitHub Actions CI/CD Slog: 7 Phases of Config Hell

**Date**: 2025-12-26 02:35
**Severity**: Medium
**Component**: Infrastructure / CI/CD
**Status**: Ongoing

## What Happened

Implementing a "comprehensive" CI/CD pipeline for the library. We've plowed through 7 out of 8 planned phases, covering everything from basic CI (lint/test/build) to automated npm releases with provenance, Storybook deployments to GitHub Pages, and the inevitable sprawl of maintenance tools like Dependabot, Husky, and commitlint.

## The Brutal Truth

Setting up a modern library is 10% writing code and 90% wrestling with YAML and configuration files. It is soul-crushing to spend hours ensuring `provenance: true` works and that `commitlint` doesn't scream at a perfectly valid but slightly non-conforming message. We are 87.5% done, but the remaining 12.5% is the most irritating part: manual GitHub UI clicking. Secrets management and branch protection rules are the "last mile" of automation that isn't actually automated. It's frustrating that after all this work, a human still has to go into a web UI to paste a token.

## Technical Details

- **CI Pipeline**: Standard lint/typecheck/test/build suite on push/PR.
- **Release Flow**: Tag-triggered (`v*`) npm publish leveraging GitHub's OIDC provenance.
- **Storybook**: Automated deployment to GitHub Pages on release.
- **Artifacts**: Created `.github/workflows/ci.yml`, `release.yml`, `.github/dependabot.yml`, `.husky/commit-msg`, and updated `package.json` metadata.
- **Tracking**: Issue #2 on branch `feature/2-eslint-config`.

## What We Tried

Attempted a phased approach to isolate failures. The Release workflow was particularly finicky regarding permissions for `id-token: write`, which is required for npm provenance.

## Root Cause Analysis

The complexity isn't in any single tool, but in the brittle integration between them. GitHub Actions, npm, Storybook, and Codecov all have their own quirks and "required" configurations that often conflict or require specific, undocumented permissions.

## Lessons Learned

The overhead of "best practices" is massive. For a simple library, we now have more lines of configuration YAML and setup JS than actual business logic. If you don't start with a clear plan (like the 8-phase one used here), you will drown in the configuration noise.

## Next Steps

Phase 8 - The Manual Cleanup:
- Manually inject `NPM_TOKEN` and `CODECOV_TOKEN` into GitHub Secrets.
- Flip the switch on GitHub Pages.
- Set up branch protection because we can't trust humans to not force-push to master.
