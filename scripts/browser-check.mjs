import assert from 'node:assert/strict';
import { cp, mkdir, rm, access } from 'node:fs/promises';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { createServer, outputRoot } from './serve.mjs';

// Usa o Chromium já instalado; não baixa nem publica navegadores.
let executablePath = process.env.CHROMIUM_PATH;
if (!executablePath) for (const candidate of ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome']) {
  if (await access(candidate).then(() => true, () => false)) { executablePath = candidate; break; }
}
if (!executablePath) throw new Error('Defina CHROMIUM_PATH com o caminho do Chromium instalado.');
const screenshots = process.env.QA_OUTPUT_DIR || '/tmp/portfolio-astro-qa';
await mkdir(screenshots, { recursive: true });
const harness = path.join(outputRoot, '__browser-check.html');
await cp(fileURLToPath(new URL('../tests/browser.html', import.meta.url)), harness);
const server = createServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
let checks = 0;
const errors = [];
const check = (value, label) => { assert.ok(value, label); checks++; };
const track = page => page.on('pageerror', error => errors.push(error.message));
const scrollTo = async (page, selector) => {
  await page.locator(selector).first().evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.5, behavior: 'instant' }));
};
const readable = (page, selector) => page.locator(selector).evaluateAll(elements => elements.every(el => getComputedStyle(el).opacity === '1' && getComputedStyle(el).visibility !== 'hidden'));

try {
  browser = await chromium.launch({ executablePath, headless: true });
  const matrixPage = await browser.newPage();
  track(matrixPage);
  await matrixPage.goto(`${base}/__browser-check.html`);
  await matrixPage.waitForFunction(() => !!document.body.dataset.state, null, { timeout: 60000 });
  const result = JSON.parse(await matrixPage.locator('#results').textContent());
  assert.equal(result.status, 'passed', result.error);
  checks += result.total;
  console.log(`Matriz de páginas, idiomas, temas e larguras: ${result.total} verificações.`);
  await matrixPage.close();

  for (const width of [390, 1440]) for (const theme of ['light', 'dark']) {
    const lang = theme === 'dark' ? 'pt' : 'en';
    const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'no-preference', hasTouch: width < 700 });
    const page = await context.newPage(); track(page);
    await page.goto(`${base}${lang === 'pt' ? '/pt/' : '/'}`);
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'active');
    await page.waitForFunction(() => [...document.querySelectorAll('.hero-copy > *')].every(el => el.style.opacity === ''));
    check(await readable(page, '.hero-copy > *'), 'Capa legível após a entrada');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-home.png`) });
    const art = page.locator('.hero-art');
    const portraitBefore = await page.locator('.hero-art img').boundingBox();
    if (width > 960) {
      const box = await art.boundingBox();
      await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.4);
      await page.waitForTimeout(300);
      check(await page.locator('.hero-art img').evaluate(el => getComputedStyle(el).transform === 'none'), 'Retrato permanece estático sob o ponteiro');
      assert.deepEqual(await page.locator('.hero-art img').boundingBox(), portraitBefore);
      await page.mouse.move(0, 0);
    }

    await scrollTo(page, '.project-card');
    await page.waitForFunction(() => {
      const value = Number(document.querySelector('.project-card').style.opacity);
      return value > 0 && value < 1;
    });
    check(true, 'Entrada dos projetos disparada pela rolagem');
    await page.waitForFunction(() => [...document.querySelectorAll('.project-card')].every(el => el.style.opacity === ''));
    check(await readable(page, '.project-card'), 'Projetos permanecem legíveis depois da entrada');
    check(await page.locator('.reading-progress').evaluate(el => getComputedStyle(el).visibility === 'visible' && getComputedStyle(el).transform !== 'none'), 'Progresso acompanha a rolagem');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-projects.png`) });

    // Interromper uma animação ativa mudando a preferência do dispositivo.
    await scrollTo(page, '.paper-card');
    await page.waitForFunction(() => Number(document.querySelector('.paper-card').style.opacity) > 0 && Number(document.querySelector('.paper-card').style.opacity) < 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduced');
    check(await readable(page, '[data-reveal]'), 'Movimento reduzido restaura todos os conteúdos');
    check(await page.locator('.reading-progress').evaluate(el => getComputedStyle(el).visibility === 'hidden'), 'Movimento reduzido remove progresso animado');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-papers.png`) });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'active');

    await scrollTo(page, '.skill-card');
    await page.waitForFunction(() => Number(document.querySelector('.skill-card').style.opacity) > 0);
    await page.waitForFunction(() => [...document.querySelectorAll('.skill-card')].every(el => el.style.opacity === ''));
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-skills.png`) });
    // Foco durante a entrada do contato deve terminar a animação imediatamente.
    await scrollTo(page, '.contact-actions');
    await page.locator('.contact-email').focus();
    check(await readable(page, '.contact-actions'), 'Foco por teclado sempre visível');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Sem overflow durante o percurso');

    // Exercita o mesmo ciclo recebido em uma restauração do bfcache.
    await page.evaluate(() => {
      window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
      window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'active');
    check(await readable(page, '[data-reveal]'), 'Conteúdo legível após restauração do histórico');
    await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 1000 });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Layout permanece válido após redimensionamento');
    check(await readable(page, '[data-reveal]'), 'Redimensionamento não deixa conteúdo oculto');
    await context.close();
    console.log(`Movimento, teclado, interrupção e capturas: ${width}px / ${theme}.`);
  }

  for (const lang of ['en', 'pt']) {
    const route = lang === 'pt' ? '/pt/' : '/';
    const reduced = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce', hasTouch: true });
    const page = await reduced.newPage(); track(page);
    await page.goto(`${base}${route}#papers`);
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduced');
    check(await readable(page, '[data-reveal]'), 'Carregamento direto com movimento reduzido');
    check(await page.locator('.paper-card').first().evaluate(el => el.getBoundingClientRect().top < innerHeight), 'Âncora direta abre a seção correta');
    await reduced.close();

    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    const plain = await noJS.newPage();
    await plain.goto(`${base}${route}`);
    check(await plain.locator('.project-card').count() === 5, 'Projetos presentes sem JS');
    check(await readable(plain, '[data-reveal], .hero-copy > *'), 'Conteúdo visível sem JS');
    check(await plain.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Sem overflow sem JavaScript');
    await plain.locator('#site-nav a').nth(3).click();
    check(new URL(plain.url()).hash === '#papers', 'Navegação por seção funciona sem JS');
    await noJS.close();
  }
  assert.deepEqual(errors, [], 'Nenhum erro JavaScript durante os cenários');
  console.log(`PASS: ${checks} verificações. Capturas: ${screenshots}`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
  await rm(harness, { force: true });
}
