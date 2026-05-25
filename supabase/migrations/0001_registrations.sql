-- Mission trip registrations.
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor.

create table if not exists public.registrations (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  trip_year        int  not null default 2026,
  participant_type text not null check (participant_type in ('youth', 'adult')),
  first_name       text not null,
  last_name        text not null,
  email            text not null,
  phone            text not null,
  grade            text,
  emergency_name   text not null,
  emergency_phone  text not null,
  medical_notes    text,
  needs_scholarship boolean not null default false,
  speaks_spanish   boolean not null default false
);

-- RLS on; only the service role (used by the server API route) may read/write.
-- The public anon key cannot touch this table directly.
alter table public.registrations enable row level security;

-- No anon/authenticated policies are created on purpose: inserts happen
-- exclusively through the server-side API route using the service role key,
-- which bypasses RLS. This keeps applicant PII private.

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);
