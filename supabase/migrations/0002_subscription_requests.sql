-- Migration 0002: subscription_requests table
-- Applied: 2026-05-26

create table subscription_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  tier text not null check (tier in ('znakomstvo', 'postoyanstvo', 'otkryvatel')),
  bean_id uuid references beans(id),
  name text not null,
  phone text not null,
  email text not null,
  address text not null,
  notes text,
  status text default 'new' check (status in ('new', 'contacted', 'active', 'cancelled'))
);

alter table subscription_requests enable row level security;

-- Policy: anonymous form submission allowed
-- Note: with new Supabase publishable-key format, role must be 'anon' explicitly
create policy "Anonymous can submit" on subscription_requests
  for insert
  to anon
  with check (true);
