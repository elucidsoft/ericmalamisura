# Eric Malamisura Portfolio

Astro portfolio site configured for GitHub Pages.

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

This repository includes a Pages workflow at `.github/workflows/deploy.yml`.

In GitHub, enable Pages with:

- Source: `GitHub Actions`
- Custom domain: `ericmalamisura.com`

The site URL is configured in `astro.config.mjs` and `src/consts.ts`.
