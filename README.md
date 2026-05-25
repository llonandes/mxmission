# Saint Mary's Mexican Mission Trip

A small, engaging, mobile-friendly website for Saint Mary's annual mission trip to
Tijuana, Mexico — a modern rebuild of stmarymissiontrip.com. Built with Next.js 16
(App Router), TypeScript, and Tailwind CSS v4, with an interactive registration form
backed by Supabase.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The site runs fully without any configuration. Until Supabase is connected, the
registration API validates and accepts submissions but logs them to the server
console instead of saving them (`persisted: false`).

## Connecting the registration database (Supabase)

1. Create (or pick) a Supabase project.
2. Run the migration in `supabase/migrations/0001_registrations.sql` — either with
   `supabase db push` (CLI) or by pasting it into the SQL editor. It creates the
   `registrations` table with RLS enabled (writes go only through the server, using
   the service-role key — applicant data is never exposed to the browser).
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Restart `npm run dev`. Submissions now persist (`persisted: true`).

## Editing trip content

All copy — dates, pricing, contacts, FAQs, eligibility, key dates — lives in
**`lib/site.ts`**. Update next year's trip there; every page reads from it.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
