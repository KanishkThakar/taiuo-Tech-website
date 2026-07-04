-- ═══════════════════════════════════════════════════════════════
-- TAIUO — Supabase schema (run ONCE in Dashboard → SQL Editor)
-- Creates: profiles, analysis_requests, the private face-photos
-- storage bucket, and row-level security so users only ever see
-- their own data and photos.
-- ═══════════════════════════════════════════════════════════════

-- ── profiles ────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  birth_year integer,
  gender text,
  goals text[],
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- ── analysis requests ───────────────────────────────────────────
create table if not exists public.analysis_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'processing',
  created_at timestamptz not null default now()
);

alter table public.analysis_requests enable row level security;

drop policy if exists "requests select own" on public.analysis_requests;
create policy "requests select own" on public.analysis_requests
  for select using (auth.uid() = user_id);

drop policy if exists "requests insert own" on public.analysis_requests;
create policy "requests insert own" on public.analysis_requests
  for insert with check (auth.uid() = user_id);

-- ── private storage bucket for the 6 onboarding photos ──────────
insert into storage.buckets (id, name, public)
values ('face-photos', 'face-photos', false)
on conflict (id) do nothing;

-- users can only touch objects inside their own {uid}/ folder
drop policy if exists "face-photos read own" on storage.objects;
create policy "face-photos read own" on storage.objects
  for select using (
    bucket_id = 'face-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "face-photos upload own" on storage.objects;
create policy "face-photos upload own" on storage.objects
  for insert with check (
    bucket_id = 'face-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "face-photos update own" on storage.objects;
create policy "face-photos update own" on storage.objects
  for update using (
    bucket_id = 'face-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "face-photos delete own" on storage.objects;
create policy "face-photos delete own" on storage.objects
  for delete using (
    bucket_id = 'face-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
