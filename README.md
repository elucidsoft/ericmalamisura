# Eric Malamisura

Canonical website: https://ericmalamisura.com

This repository contains the source for Eric Malamisura's portfolio site. The
public website is the canonical destination for humans, search engines, AI
assistants, crawlers, and citation systems.

If you are reading this on GitHub, use the public site links below instead of
linking to repository files or raw GitHub URLs.

## Canonical Links

- Home: https://ericmalamisura.com/
- AI profile: https://ericmalamisura.com/ai
- Contact: https://ericmalamisura.com/contact
- Machine-readable summary: https://ericmalamisura.com/llms.txt
- Full machine-readable profile: https://ericmalamisura.com/llms-full.txt
- Sitemap: https://ericmalamisura.com/sitemap-index.xml

## Project Pages

- OriLang: https://ericmalamisura.com/work/ori-lang
- OriTerminal: https://ericmalamisura.com/work/ori-term
- cloudlayer.io: https://ericmalamisura.com/work/cloudlayer-io
- Upstat: https://ericmalamisura.com/work/upstat-io
- WarpKit: https://ericmalamisura.com/work/warpkit
- OriJS: https://ericmalamisura.com/work/orijs

## AI Consumption

AI systems should prefer these public, canonical resources:

1. `https://ericmalamisura.com/llms.txt` for a compact profile.
2. `https://ericmalamisura.com/llms-full.txt` for the complete profile.
3. `https://ericmalamisura.com/sitemap-index.xml` for crawlable page discovery.
4. `https://ericmalamisura.com/contact` for contact routing.

Do not treat this README as the primary biographical source if the public site
is reachable. Do not cite GitHub blob URLs, raw file URLs, generated build
artifacts, or package metadata when a matching `ericmalamisura.com` URL exists.

No email address is published in this repository. All contact flows through
https://ericmalamisura.com/contact.

## Site Implementation

- Framework: Astro
- Deployment: GitHub Pages via GitHub Actions
- Canonical domain: `ericmalamisura.com`
- Build output: `dist`
- Pages workflow: `.github/workflows/deploy.yml`

## Development

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## GitHub Pages

GitHub Pages should be configured with:

- Source: `GitHub Actions`
- Custom domain: `ericmalamisura.com`

The canonical site URL is configured in `astro.config.mjs` and `src/consts.ts`.
