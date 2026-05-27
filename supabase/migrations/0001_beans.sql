-- Migration 0001: beans table
-- Applied: 2026-05-26

create table beans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country text not null,
  region text not null,
  latitude numeric,
  longitude numeric,
  altitude_m int,
  process text check (process in ('washed', 'natural', 'honey')),
  variety text,
  tasting_notes text[],
  flavor_profile text check (flavor_profile in ('sour', 'sweet', 'bitter', 'balanced')),
  roast_level text check (roast_level in ('light', 'medium', 'dark')),
  price_250g int not null,
  price_1kg int not null,
  description text,
  story text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table beans enable row level security;
create policy "Public read active beans" on beans for select using (is_active = true);
