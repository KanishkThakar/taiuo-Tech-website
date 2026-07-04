# Taiuo Tech — Website

**"Improve your looks without surgery."** AI-powered facial analysis & aesthetics platform — Phase 1 marketing website, built from `taiuo_tech_fable5_prompt_v3.md` (the master prompt with the full design system, copy, and phased roadmap).

## Stack

- **Next.js (App Router) + React 19 + TypeScript (strict)** — statically generated
- **Tailwind CSS v4** — design tokens in `app/globals.css` (`@theme`): sage palette, ink, Inter
- **GSAP + ScrollTrigger** — scroll reveals, timeline line-draws, hero parallax
- **Lenis** — smooth scroll · **Motion** — hero entrance, tab crossfades, mobile menu
- **Radix UI** — accessible tabs + accordion · **lucide-react** — icons
- **Supabase** — client ready in `lib/supabase.ts` (used from Phase 2 onward)
- **pnpm** — package manager

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (SSG)
```

## Structure

```
app/                 layout (fonts, metadata), page (17-section homepage), globals.css (tokens)
components/sections/ one component per page block (3.1–3.17 of the master prompt)
components/visuals/  React SVG visuals (face-scan hero, before/after faces, scenes, thumbs)
components/motion/   LenisProvider, GSAP Reveal, CountUp
lib/data.ts          all page copy as typed data
lib/supabase.ts      Supabase client factory (env-driven)
```

## Environment (Supabase)

1. Copy `.env.example` → `.env.local` and fill from Supabase Dashboard → Project Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

2. Run `supabase/schema.sql` once in Supabase Dashboard → SQL Editor — creates `profiles`,
   `analysis_requests`, and the private `face-photos` bucket with own-data-only RLS.
3. (Smoothest sign-up flow) Supabase Dashboard → Authentication → Sign In / Up →
   disable "Confirm email" — otherwise new users must confirm via email before logging in.

Auth pages: `/login`, `/signup` · Onboarding wizard: `/onboarding` (6 angle-labeled photo
uploads → storage + analysis request) · Status: `/dashboard`.

## Deploy (Vercel)

1. vercel.com → **Add New → Project** → import `KanishkThakar/taiuo-Tech-website`
2. Framework preset: Next.js (auto-detected). No extra config needed.
3. For Supabase: Vercel → project → **Integrations → Supabase** — links the Supabase project and sets the env vars automatically on every deploy.

## Roadmap

Phase 1 (this repo): marketing website — done.
Phase 2: product web app (auth → 6-photo upload → analysis → dashboard → report → protocol → progress → messaging → billing).
Phase 3: mobile app (React Native + Expo).
See Section 9 of the master prompt — one phase ships fully before the next starts.

## Before a public launch

The expert quotes, press names, and "50,000+" figures replicate the original reference
design for this pre-launch build — verify permissions/accuracy (or swap them) before
marketing the site publicly.
