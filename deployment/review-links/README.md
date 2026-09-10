# Shareable Taiuo A/B entry links

- **A — couple campaign:** https://taiuo-option-a.vercel.app
- **B — platform preview:** https://taiuo-option-b.vercel.app

These are small, public Vercel production projects owned by `chindhru-2349s-projects`. Their root URLs return a temporary redirect to the corresponding `/review/a` or `/review/b` page on the existing website. This avoids sharing the main website root, which currently displays B, when a reviewer wants A.

The website remains the single source of both designs. No app, account data, environment credentials, or duplicate Next.js builds are deployed here. The entry links do not select a final design or change the main homepage.

## Redeploy

From `a/`, link to `taiuo-option-a`; from `b/`, link to `taiuo-option-b`:

```sh
vercel link --yes --project <project-name> --scope chindhru-2349s-projects
vercel deploy --prod --yes --scope chindhru-2349s-projects
```

## Verified 10 September 2026

Both deployments reported `READY`. Unauthenticated HTTP requests returned `307` with the exact corresponding review destination and `Cache-Control: public, max-age=0, must-revalidate`. Browser checks at 390px confirmed A selected with the couple image after opening the A entry link, and B selected with the platform preview after opening the B entry link. Neither required Vercel login.
