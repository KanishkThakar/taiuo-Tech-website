# Brand portal entry points

The marketing footer can link to the Taiuo brand workspace and public ad
library. Keep `NEXT_PUBLIC_BRAND_PORTAL_ENABLED` unset until the corresponding
app release is deployed, then set it to `true` for the marketing build.

The app release includes `ramshaileshshah-maker/taiuo` PR #19 and migration
`0017_brand_library`. Follow that repository's `docs/BRAND_STUDIO.md` for durable
asset storage and first-administrator verification. Verify `/studio` sign-in and
`/ad-library` on `https://taiuo.com` before enabling the footer links.

After enabling the flag, build and release this website. Confirm that **For
brands** opens `https://taiuo.com/studio` and **Ad transparency** opens
`https://taiuo.com/ad-library` on desktop and mobile. The portal and app use their
existing sign-in; the marketing website does not receive account tokens.
