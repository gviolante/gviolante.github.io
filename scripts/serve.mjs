import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const outputRoot = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** Resolve somente caminhos dentro da saída pública, inclusive após decodificação. */
export function resolvePublicPath(requestUrl, root = outputRoot) {
  const decoded = decodeURIComponent(requestUrl.split('?')[0]);
  if (decoded.includes('\0') || decoded.includes('\\')) return null;
  const filename = path.resolve(root, `.${decoded.startsWith('/') ? decoded : `/${decoded}`}`);
  return filename === root || filename.startsWith(`${root}${path.sep}`) ? filename : null;
}

export function createServer(root = outputRoot) {
  return http.createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('Cache-Control', 'no-cache');
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let filename;
    try { filename = resolvePublicPath(request.url, root); }
    catch { response.writeHead(400).end('Endereço inválido.'); return; }
    if (!filename) { response.writeHead(403).end('Acesso indisponível.'); return; }
    try {
      if ((await stat(filename)).isDirectory()) {
        const pathname = request.url.split('?')[0];
        if (!pathname.endsWith('/')) {
          response.writeHead(301, { Location: `${pathname}/${request.url.includes('?') ? `?${request.url.split('?')[1]}` : ''}` }).end();
          return;
        }
        filename = path.join(filename, 'index.html');
      }
      const body = await readFile(filename);
      response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filename)] || 'application/octet-stream' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      const portuguese = /^\/(?:pt|projetos)(?:\/|\?|$)/.test(request.url);
      const body = await readFile(path.join(root, portuguese ? 'pt/404/index.html' : '404.html')).catch(() => Buffer.from('Page not found.'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : body);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createServer();
  const port = Number(process.env.PORT || 4321);
  server.on('error', (error) => { console.error(`Não foi possível iniciar o servidor: ${error.message}`); process.exit(1); });
  server.listen(port, '127.0.0.1', () => console.log(`Portfólio local: http://localhost:${port}\nCtrl+C para encerrar.`));
  const stop = () => { server.close(() => process.exit(0)); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}
