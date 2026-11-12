import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { outputRoot } from '../scripts/build.mjs';
import { resolvePublicPath } from '../scripts/serve.mjs';
import { projects, studies, papers } from '../src/data/projects.js';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => entry.isDirectory() ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return groups.flat();
}

test('toda página e recurso interno referenciado existe na saída pública', async () => {
  const files = await filesIn(outputRoot);
  const pages = files.filter((file) => file.endsWith('.html'));
  assert.equal(pages.length, 2 * (studies.length + 3));
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page);
    assert.match(html, /<html lang="(?:en|pt-BR)">/);
    assert.match(html, /<main id="content">/);
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
  assert.deepEqual(files.filter((file) => file.endsWith('.pdf')).sort(), ['assets/documents/academic-background-en.pdf', 'assets/documents/academic-background-pt.pdf', 'assets/documents/resume-en.pdf', 'assets/documents/resume-pt.pdf', 'assets/papers/enem-runner.pdf', 'assets/papers/tinyflow-edgenids.pdf']);
});

test('projetos preservam o estágio e as limitações das pesquisas', async () => {
  const home = await readFile(path.join(outputRoot, 'pt/index.html'), 'utf8');
  assert.match(home, /<h1 id="hero-title">Gabriel<br>Violante/);
  assert.match(home, /Ainda sem implementação ou resultados para apresentar/);
  assert.doesNotMatch(home, /href="\/projetos\/deteccao-de-abelhas/);
  await assert.rejects(stat(path.join(outputRoot, 'projetos/deteccao-de-abelhas/index.html')), { code: 'ENOENT' });
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

test('idiomas têm a mesma ordem de seções, alternância recíproca e CTAs utilizáveis', async () => {
  const ids = ['home', 'about', 'projects', 'papers', 'skills', 'contact'];
  for (const [lang, route, alternate] of [['en', 'index.html', '/pt/'], ['pt', 'pt/index.html', '/']]) {
    const html = await readFile(path.join(outputRoot, route), 'utf8');
    assert.deepEqual([...html.matchAll(/<section id="([^"]+)"/g)].map(match => match[1]), ids);
    const nav = html.match(/<nav id="site-nav"[^>]*>(.*?)<\/nav>/s)[1];
    assert.deepEqual([...nav.matchAll(/href="[^#"]+#([^"]+)"/g)].map(match => match[1]), ids);
    assert.match(html, new RegExp(`class="language-switch" href="${alternate}"`));
    assert.match(html, /class="button button-dark" href="mailto:gabriel\.violant@gmail\.com"/);
    assert.ok(html.includes(`/assets/documents/resume-${lang}.pdf`));
    assert.ok(html.includes(`/assets/documents/academic-background-${lang}.pdf`));
    assert.equal((html.match(/class="project-card"/g) || []).length, projects.length);
    assert.equal((html.match(/class="paper-card"/g) || []).length, papers.length);
    for (const p of projects) assert.ok(html.includes(p.href));
    for (const p of papers) assert.ok(html.includes(p.href));
  }
});

test('páginas traduzidas e metadados preservam o destino equivalente', async () => {
  const { homePage, projectPage } = await import('../src/templates.js');
  const html = homePage({ lang: 'en', siteUrl: 'https://portfolio.example' });
  assert.match(html, /rel="alternate" hreflang="pt-BR" href="https:\/\/portfolio.example\/pt\/"/);
  assert.match(html, /rel="canonical" href="https:\/\/portfolio.example\/"/);
  for (const study of studies) {
    const en = projectPage(study, { lang: 'en' });
    assert.ok(en.includes(`href="/projetos/${study.slug}/"`));
    assert.match(en, /<html lang="en">/);
    assert.doesNotMatch(en, /O desafio|Construção coletiva|Conhecer o projeto/);
  }
});
