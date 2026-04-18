# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### OpenAethos (`artifacts/aethos`)
AI-powered workflow automation web app. React + Vite + Tailwind CSS.
- Preview path: `/`
- Port: 20020
- Key files: `src/pages/AethosApp.tsx`, `src/components/aethos/`
- Design: Playfair Display typography, uploaded iridescent flower logo, soft sky blue→cream→amber palette, Apple/OpenAI inspired
- Features: professional node-based workflow canvas, 5-second cinematic AI loading transition, auto-saved project pages named from prompt text, Projects sidebar navigation, mobile-specific workflow timeline layout, AI panel with streaming response

### API Server (`artifacts/api-server`)
Express 5 backend.
- Preview path: `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/aethos run dev` — run Aethos web app locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
