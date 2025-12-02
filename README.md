# Sergi Marquez — Frontend Engineering Portfolio

This repo powers my personal site. It’s a home for my work and a reference architecture for how I like to build React/Next.js apps—typed boundaries, design tokens, shared primitives, and fully automated testing.

## Architecture Principles

- **Separation of concerns**: `app/` (routes), `components/` (UI), `lib/` (domain logic), `content/` (MDX), `styles/` (tokens)
- **Token-driven design system**: Framework-agnostic design tokens enable future extraction into standalone packages
- **Type-safe boundaries**: Strict TypeScript, zero-any policy, runtime validation with Zod
- **Accessibility-first**: Semantic HTML, ARIA, keyboard navigation, visible focus states
- **Performance by default**: Route-level code splitting, image optimization, font loading strategy

## Tech Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript** (strict)
- **MDX** for blog content
- **ESLint** (flat config) + **Prettier** (formatting)
- **Testing**: Jest + RTL (unit), Playwright (e2e)
- **CI/CD**: GitHub Actions (lint, typecheck, tests, build on PR)
- **Deployment**: Netlify with Next.js plugin

## Code Quality Enforcement

- **Pre-commit**: Husky + lint-staged (auto-fix ESLint, format with Prettier)
- **Pre-build**: TypeScript strict check + lint gate
- **CI**: Automated checks on every PR and push to main
- **Editor**: Format on save + ESLint auto-fix (configured via `.vscode/settings.json`)

This multi-layer enforcement ensures consistency, prevents broken builds, and maintains code quality at scale.

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build (runs typecheck + lint first)
- `npm run start` - Start production server (after build)
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript strict check
- `npm run test` - Jest + React Testing Library unit tests
- `npm run test:ci` - Run tests in CI mode
- `npm run test:e2e` - Playwright end-to-end tests
- `npm run test:e2e:ci` - Run e2e tests in CI mode
- `npm run format` - Format code with Prettier

## Project Structure

```
app/              # Next.js App Router routes
components/       # UI primitives and composites
  primitives/     # Design system components (Button, Card, Text, etc.)
lib/              # Domain logic, utilities, API clients
content/          # MDX blog posts
styles/           # Design tokens (colors, spacing, typography)
tests/            # Test utilities and setup
```

## Development Workflow

1. Code changes trigger ESLint + Prettier on save (via editor config)
2. Pre-commit hook validates staged files and auto-fixes where possible
3. CI runs full check suite on PR creation/updates
4. Build fails if typecheck or lint errors exist

## Deployment

This site is deployed on **Netlify** with automatic deployments from the `main` branch.

### Netlify Configuration

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 20
- Plugin: `@netlify/plugin-nextjs` (auto-installed)

### Environment Variables

Set `NEXT_PUBLIC_SITE_URL` in Netlify for proper sitemap and robots.txt generation:

- Production: `https://sergimarquez.com`
- Preview: `https://your-preview-url.netlify.app`

### Testing Deployment Locally

```bash
# Build the production bundle
npm run build

# Test the production server locally
npm run start
```

Visit `http://localhost:3000` to verify the production build works correctly.

## SEO & Metadata

- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Generated at `/robots.txt`
- **Open Graph**: Metadata configured for social sharing
- **404 Page**: Custom not-found page

## Design Decisions

- **No utility-first CSS**: Tokens + primitives approach enables better encapsulation and future extraction
- **Flat ESLint config**: Modern, maintainable, explicit rule configuration
- **Next 15 over 16**: Stable ecosystem for MDX, testing libs, predictable migrations
