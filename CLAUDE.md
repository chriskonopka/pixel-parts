# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Component Registry

**Before building any UI component, check `COMPONENTS.md` first.**

`COMPONENTS.md` lists all 46 components with their props. If what you need exists there, import it — do not reimplement it. If you build something new that is generic enough to belong in this library, mark it with a comment `// SHARED_CANDIDATE: belongs in pixel-parts`.

```ts
import { Button, Modal, Toast, SearchBox } from '@mwe-apps/pixel-parts';
```

---

## Commands

```bash
# Install dependencies
npm install
cd docs && npm install  # Storybook docs site has its own deps

# Build the library (output to lib/)
npm run build

# Run Storybook documentation site (port 6006)
npm run docs

# Lint
npm run lint

# Clean build output
npm run clean
```

---

## Architecture

**Pixel Parts** is a React component library published as `@mwe-apps/pixel-parts`. It is **not** a standalone app — it is an npm package consumed by other projects.

### Build System

**webpack 5 + Babel** — config in `webpack.config.js`, Babel config in `babel.config.json`. After bundling, SCSS files are copied to `lib/scss/` via `copy-webpack-plugin` so consumers can import tokens directly.

TypeScript declarations are emitted separately via `tsc --emitDeclarationOnly`.

Entry point: `src/index.ts` → compiled to `lib/index.js` + `lib/index.d.ts`.

### Adding a New Component

1. Create `src/libraries/pixelParts/components/ComponentName/` with:
   - `index.tsx` — component + named export
   - `ComponentName.module.scss` — scoped styles
   - `ComponentName.stories.tsx` — Storybook story
2. Register the export in `src/libraries/pixelParts/PixelPartsLibrary.ts`
3. Register again in `src/index.ts`
4. Add an entry to `COMPONENTS.md`

### Styling

**SCSS Modules** (`.module.scss`) for component-scoped styles. Global base styles in `src/libraries/pixelParts/styles/base.scss`.

Color/design tokens:
- `src/libraries/pixelParts/styles/variables.scss` — SCSS variables
- `src/libraries/pixelParts/styles/colors.ts` — TypeScript color exports

Dual branding: **MWE** (legacy) and **MWS** (modern) color palettes.

### Services

- `src/services/IndexedDBClient.ts` — IndexedDB wrapper with CRUD helpers. `setDbConfig(webpartName, pageId?)` builds a namespaced DB config.
- `src/services/cacheClient.ts` — cache layer on top of IndexedDBClient.

Exported via `src/services.ts`.

### Helpers

Pure utility functions in `src/helpers/`:
- `conversationHistoryHelper.ts` — chat history utilities
- `fileHelpers.ts` — file type/size utilities
- `iconHelpers.ts` — icon name mapping
- `stringHelpers.ts` — string formatting

Exported via `src/helpers.ts`.

### Release Process

```bash
npm run prerelease          # bumps to x.x.x-rc.N, tags, pushes
npm version [major|minor|patch] && git push --follow-tags
```

TypeScript: `strict` off, `noImplicitAny` off — match existing leniency when adding code.
