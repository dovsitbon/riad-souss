import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export const SITE_URL = 'https://riad-souss.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|mentions-legales|confidentialite)$/.test(page),
    }),
  ],
});
