// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export const SITE = 'https://ericmalamisura.com';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
  },
});
