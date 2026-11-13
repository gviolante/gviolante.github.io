import { defineConfig } from 'astro/config';

let site;
if (process.env.SITE_URL) {
  const url = new URL(process.env.SITE_URL);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('SITE_URL deve usar HTTP(S).');
  site = url.origin;
}

export default defineConfig({
  site,
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'never' },
  server: { host: '127.0.0.1', port: 4321 },
  devToolbar: { enabled: false },
});
