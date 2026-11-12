import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { build, outputRoot, projectRoot } from './build.mjs';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
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
      const body = await readFile(path.join(root, '404.html')).catch(() => Buffer.from('Página não encontrada.'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : body);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await build();
  const server = createServer();
  const port = Number(process.env.PORT || 4321);
  server.on('error', (error) => { console.error(`Não foi possível iniciar o servidor: ${error.message}`); process.exit(1); });
  server.listen(port, '127.0.0.1', () => console.log(`Portfólio local: http://localhost:${port}\nCtrl+C para encerrar.`));
  const watchers = [];
  if (process.argv.includes('--watch')) {
    let timer;
    let building = false;
    let pending = false;
    const rebuild = () => {
      if (building) { pending = true; return; }
      building = true;
      // Um processo novo lê módulos atualizados, sem cache de imports antigos.
      const child = spawn(process.execPath, ['scripts/build.mjs'], { cwd: projectRoot, stdio: 'inherit' });
      child.on('exit', (code) => {
        building = false;
        if (code === 0) console.log('Atualizado. Recarregue a página no navegador.');
        if (pending) { pending = false; rebuild(); }
      });
      child.on('error', (error) => { building = false; console.error(error.message); });
    };
    for (const directory of ['src', 'public']) {
      watchers.push(watch(path.join(projectRoot, directory), { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(rebuild, 150);
      }));
    }
    console.log('Acompanhando alterações em src/ e public/.');
  }
  const stop = () => { watchers.forEach((watcher) => watcher.close()); server.close(() => process.exit(0)); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}
