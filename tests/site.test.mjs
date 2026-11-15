import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { outputRoot, resolvePublicPath } from '../scripts/serve.mjs';
import { projects, papers } from '../src/data/projects.js';
import { documentLinks } from '../src/data/document-links.js';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => entry.isDirectory() ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return groups.flat();
}

test('toda página e recurso interno referenciado existe na saída pública', async () => {
  const files = await filesIn(outputRoot);
  const pages = files.filter((file) => file.endsWith('.html'));
  assert.equal(pages.length, 6);
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
  assert.deepEqual(files.filter((file) => file.endsWith('.pdf')).sort(), []);
});

test('projetos preservam o estágio e as limitações das pesquisas', async () => {
  const home = await readFile(path.join(outputRoot, 'pt/index.html'), 'utf8');
  assert.match(home, /<h1 id="hero-title">Gabriel<br\s*\/?><span class="hero-surname">Violante<\/span>/);
  assert.match(home, /Ainda sem implementação ou resultados para apresentar/);
  assert.doesNotMatch(home, /href="\/projetos\/deteccao-de-abelhas/);
  await assert.rejects(stat(path.join(outputRoot, 'projetos/deteccao-de-abelhas/index.html')), { code: 'ENOENT' });
  assert.match(home, /embeddings pré-computados/);
  assert.match(home, /pessoas vendadas/);
  const projectsSection = home.split('<section id="projects"')[1].split('<section id="papers"')[0];
  assert.doesNotMatch(projectsSection, /VALE/);

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
    assert.match(html, new RegExp(`class="language-option" href="${alternate}"`));
    assert.match(html, /class="button button-dark" href="mailto:gabriel\.violant@gmail\.com"/);
    assert.ok(html.includes(documentLinks.resume[lang]));
    if (documentLinks.academic) assert.ok(html.includes(documentLinks.academic));
    else assert.doesNotMatch(html, /class="academic-link"/);
    assert.equal((html.match(/class="project-card"/g) || []).length, projects.length);
    assert.equal((html.match(/class="paper-card"/g) || []).length, papers.length);
    for (const p of projects) assert.ok(html.includes(p.href));
    for (const p of papers) assert.ok(html.includes(p.href));
  }
});

test('páginas traduzidas e metadados preservam o destino equivalente', async () => {
  for (const [route, alternate] of [['projects/index.html', '/projetos/'], ['projetos/index.html', '/projects/']]) {
    const catalog = await readFile(path.join(outputRoot, route), 'utf8');
    assert.ok(catalog.includes(`class="language-option" href="${alternate}"`));
    assert.doesNotMatch(catalog, /Read case study|Conhecer o projeto/);
  }
  for (const route of ['index.html', 'pt/index.html']) {
    const html = await readFile(path.join(outputRoot, route), 'utf8');
    const canonical = html.match(/rel="canonical" href="([^"]+)"/);
    if (canonical) {
      const url = new URL(canonical[1]);
      assert.equal(url.pathname, route === 'index.html' ? '/' : '/pt/');
      assert.ok(html.includes(`hreflang="pt-BR" href="${url.origin}/pt/"`));
      assert.ok(html.includes(`hreflang="en" href="${url.origin}/"`));
    }
  }
});

test('projetos seguem a prioridade e todos os recursos externos abrem em nova guia, sem download', async () => {
  assert.deepEqual(projects.map(p => p.title), ['Eanter-OS', 'StrongerNotes', 'EnemRunner', 'Competitive-Programming', 'RPG-Sheet-Supros']);
  for (const file of (await filesIn(outputRoot)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    assert.doesNotMatch(html, /<a\b[^>]*\bdownload(?:=|\s|>)/i);
    assert.doesNotMatch(html, /(?:href|src)="[^"]*(?:\.pdf|article\/download\/)/i);
    assert.doesNotMatch(html, /Curious by nature|Curioso por natureza|PERSON BEHIND THE CODE|PESSOA POR TRÁS DO CÓDIGO|curiosidade e propósito/i);
    for (const [tag] of html.matchAll(/<a\b[^>]*href="https:\/\/[^>]+>/g)) {
      assert.match(tag, /target="_blank"/);
      assert.match(tag, /rel="noopener noreferrer"/);
      assert.match(tag, /aria-describedby="external-note"/);
    }
  }
});

test('artigos têm logos, DOI e destino oficial; páginas de detalhamento deixam de ser geradas', async () => {
  assert.deepEqual(papers.map(p => p.href), [
    'https://ieeexplore.ieee.org/document/11739938',
    'https://sol.sbc.org.br/index.php/sbrc/article/view/42316',
    'https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/23798',
  ]);
  for (const paper of papers) {
    assert.match(paper.doi, /^10\.\d{4,}\//);
    assert.ok((await stat(path.join(outputRoot, 'assets/images', paper.logo))).isFile());
  }
  for (const prefix of ['projects', 'projetos']) for (const slug of ['tinyflow-edgenids', 'enem-runner']) {
    await assert.rejects(stat(path.join(outputRoot, prefix, slug, 'index.html')), { code: 'ENOENT' });
  }
});
