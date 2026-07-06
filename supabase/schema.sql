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

-- ═══════════════════════════════════════════════════════════════
-- V2 PRODUCT APP — additional tables (idempotent). Re-run safely.
-- Until this is applied the app shows elegant demo data (mock fallback).
-- ═══════════════════════════════════════════════════════════════

-- ── profiles: extra columns for the app ─────────────────────────
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists theme_pref text;
alter table public.profiles add column if not exists timezone text;
alter table public.profiles add column if not exists notif_prefs jsonb;
alter table public.profiles add column if not exists plan text default 'free';
alter table public.profiles add column if not exists role text default 'user';

-- ── face_scans: AI analysis results (metrics as jsonb) ──────────
create table if not exists public.face_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  overall_score integer not null default 0,
  confidence integer not null default 90,
  metrics jsonb not null default '[]'::jsonb,
  image_path text,
  created_at timestamptz not null default now()
);
alter table public.face_scans enable row level security;
drop policy if exists "face_scans select own" on public.face_scans;
create policy "face_scans select own" on public.face_scans
  for select using (auth.uid() = user_id);
drop policy if exists "face_scans insert own" on public.face_scans;
create policy "face_scans insert own" on public.face_scans
  for insert with check (auth.uid() = user_id);
drop policy if exists "face_scans delete own" on public.face_scans;
create policy "face_scans delete own" on public.face_scans
  for delete using (auth.uid() = user_id);

-- ── habits + logs ───────────────────────────────────────────────
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  icon text default 'check',
  cadence text default 'Daily',
  streak integer not null default 0,
  done_today boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.habits enable row level security;
drop policy if exists "habits all own" on public.habits;
create policy "habits all own" on public.habits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── notifications ───────────────────────────────────────────────
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null default 'system',
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
drop policy if exists "notifications all own" on public.notifications;
create policy "notifications all own" on public.notifications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── avatars bucket (public read, owner-write) ───────────────────
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars write own" on storage.objects;
create policy "avatars write own" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars update own" on storage.objects;
create policy "avatars update own" on storage.objects
  for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );
