// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://strelitzia.dev',
  integrations: [sitemap(), mdx()],
});