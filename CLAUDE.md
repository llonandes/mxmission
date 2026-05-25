# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Next.js 16 note:** see `@AGENTS.md` — this Next.js has breaking changes vs. older
> training data. Check `node_modules/next/dist/docs/` before using unfamiliar APIs.

## What this is

Marketing + registration site for **Saint Mary's Mexican Mission Trip** (Tijuana,
Mexico). A modern rebuild of stmarymissiontrip.com. Next.js 16 App Router +
TypeScript + Tailwind v4, with a Supabase-backed registration form.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build — also runs the TypeScript type-check
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next)
```

There is no test suite. `npm run build` is the primary correctness gate (it type-checks).

## Architecture

- **`lib/site.ts` is the single source of truth for all content** — trip dates,
  pricing, eligibility, the three "pillars," included items, key/meeting dates,
  contacts, email, and FAQs. The homepage and register page import from here. To
  update for a new year, edit this file; do not hardcode copy in components.

- **Homepage (`app/page.tsx`)** is one long landing page composed of section
  functions (Hero, Pillars, Impact, Details, Dates, Faq, ClosingCta). Nav links in
  the header are in-page anchors (`/#about`, `/#impact`, etc.). Sections wrap content
  in `<Reveal>` for scroll-in animation.

- **Registration flow:**
  - `components/RegisterForm.tsx` — client component, 4-step wizard (type → info →
    safety → review) with per-step validation. POSTs JSON to `/api/register`.
  - `app/api/register/route.ts` — re-validates server-side, maps camelCase fields to
    the snake_case DB row, inserts via the Supabase **service-role** client.
  - `lib/supabase.ts` — `getServiceClient()` returns `null` when env vars are absent.
    **This is intentional graceful degradation:** with no Supabase configured, the
    API logs the submission and returns `{ ok: true, persisted: false }` so the site
    works in dev/preview without a backend.

- **Data privacy:** the `registrations` table has RLS enabled with **no** anon
  policies. All writes go through the server route using the service-role key (which
  bypasses RLS). Never add a client-side Supabase insert or expose the service-role
  key to the browser. The anon/public key is not used anywhere.

## Conventions

- **Styling:** Tailwind v4 with a custom palette defined in `@theme` in
  `app/globals.css` (`clay-*` = terracotta, `cream`, `sand`, `teal-*`, `sun-*`,
  `ink`/`ink-soft`). Use these tokens, not raw hex. Fonts: `font-display`
  (Plus Jakarta Sans) for headings, body is Inter — both wired via `next/font` in
  `app/layout.tsx`.
- **Icons** are inline SVG components in `components/Icons.tsx` (no icon library).
- `Header`/`Footer` live in `app/layout.tsx` and wrap every route.

## Supabase setup

Schema lives in `supabase/migrations/0001_registrations.sql`. To enable persistence,
apply that migration to a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (see `.env.example`). A dedicated project
was not provisioned because the Supabase org was at its 2-active-free-project limit.
