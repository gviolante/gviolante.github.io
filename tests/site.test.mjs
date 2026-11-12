import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { outputRoot } from '../scripts/build.mjs';
import { resolvePublicPath } from '../scripts/serve.mjs';
import { projects } from '../src/data/projects.js';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => entry.isDirectory() ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return groups.flat();
}

test('toda página e recurso interno referenciado existe na saída pública', async () => {
  const files = await filesIn(outputRoot);
  const pages = files.filter((file) => file.endsWith('.html'));
  assert.equal(pages.length, projects.length + 3);
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page);
    assert.match(html, /<html lang="pt-BR">/);
    assert.match(html, /<main id="conteudo">/);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = match[1];
      if (!url.startsWith('/') && !url.startsWith('#')) continue;
      const [pathname, fragment] = url.split('#');
      let target = pathname ? path.join(outputRoot, pathname) : page;
      if (pathname.endsWith('/')) target = path.join(target, 'index.html');
      assert.ok((await stat(target)).isFile(), `${page}: ${url}`);
      if (fragment) {
        const destination = await readFile(target, 'utf8');
        assert.ok(destination.includes(`id="${fragment}"`), `Âncora não encontrada: ${url}`);
      }
    }
  }
});

test('documentos pessoais e arquivos de desenvolvimento não entram na publicação', async () => {
  const files = (await filesIn(outputRoot)).map((file) => path.relative(outputRoot, file));
  assert.ok(files.every((file) => !/personalContext|Historico|curriculo_geral|CONTEXTO|ideas\.md|package\.json|AGENTS|\.env/i.test(file)));
  assert.deepEqual(files.filter((file) => file.endsWith('.pdf')).sort(), ['assets/papers/enem-runner.pdf', 'assets/papers/tinyflow-edgenids.pdf']);
});

test('projetos preservam o estágio e as limitações das pesquisas', async () => {
  const bees = await readFile(path.join(outputRoot, 'projetos/deteccao-de-abelhas/index.html'), 'utf8');
  assert.match(bees, /Pesquisa em andamento/);
  assert.match(bees, /ainda não um resultado demonstrado/);
  const tinyflow = await readFile(path.join(outputRoot, 'projetos/tinyflow-edgenids/index.html'), 'utf8');
  assert.match(tinyflow, /resultados de modelos distintos/);
  assert.match(tinyflow, /embeddings pré-computados/);
  const game = await readFile(path.join(outputRoot, 'projetos/enem-runner/index.html'), 'utf8');
  assert.match(game, /pessoas vendadas/);
});

test('servidor restringe navegação à pasta pública', () => {
  assert.equal(resolvePublicPath('/../../personalContext/HistoricoEscolar.pdf'), null);
  assert.equal(resolvePublicPath('/%2e%2e/%2e%2e/ideas.md'), null);
  assert.equal(resolvePublicPath('/%00'), null);
  assert.equal(resolvePublicPath('/..%5cideas.md'), null);
  assert.throws(() => resolvePublicPath('/%XX'), URIError);
  assert.equal(resolvePublicPath('/assets/styles.css?version=1'), path.join(outputRoot, 'assets/styles.css'));
});
