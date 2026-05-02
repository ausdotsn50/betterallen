# AGENTS.md

## Commands

```bash
npm run dev          # Dev server (localhost:5173)
npm run dev:yaml     # Convert YAML→JSON then start dev
npm run build        # tsc -b && vite build
npm run lint         # ESLint
npm run lint:fix     # ESLint --fix
npm run format       # Prettier --write
npm run format:check # Prettier --check
npm run setup        # Interactive starter-kit config
```

No test framework is configured. Verification = `npm run lint && npm run build`.

Pre-commit: husky → lint-staged (eslint + prettier on staged files).

## Adding a Service, Government, or Tourism Category

Three files must be updated — missing any one breaks the build:

1. `src/data/services.yaml`, `src/data/government.yaml`, or `src/data/tourism.yaml` — add category entry (icon must be a valid Lucide React name)
2. `content/{services|government|tourism}/{slug}/index.yaml` — create with `pages:` array (services/government) or `places:` array (tourism)
3. Register the new category in the appropriate loader:
   - Services/Government: `src/data/yamlLoader.ts` — add a static `import` of the new `index.yaml?raw` and register it in `categoryIndexMap`
   - Tourism: `src/data/tourismLoader.ts` — add a static `import` of the new `index.yaml?raw` and register it in `categoryIndexMap`

The imports in the loader files are static, so new categories **must** be registered there. This is the most common mistake.

## Content System

- Markdown loaded dynamically via `import()` in `src/lib/markdownLoader.ts`
- Companion `{slug}.json` files alongside `.md` files provide `{PLACEHOLDER}` interpolation data
- Placeholder resolution: companion JSON → `VITE_<KEY>` env var → leave unchanged
- Title extracted from first `# Heading`, description from first paragraph

## Architecture

- React 19 + TypeScript + Vite 7 + Tailwind CSS v4
- Path alias: `@/*` → `./src/*`
- shadcn/radix components configured via `components.json` (UI in `src/components/ui/`)
- Routes in `src/App.tsx`: `/`, `/services/:category`, `/government/:category`, `/tourism/:category`, `/:documentSlug`, `/:lang/:documentSlug`
- i18next with HttpBackend; translations in `public/locales/{lang}/common.json`; only `en` exists currently

## Environment

- Copy `env.example` → `.env.local` (gitignored)
- Key var: `VITE_GOVERNMENT_NAME`
- Setup script (`npm run setup`) generates `.env.local` interactively

## Code Style

- Single quotes, 2-space indent, trailing commas (ES5), semicolons, 80-char max
- Arrow parens: `avoid` (enforced by Prettier)
- Run `npm run format` before committing to avoid CI friction

## Other

- Deploy target: Vercel (`vercel.json`)
- Terraform config in `terraform/` for infra
- `@bettergov/kapwa` provides shared LGU components
