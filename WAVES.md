# Product-app build — wave completion audit

Maps each of the 25 planned waves to the concrete work, the commit that carried
it, and how it was verified. Branch: `feat/product-app` (PR #1). Marketing waves
that predate this branch reference commits on `master`.

Every listed commit passed the same gate before it landed: `pnpm typecheck`,
`pnpm lint`, `pnpm build`, and (where relevant) `pnpm test` / `pnpm test:e2e`.

| Wave | Scope | Where it landed | Verification |
|------|-------|-----------------|--------------|
| W1 | Repo audit & plan | pre-build review of `app/`, `components/`, `lib/`; plan in session | informed every later wave |
| W2 | Refactor structure, hooks, utils, TS | `6272b1d` — `lib/product/*` (types/services/mock/format), `components/app/*`, `hooks.ts`; strict TS incl. `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` | typecheck clean |
| W3 | Global UI, spacing, type, responsive | `6272b1d` — app tokens in `globals.css`, `.app-card`/`.app-input` etc. | build; visual QA |
| W4 | Nav, header, footer, layouts | `6272b1d` — `AppShell` sidebar + topbar + mobile drawer; route-group `layout.tsx` | visual QA light+dark |
| W5 | Buttons, forms, cards, tables, reusable UI | `6272b1d` + `5f6ec47` — shared classes, `charts.tsx`, admin members table | visual QA |
| W6 | Animations, transitions, loading, micro-interactions | `6272b1d` — `motion` stagger, skeletons, scan-line; inherits root `MotionConfig reducedMotion="user"` | visual QA |
| W7 | Auth (Google/Apple/Email), sessions | `61b3f8a` — OAuth buttons, `/auth/callback` (PKCE), forgot/reset password, session gate | visual QA of login/forgot |
| W8 | Onboarding, profile setup, permissions | `app/onboarding` (pre-existing) verified against `schema.sql` (`analysis_requests` + `face-photos` bucket) | build; schema cross-check |
| W9 | Profile, account, settings, notifications, privacy | `6272b1d` (profile/settings) + `5f6ec47` (notifications center) | axe clean both themes |
| W10 | Dashboard, analytics, charts, widgets | `6272b1d` — health radial, weekly trend, metric bars, insights, habits, achievements | visual QA light+dark |
| W11 | Face scan UI, camera, scan animations | `6272b1d` — getUserMedia flow, FaceMesh overlay, scan-line, simulated result | visual QA |
| W12 | Scan history, reports, progress | `6272b1d` — `/history` timeline, `/reports` marker breakdown | visual QA |
| W13 | Search, command palette, assistant, quick actions | `6272b1d` (⌘K palette) + `33a6581` (scripted private assistant + quick actions) | functional + axe |
| W14 | Landing polish (hero, features, pricing, FAQ) | pre-existing marketing (`master`: `6aa987b`, `130c2b4`, …), left intact per brand rule | lighthouse a11y/BP/SEO 100 |
| W15 | Mobile/tablet/desktop responsive | `d5fea7e` — 390px sweep, no horizontal overflow on any app route | axe/overflow script |
| W16 | Accessibility (ARIA, keyboard, SR) | `d5fea7e` + `38af868` + `225c0ae` — AA contrast both themes, dialog roles, Escape/focus-trap/restore | axe 0 serious/critical; keyboard test |
| W17 | Performance | investigated (`6272b1d` app chunks split; marketing already lazy-loads + defers Lenis) — see note below | size-limit within budget; lhci |
| W18 | Admin dashboard foundation | `5f6ec47` — `/admin` KPIs, charts, members table, activity; role-gated | visual QA + axe |
| W19 | API-ready architecture, services, error handling | `6272b1d` (service layer + mock fallback) + `8ba6838` (route + global error boundaries) | build; 404/error render |
| W20 | Theme, dark/light, branding polish | `6272b1d` — light/dark/system scoped to `.app-theme`; fixed a real theme-apply bug | visual QA both themes |
| W21 | Bug fixing, edge cases, cross-browser | `d5fea7e` (dark-theme + contrast bugs) + `4ce4d28` (e2e hydration-race flake) | e2e 18/18 chromium/webkit/mobile |
| W22 | Cleanup, dedup, documentation | `4ce4d28` (README app section) + this file | — |
| W23 | Security review & hardening | `e3c242f` — `is_admin()` + admin RLS on profiles/face_scans/requests; CSP/Permissions-Policy already tight | schema review |
| W24 | Final UI/UX polish, consistency | `38af868` + across — consistent dialog semantics, spacing, hover/active states | visual QA |
| W25 | Final QA & deployment readiness | a11y **100** · best-practices **100** · SEO **100** · typecheck/lint clean · unit 21/21 · e2e 18/18 | lhci + full suite |

## W17 / W25 performance — the one non-passing number

Lighthouse **mobile** performance on `/` is ~0.50, below the 95 target. This was
investigated, not waved away:

- It is **CPU-throttle-bound hydration**, not assets: FCP/LCP 4.0s, TBT 1,210ms,
  main-thread work 10.7s, but the largest Lighthouse *opportunity* is ~50ms.
  CSS is 13 kB, images pass budget, CLS is 0.
- The homepage is already optimized: Lenis smooth-scroll is dynamic-imported
  after first paint, below-the-fold sections are `dynamic()`, only 5/18 sections
  are client components.
- Reaching 95 requires removing the hero entrance animations and smooth-scroll —
  which the project's brand-preservation rules explicitly forbid.

The project owner was asked directly and chose **"keep the brand, accept the
warning."** The repo's own `lighthouserc.json` already gates performance as a
non-blocking **warning** (not an error) for this reason; a11y / best-practices /
SEO are hard-gated at 100 and pass. Real-device LCP ≈ 1s.
