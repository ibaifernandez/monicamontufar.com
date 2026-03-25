# monicamontufar.com

**Personal website for Mónica Montúfar** — VA freelance & designer.
Production-ready Coming Soon with multi-layer anti-spam waitlist, i18n ES/EN, full CI/CD, and zero critical tech debt.

[![Quality Gate](https://github.com/ibaifernandez/monicamontufar.com/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/ibaifernandez/monicamontufar.com/actions/workflows/quality-gate.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/monicamontufar-com/deploy-status)](https://monicamontufar.com)
[![Playwright Tests](https://img.shields.io/badge/playwright-10%2F10-green)](https://github.com/ibaifernandez/monicamontufar.com/actions)
[![Lighthouse Performance](https://img.shields.io/badge/lighthouse-100%2F100-green)](https://github.com/ibaifernandez/monicamontufar.com/actions)
[![QA Checks](https://img.shields.io/badge/QA%20checks-79%2F79-brightgreen)](./docs/QA-COMING-SOON.md)

---

## Live

🌐 **[monicamontufar.com](https://monicamontufar.com)** — Production (Netlify, auto-deploy from `main`)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build) — SSG, `output: static` |
| Language | TypeScript (strict mode) |
| Styles | [TailwindCSS 4](https://tailwindcss.com) — `@import "tailwindcss"`, no config.js |
| Typography | Inter Variable + Playfair Display Variable via `@fontsource-variable/*` (self-hosted) |
| Serverless | Netlify Functions (TypeScript) |
| Testing | Playwright + Axe-core (a11y) + Lighthouse CI |
| Error tracking | Sentry (`@sentry/astro`) |
| Email | [Resend](https://resend.com) — region sa-east-1 |
| Anti-bot | Cloudflare Turnstile (invisible) + honeypot + server-side validation |
| Monitoring | UptimeRobot — 3 HTTP monitors, 5 min interval |
| Deploy | Netlify — auto-deploy on push to `main` |

---

## Features

- **Coming Soon page** — ES (`/`) and EN (`/en/`) with bidirectional hreflang
- **Waitlist form** — captures emails, sends confirmation to subscriber + notification to Mónica
- **Multi-layer anti-spam** — Cloudflare Turnstile (invisible) + honeypot field + server-side validation
- **CI/CD Quality Gate** — Playwright visual regression + Axe-core a11y + Lighthouse CI, blocking merges to `main`
- **Lighthouse 100/100** — Performance, Accessibility, SEO, Best Practices
- **79/79 QA checks** — documented in [`docs/QA-COMING-SOON.md`](./docs/QA-COMING-SOON.md)
- **Real 404 page** — on-brand, returns HTTP 404 (not a soft 404)
- **Security headers** — X-Frame-Options, CSP, and more via `public/_headers`
- **Self-hosted fonts** — no render-blocking Google Fonts requests

---

## CI/CD Pipeline

```
PR to main
  → quality-gate.yml (GitHub Actions)
      → Playwright 10/10 (Docker: mcr.microsoft.com/playwright:v1.58.2-noble)
      → Lighthouse CI 100/100 (Performance / Accessibility / SEO / Best Practices)
  → Merge unblocked
      → Netlify auto-deploy
```

Playwright runs in Docker to guarantee identical visual regression snapshots between macOS local and Linux CI runners. Baselines are versioned in `/tests/visual/screenshots/`.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for email sending |
| `CONTACT_EMAIL` | Destination email (Mónica's inbox) |
| `FROM_EMAIL` | Sender address (verified Resend domain) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public) |
| `PUBLIC_SENTRY_DSN` | Sentry DSN for browser error tracking |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source map upload (CI only) |

---

## Testing

### Run Playwright tests locally

```bash
npm run test
```

### Run with Docker (matches CI environment exactly)

```bash
# Run tests
npm run test:visual:docker

# Update visual regression baselines
npm run test:visual:docker:update
```

> **Note:** If you modify visual components, CI will fail on visual regression until you regenerate the baselines with the Docker command above.

### Run Lighthouse CI

```bash
npm run lhci
```

---

## Project Structure

```
monicamontufar.com/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # Base layout — fonts, Sentry, head global
│   ├── components/
│   │   └── global/
│   │       └── SEO.astro           # Meta tags, OG, hreflang (alternateHref required)
│   └── pages/
│       ├── index.astro             # Home ES — waitlist form + countdown
│       ├── 404.astro               # On-brand 404 (real HTTP 404)
│       └── en/
│           └── index.astro         # Home EN — keep in sync with ES
├── netlify/
│   └── functions/
│       ├── submit-contact.ts       # Serverless: email via Resend
│       └── verify-turnstile.ts     # Serverless: Turnstile token verification
├── tests/
│   └── visual/
│       └── screenshots/            # Playwright visual regression baselines (versioned)
├── docs/
│   ├── QA-COMING-SOON.md          # QA report v2.1 — 79 checks with rationale
│   └── QA-COMING-SOON.csv         # QA checklist (importable)
├── public/
│   ├── _headers                   # Security headers
│   └── _redirects                 # Block .env, .git, wp-admin → 404
├── sentry.client.config.ts        # Sentry browser SDK init
├── astro.config.mjs               # Astro config + Sentry source maps
├── lighthouserc.cjs               # LHCI assertions with documented rationale per warn
├── playwright.config.ts           # Playwright config
├── netlify.toml                   # Netlify build config
├── AGENTS.md                      # Instructions for AI agents working on this repo
└── .env.example                   # Required env vars with descriptions
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to Netlify. Protected by Quality Gate CI. |
| `staging` | Active work — deploy preview per PR. |

All merges to `main` go through PR. The CI Quality Gate blocks merges that don't pass Playwright + LHCI.

---

## Known Limitations

These are documented `warn` entries in `lighthouserc.cjs` — accepted consciously, not bugs:

- `legacy-javascript` / `unused-javascript` — Sentry SDK internals (third-party limitation)
- `total-byte-weight` — Self-hosted variable fonts (~3.8 MB). Architectural decision: no render-blocking, no layout shift, acceptable for target audience.
- `dom-size-insight` (portfolio page) — Pending virtualization/pagination when portfolio content exists.

---

## Built by

**[Ibai Fernández](https://ibaifernandez.com)** — Vibe-Coder · AI Automation · Mail Marketing Director @ [LFi](https://lfi.agency) · Founder of [AGLAYA](https://aglaya.agency)

> *Why do it manually when a system can do it for you?*
