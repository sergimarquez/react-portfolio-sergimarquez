# Portfolio — Reusable Frontend Architecture Baseline

A production-ready Next.js architecture designed for modularity, scalability, and maintainability. Built as a reusable baseline for portfolio and future projects.

## Architecture Principles

- **Separation of concerns**: `app/` (routes), `components/` (UI), `lib/` (domain logic), `content/` (MDX), `styles/` (tokens)
- **Token-driven design system**: Framework-agnostic design tokens enable future extraction into standalone packages
- **Type-safe boundaries**: Strict TypeScript, zero-any policy, runtime validation with Zod
- **Accessibility-first**: Semantic HTML, ARIA, keyboard navigation, visible focus states
- **Performance by default**: Route-level code splitting, image optimization, font loading strategy

## Tech Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript** (strict)
- **MDX** for case studies and blog content
- **ESLint** (flat config) + **Prettier** (formatting)
- **Testing**: Jest + RTL (unit), Playwright (e2e)
- **CI/CD**: GitHub Actions (lint, typecheck, build on PR)

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
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript strict check
- `npm run format` - Format code with Prettier

## Project Structure

```
app/              # Next.js App Router routes
components/       # UI primitives and composites
  primitives/     # Design system components (Button, Card, Text, etc.)
lib/              # Domain logic, utilities, API clients
content/          # MDX files (case studies, blog posts)
styles/           # Design tokens (colors, spacing, typography)
tests/            # Test utilities and setup
```

## Development Workflow

1. Code changes trigger ESLint + Prettier on save (via editor config)
2. Pre-commit hook validates staged files and auto-fixes where possible
3. CI runs full check suite on PR creation/updates
4. Build fails if typecheck or lint errors exist

## Design Decisions

- **No utility-first CSS**: Tokens + primitives approach enables better encapsulation and future extraction
- **Flat ESLint config**: Modern, maintainable, explicit rule configuration
- **Next 15 over 16**: Stable ecosystem for MDX, testing libs, predictable migrations
