export function GET({ site }) {
  // Sem domínio configurado, não emitir URLs fictícias.
  const routes = site ? ['/', '/pt/', '/projects/', '/projetos/'] : [];
  const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${escapeXml(new URL(route, site).href)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
