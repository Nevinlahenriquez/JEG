-- JEG: QuickBooks connections. Run once in JEG's OWN Supabase project (SQL editor).
-- One row per island. Tokens are only ever read by the server (service key); RLS on, no policies.
create table if not exists public.qbo_connections (
  island text primary key check (island in ('cw','aw')),
  realm_id text not null,
  access_token text not null,
  refresh_token text not null,
  access_expires_at timestamptz not null,
  refresh_expires_at timestamptz not null,
  last_sync_at timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.qbo_connections enable row level security;
