# Phase 4: Repository Configuration

## Overview

**Priority:** P2
**Status:** Pending
**Effort:** 30m

Configure GitHub repository settings for branch protection and secrets.

## Requirements

### Functional
- Require CI pass before merge
- Protect master branch
- Configure npm token secret

### Non-Functional
- Prevent accidental force pushes
- Clear PR requirements

## Manual Configuration Steps

### Step 1: Add NPM Token Secret

1. Generate npm token:
   - npmjs.com → Avatar → Access Tokens → Generate New Token
   - Select "Automation" type
   - Copy token

2. Add to GitHub:
   - Repository → Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: (paste token)

### Step 2: Enable GitHub Pages

1. Repository → Settings → Pages
2. Source: "GitHub Actions"
3. Save

### Step 3: Branch Protection (Optional but Recommended)

1. Repository → Settings → Branches
2. Add rule for `master`:
   - Require status checks before merging
   - Select "build" (from ci.yml)
   - Require branches to be up to date
   - (Optional) Require pull request reviews

## Verification Checklist

- [ ] NPM_TOKEN secret added
- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] Branch protection enabled for master
- [ ] Test PR shows required CI checks

## Security Notes

| Setting | Purpose |
|---------|---------|
| Automation token (not Publish) | Scoped for CI, not personal use |
| id-token permission | Enables npm provenance without storing long-lived secrets |
| Branch protection | Prevents bypassing CI |

## Troubleshooting

**npm publish fails with 401:**
- Verify NPM_TOKEN secret exists
- Check token hasn't expired
- Ensure token has publish scope

**GitHub Pages 404:**
- Verify Pages source is "GitHub Actions"
- Check `storybook-static` folder is generated
- Wait a few minutes after first deploy

## Success Criteria

- All secrets configured
- Branch protection active
- First release deploys successfully
