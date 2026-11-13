import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { homePage, catalogPage, notFoundPage } from '../src/templates.js';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const outputRoot = path.join(projectRoot, 'dist');

export async function build({ outDir = outputRoot, siteUrl = process.env.SITE_URL || '' } = {}) {
  if (siteUrl) {
    const url = new URL(siteUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('SITE_URL deve ser um endereço HTTP(S).');
    siteUrl = url.origin;
  }
  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, 'assets'), { recursive: true });
  // Somente imagens selecionadas e favicon. PDFs legados não são distribuídos.
  await cp(path.join(projectRoot, 'public/favicon.svg'), path.join(outDir, 'favicon.svg'));
  await cp(path.join(projectRoot, 'public/assets/images'), path.join(outDir, 'assets/images'), { recursive: true });
  await cp(path.join(projectRoot, 'src/styles.css'), path.join(outDir, 'assets/styles.css'));
  await cp(path.join(projectRoot, 'src/client.js'), path.join(outDir, 'assets/client.js'));
  await cp(path.join(projectRoot, 'src/theme.js'), path.join(outDir, 'assets/theme.js'));
  const pages = ['en', 'pt'].flatMap(lang => {
    const options = { siteUrl, lang };
    const prefix = lang === 'pt' ? 'projetos' : 'projects';
    return [
      [lang === 'pt' ? 'pt/index.html' : 'index.html', homePage(options)],
      [`${prefix}/index.html`, catalogPage(options)],
      [lang === 'pt' ? 'pt/404.html' : '404.html', notFoundPage(options)],
    ];
  });
  for (const [file, html] of pages) {
    await mkdir(path.dirname(path.join(outDir, file)), { recursive: true });
    await writeFile(path.join(outDir, file), html);
  }
  const routes = pages.filter(([file]) => file.endsWith('index.html')).map(([file]) => `/${file.replace('index.html', '')}`);
  if (siteUrl) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(route, siteUrl).href}</loc></url>`).join('')}</urlset>\n`;
    await writeFile(path.join(outDir, 'sitemap.xml'), sitemap);
  }
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  console.log(`Construção concluída: ${pages.length} páginas em ${outDir}`);
  return pages.map(([file]) => file);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
