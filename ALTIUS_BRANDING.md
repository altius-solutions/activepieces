# Altius Flow branding

This fork is the Community edition of Activepieces, white-labeled as **Altius Flow** for [Altius Solutions](https://altiusol.com). The MIT `LICENSE` file and its copyright notice stay intact. Enterprise directories (`packages/ee`, `packages/server/api/src/app/ee`) are not copied from and are not required for this rebrand. Run it as Community edition (`AP_EDITION` unset or `ce`).

Package names, piece ids (`@activepieces/piece-*`), and HTTP APIs are unchanged so pieces and upstream merges keep working.

## Change the brand in one file

Edit `packages/core/shared/src/lib/core/common/brand.ts`.

That file is the product name, company name, colors, logo paths, external links, and the switches for the “Built with” credit, enterprise/cloud upsells, and the upstream newsletter signup. The Community edition theme (`packages/server/api/src/app/flags/theme.ts`) is built from it and served on the `THEME` flag. The web app reads that flag for the browser title, favicon, sidebar, sign-in wordmark, accent color, and help links.

After editing the file, bump the patch or minor version in `packages/core/shared/package.json` (this repo treats any shared change as a version bump) and rebuild.

### What the defaults are

| | |
| --- | --- |
| Product | Altius Flow |
| Company | Altius Solutions |
| Primary / hover | `#4F46E5` / `#4338CA` |
| Wordmark | ALTIUS `#1E1B4B`, SOLUTIONS `#6366F1` (on dark: `#F8FAFC` / `#A5B4FC`) |
| Links | `https://altiusol.com` (docs, community, support, pricing, changelog, privacy, terms) |
| Powered-by credit | off |
| Enterprise / cloud upsells | off |
| Newsletter posted to Activepieces | off |

Buttons use the primary color. Hover is the CSS variable `--brand-primary-hover`. The rest of the accent ramp is generated from the primary seed. The sidebar uses `--brand-sidebar` (`#EEF2FF` in light mode, `#1E1B4B` in dark mode) and the product name uses `--brand-navy`.

### Logos

| File | Use |
| --- | --- |
| `packages/web/public/brand/altius-wordmark.svg` | Full wordmark on light surfaces |
| `packages/web/public/brand/altius-wordmark-on-dark.svg` | Same wordmark for dark surfaces |
| `packages/web/public/brand/altius-wordmark.png` | Email logo (many clients do not render SVG) |
| `packages/web/public/brand/altius-wordmark-on-dark.png` | Dark wordmark, raster |
| `packages/web/public/brand/altius-icon.svg` | Square “A” mark, favicon, sidebar |
| `packages/web/public/logo.svg`, `favicon.ico`, `logo-180.png`, `logo-192.png` | Static favicon / apple touch icon |

New platforms store the PNG as their email logo. The app chrome uses the SVG from the theme flag. Set `AP_FRONTEND_URL` so those paths are absolute in emails.

## Optional environment overrides

Set these on the API process and restart. They override `brand.ts` for that process only. The browser picks up name, colors, logos, links, the powered-by flag, and the upsell switch from the theme flag, so a frontend rebuild is not required for these.

| Variable | Overrides |
| --- | --- |
| `AP_BRAND_PRODUCT_NAME` | Product name (title, sidebar, emails’ fallback name) |
| `AP_BRAND_COMPANY_NAME` | Company name |
| `AP_BRAND_PRIMARY_COLOR` | Primary color (`#RRGGBB`) |
| `AP_BRAND_PRIMARY_HOVER` | Button hover |
| `AP_BRAND_WEBSITE_URL` | Default for every link below |
| `AP_BRAND_DOCS_URL` | Documentation |
| `AP_BRAND_COMMUNITY_URL` | Community |
| `AP_BRAND_SUPPORT_URL` | Support |
| `AP_BRAND_PRICING_URL` | Pricing |
| `AP_BRAND_CHANGELOG_URL` | Changelog |
| `AP_BRAND_PRIVACY_URL` | Privacy |
| `AP_BRAND_TERMS_URL` | Terms |
| `AP_BRAND_SALES_URL` | Sales |
| `AP_BRAND_FEEDBACK_URL` | Feedback / request a piece |
| `AP_BRAND_FULL_LOGO_URL` | Light wordmark |
| `AP_BRAND_FULL_LOGO_DARK_URL` | Dark wordmark |
| `AP_BRAND_EMAIL_LOGO_URL` | Logo stored on new platforms for email |
| `AP_BRAND_FAVICON_URL` | Favicon |
| `AP_BRAND_LOGO_ICON_URL` | Square icon |
| `AP_BRAND_SHOW_POWERED_BY` | `true` shows “Built with Altius Flow” on forms |
| `AP_BRAND_SHOW_ENTERPRISE_UPSELLS` | `true` shows upgrade / sales / “switch to Enterprise” links |
| `AP_BRAND_FORWARD_NEWSLETTER` | `true` posts sign-up emails to the upstream Activepieces newsletter |

Sentence-level copy in the web app (`{productName}` in translation strings) reads `brand.productName` from the file. Change the file when the product name in those sentences should move too.

A doc link that does not end in `/docs` is used as-is (the company site). A link that ends in `/docs` keeps the original path appended, which is how you point a self-hosted docs site back at Activepieces-style URLs.

## Emails

Verification, password reset, and invitation templates live in `packages/server/api/src/assets/emails/`. They already take `{{platformName}}`, `{{fullLogoUrl}}`, and `{{primaryColor}}`. Community edition fills those from the platform row created at sign-up, which copies the Altius color and the PNG logo. The visible platform name in the message is the workspace name the user signed up with. Set `AP_SMTP_SENDER_NAME=Altius Flow` (and a real `AP_SMTP_*` host) so the From line matches. The cloud-only postal footer is not rendered on Community edition.

## What this rebrand deliberately does not change

- Piece package ids, the piece CDN (`cdn.activepieces.com`), and cloud piece sync. Those are how integrations load.
- OAuth broker hosts (`secrets.activepieces.com`). Community cloud-managed OAuth still uses them when `AP_CLOUD_AUTH_ENABLED` is on.
- SAML entity id `Activepieces`. Changing it would break existing identity-provider setups.
- The upstream telemetry default in code (`AP_TELEMETRY_ENABLED` defaults to `true` and reports to Activepieces). Set `AP_TELEMETRY_ENABLED=false` on any Altius install. `.env.example` and `.env.dev` do this.
- The `docs/` site in this repo. It is the upstream handbook, kept so merges stay readable. In-app documentation links go to https://altiusol.com.

## Merging a future Activepieces release

1. Fetch the upstream tag and merge it into this fork. Expect conflicts in the files below; keep the Altius side unless upstream moved the same behavior to a new file.
2. Re-apply `brand.ts` if the merge replaced it. The theme, flags, and web shell should keep calling `resolvedBrand()` / the `THEME` flag rather than hard-coding a name.
3. Search the merge diff for new user-visible `Activepieces` strings and `activepieces.com` links (skip `cdn.activepieces.com`, `secrets.activepieces.com`, piece ids, and `packages/**/ee/**`). Point new docs/community/support/pricing links at `brandDocsUrl()` or `flagsHooks.useBrandLinks()`.
4. Do not take changes under `packages/ee` or `packages/server/api/src/app/ee` into the Community build path.
5. Confirm `LICENSE` still contains the Activepieces Inc. copyright and the MIT grant.
6. Rebuild, sign up on a fresh Community database, and check the sign-in page, the flows home, and the builder. Title, favicon, wordmark, sidebar, and buttons should be Altius, with no “Powered by Activepieces” and no upgrade link to activepieces.com.

### Files that usually conflict

- `packages/core/shared/src/lib/core/common/brand.ts` (and `package.json` version)
- `packages/core/shared/src/lib/core/common/brand-colors.ts` (default accent `#4F46E5`)
- `packages/core/shared/src/lib/core/support-url.ts` and `feedback-url.ts`
- `packages/server/api/src/app/flags/theme.ts` and `flag.service.ts`
- `packages/web/vite.config.mts`, `packages/web/src/styles.css`
- `packages/web/src/components/custom/full-logo.tsx` and `show-powered-by.tsx`
- `packages/web/public/brand/*`, `logo.svg`, `favicon.ico`, `logo-180.png`, `logo-192.png`
- `packages/web/public/locales/en/translation.json` (keys that used to say Activepieces)

New upstream screens will not know about this file until that search in step 3. The theme flag still covers title, color, and logos without touching those screens.
