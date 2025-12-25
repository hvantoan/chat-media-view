# Phase 4: Changelog & Conventional Commits

## Overview

**Priority:** P2
**Status:** Pending
**Effort:** 30m

Manual changelog with Keep a Changelog format + commit message enforcement via commitlint.

## Requirements

### Functional
- CHANGELOG.md in Keep a Changelog format
- Conventional Commits enforced locally (husky + commitlint)
- Block bad commit messages before they're created

### Non-Functional
- Zero CI overhead (local enforcement only)
- Developer-friendly error messages

## Files

| File | Action |
|------|--------|
| `/home/vif/chat-media-view/CHANGELOG.md` | Create |
| `/home/vif/chat-media-view/commitlint.config.js` | Create |
| `/home/vif/chat-media-view/.husky/commit-msg` | Create |
| `/home/vif/chat-media-view/package.json` | Modify (add prepare script) |

## Implementation

### Step 1: Install Dependencies

```bash
npm install -D @commitlint/cli @commitlint/config-conventional husky
```

### Step 2: Create CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial library setup with Vite, TypeScript, Vitest, Storybook

## [0.1.0] - 2025-12-25

### Added
- Project initialization
```

### Step 3: Create commitlint.config.js

```javascript
// /home/vif/chat-media-view/commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code restructuring
        'perf',     // Performance
        'test',     // Tests
        'build',    // Build system
        'ci',       // CI config
        'chore',    // Maintenance
        'revert',   // Revert commit
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};
```

### Step 4: Setup Husky

```bash
# Initialize husky
npx husky init

# Create commit-msg hook
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg
```

### Step 5: Add prepare script to package.json

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

## Conventional Commits Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Examples:**
- `feat: add image grid component`
- `fix(grid): correct aspect ratio calculation`
- `docs: update README with usage examples`
- `chore(deps): update vitest to v3.2.5`

## Changelog Update Process

When releasing:
1. Move items from `[Unreleased]` to new version section
2. Add release date
3. Commit: `chore(release): v1.0.0`
4. Tag: `git tag v1.0.0`
5. Push: `git push --follow-tags`

## Todo

- [ ] Install @commitlint/cli, @commitlint/config-conventional, husky
- [ ] Create CHANGELOG.md
- [ ] Create commitlint.config.js
- [ ] Initialize husky and create commit-msg hook
- [ ] Add prepare script to package.json
- [ ] Test with invalid commit message

## Success Criteria

- Invalid commit messages rejected locally
- CHANGELOG.md present with proper format
- New contributors get commitlint on `npm install`
