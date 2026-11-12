import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projects } from '../src/data/projects.js';
import { homePage, catalogPage, projectPage, notFoundPage } from '../src/templates.js';

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
  // Copiar somente recursos explicitamente públicos; nunca a raiz do projeto.
  await cp(path.join(projectRoot, 'public'), outDir, { recursive: true });
  await cp(path.join(projectRoot, 'src/styles.css'), path.join(outDir, 'assets/styles.css'));
  await cp(path.join(projectRoot, 'src/client.js'), path.join(outDir, 'assets/client.js'));
  await cp(path.join(projectRoot, 'src/theme.js'), path.join(outDir, 'assets/theme.js'));
  const options = { siteUrl };
  const pages = [
    ['index.html', homePage(options)],
    ['projetos/index.html', catalogPage(options)],
    ...projects.map((project) => [`projetos/${project.slug}/index.html`, projectPage(project, options)]),
    ['404.html', notFoundPage(options)],
  ];
  for (const [file, html] of pages) {
    await mkdir(path.dirname(path.join(outDir, file)), { recursive: true });
    await writeFile(path.join(outDir, file), html);
  }
  const routes = ['/', '/projetos/', ...projects.map((project) => `/projetos/${project.slug}/`)];
  if (siteUrl) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(route, siteUrl).href}</loc></url>`).join('')}</urlset>\n`;
    await writeFile(path.join(outDir, 'sitemap.xml'), sitemap);
  }
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  console.log(`Construção concluída: ${pages.length} páginas em ${outDir}`);
  return pages.map(([file]) => file);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
