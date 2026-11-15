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
await cp(fileURLToPath(new URL('../tests/browser/index.html', import.meta.url)), harness);
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
    await page.route('**/*.js', async route => {
      await new Promise(resolve => setTimeout(resolve, 600));
      await route.continue();
    });
    await page.addInitScript(() => {
      window.heroOpacitySamples = [];
      const sample = () => {
        const elements = [...document.querySelectorAll('.hero-copy > *')];
        if (elements.length) window.heroOpacitySamples.push(Math.min(...elements.map(el => Number(getComputedStyle(el).opacity))));
        window.heroSampleFrame = requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await page.goto(`${base}${lang === 'pt' ? '/pt/' : '/'}`);
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'active');
    await page.waitForFunction(() => [...document.querySelectorAll('.hero-copy > *')].every(el => el.style.opacity === ''));
    check(await readable(page, '.hero-copy > *'), 'Capa legível após a entrada');
    const heroSamples = await page.evaluate(() => {
      cancelAnimationFrame(window.heroSampleFrame);
      return window.heroOpacitySamples;
    });
    check(heroSamples.length > 5 && heroSamples.every(value => value === 1), 'Capa não pisca entre HTML inicial e carregamento tardio do JavaScript');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-home.png`) });
    const languageSummary = page.locator('.language-switch');
    check((await languageSummary.textContent()).includes(lang === 'pt' ? 'PT-BR' : 'EN'), 'Controle mostra o idioma atual');
    await languageSummary.focus();
    await page.keyboard.press('Enter');
    check(await page.locator('.language-control').evaluate(el => el.open), 'Teclado abre seleção de idioma');
    check(await page.locator('.language-option[aria-current="page"]').getAttribute('data-language') === lang, 'Dropdown marca o idioma atual');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-language.png`), animations: 'disabled' });
    check(await page.locator('.language-options').evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= innerWidth;
    }), 'Seleção de idioma cabe na tela');
    await page.keyboard.press('Escape');
    check(await languageSummary.evaluate(el => document.activeElement === el && !el.parentElement.open), 'Escape fecha idiomas e restaura foco');
    await languageSummary.click();
    const themeSummary = page.locator('.theme-control summary');
    await themeSummary.focus();
    await page.keyboard.press('Enter');
    check(await page.locator('.theme-control').evaluate(el => el.open), 'Teclado abre opções de tema');
    check(await page.locator('.language-control').evaluate(el => !el.open), 'Abrir tema fecha idiomas');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-theme.png`), animations: 'disabled' });
    const otherTheme = theme === 'dark' ? 'light' : 'dark';
    await page.locator(`[data-theme-option="${otherTheme}"]`).click();
    check(await page.evaluate(value => document.documentElement.dataset.theme === value && localStorage.getItem('portfolio-theme') === value, otherTheme), 'Opção de tema aplica e salva a escolha');
    check(await themeSummary.evaluate(el => document.activeElement === el), 'Escolha devolve foco ao controle');
    check(await page.locator(`.theme-control summary .icon-${otherTheme === 'dark' ? 'moon' : 'sun'}`).isVisible(), 'Ícone acompanha o tema aplicado');
    await themeSummary.click();
    await page.keyboard.press('Escape');
    check(await page.locator('.theme-control').evaluate(el => !el.open), 'Escape fecha opções de tema');
    await themeSummary.click();
    await page.locator('[data-theme-option="system"]').click();
    check(await page.evaluate(value => document.documentElement.dataset.theme === value && localStorage.getItem('portfolio-theme') === null, theme), 'Sistema restaura a preferência do dispositivo');
    check(await page.locator('.language-switch .icon-globe').isVisible() && await page.locator('.language-switch .language-flag').isVisible(), 'Idioma exibe globo e bandeira');
    if (width < 961) {
      const menu = page.locator('.menu-toggle');
      await menu.click();
      await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-menu.png`), animations: 'disabled' });
      check(await page.locator('#site-nav').isVisible(), 'Menu móvel abre');
      check(await page.locator('#site-nav a').first().evaluate(el => document.activeElement === el), 'Abertura permite percorrer a navegação com Tab');
      await themeSummary.click();
      check(await menu.getAttribute('aria-expanded') === 'false', 'Opções de tema fecham navegação móvel');
      await page.keyboard.press('Escape');
      await menu.click();
      await page.keyboard.press('Escape');
      check(await menu.evaluate(el => document.activeElement === el && el.getAttribute('aria-expanded') === 'false'), 'Escape fecha navegação e restaura foco');
    }
    const shortcuts = page.locator('.quick-links a');
    await page.keyboard.press('Tab');
    await shortcuts.first().focus();
    check(await shortcuts.first().evaluate(el => document.activeElement === el && getComputedStyle(el.querySelector('.quick-link-label')).visibility === 'visible'), 'Atalho exibe nome ao receber foco');
    await page.keyboard.press('Tab');
    check(await shortcuts.nth(1).evaluate(el => document.activeElement === el), 'Atalhos seguem ordem de teclado');
    await shortcuts.last().focus();
    check((await shortcuts.last().getAttribute('href')).includes(lang === 'pt' ? '1CSDInYQdPYxIjXckUCOBRk8YpJDLH9HA' : '1zY0MYdLbjIRQqSKV92SrKohusNhYEJae'), 'Currículo do atalho corresponde ao idioma atual');
    await page.locator('.brand').focus();
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

    // Percorrer a borda da tela com a roda detecta flashes que um salto de scroll omite.
    await page.locator('.project-card').first().evaluate(el => {
      scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight - 60, behavior: 'instant' });
      window.revealSamples = [];
      const sample = () => {
        const rect = el.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) window.revealSamples.push(Number(getComputedStyle(el).opacity));
        window.revealFrame = requestAnimationFrame(sample);
      };
      sample();
    });
    for (let step = 0; step < 8; step++) {
      await page.mouse.wheel(0, 40);
      await page.waitForTimeout(50);
    }
    await page.waitForFunction(() => document.querySelector('.project-card').style.opacity === '');
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(100);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(100);
    const samples = await page.evaluate(() => {
      cancelAnimationFrame(window.revealFrame);
      return window.revealSamples;
    });
    check(samples.some(value => value > 0 && value < 1), 'Entrada dos projetos disparada pela roda do mouse');
    check(samples.every((value, index) => !index || value >= samples[index - 1] - 0.01), `Entrada não volta a ocultar conteúdo visível: ${samples.join(', ')}`);
    check(await readable(page, '.publication-grid .project-card:first-child'), 'Projeto permanece legível depois da entrada');
    check(await page.locator('.reading-progress').evaluate(el => getComputedStyle(el).visibility === 'visible' && getComputedStyle(el).transform !== 'none'), 'Progresso acompanha a rolagem');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-projects.png`) });

    // Interromper uma animação ativa mudando a preferência do dispositivo.
    await scrollTo(page, '.repository-grid .project-card');
    await page.waitForFunction(() => Number(document.querySelector('.repository-grid .project-card').style.opacity) > 0 && Number(document.querySelector('.repository-grid .project-card').style.opacity) < 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduced');
    check(await readable(page, '[data-reveal]'), 'Movimento reduzido restaura todos os conteúdos');
    check(await page.locator('.reading-progress').evaluate(el => getComputedStyle(el).visibility === 'hidden'), 'Movimento reduzido remove progresso animado');
    await page.screenshot({ path: path.join(screenshots, `${width}-${theme}-repositories.png`) });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'active');

    await scrollTo(page, '.skill-card');
    await page.waitForFunction(() => Number(document.querySelector('.skill-card').style.opacity) > 0);
    await page.waitForFunction(() => [...document.querySelectorAll('.skill-card')].every(el => el.getBoundingClientRect().top >= innerHeight || el.style.opacity === ''));
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
    await page.waitForFunction(() => [...document.querySelectorAll('[data-reveal]')].every(el => {
      const rect = el.getBoundingClientRect();
      return rect.top >= innerHeight || rect.bottom <= 0 || getComputedStyle(el).opacity === '1';
    }));
    check(true, 'Redimensionamento não deixa conteúdo visível oculto');
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
    check(await page.locator('.publication-card').first().evaluate(el => el.getBoundingClientRect().top < innerHeight), 'Âncora direta abre a seção correta');
    await page.locator('.language-switch').click();
    await page.locator('.language-option[href]').click();
    await page.waitForURL(url => url.pathname === (lang === 'en' ? '/pt/' : '/') && url.hash === '#papers');
    check(await page.locator('html').getAttribute('lang') === (lang === 'en' ? 'pt-BR' : 'en'), 'Troca pelo dropdown preserva a seção e aplica o idioma');
    await reduced.close();

    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    const plain = await noJS.newPage();
    await plain.goto(`${base}${route}`);
    check(await plain.locator('.project-card').count() === 8, 'Projetos presentes sem JS');
    check(await plain.locator('.quick-links a').count() === 4, 'Atalhos presentes sem JS');
    check(await readable(plain, '[data-reveal], .hero-copy > *'), 'Conteúdo visível sem JS');
    check(await plain.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Sem overflow sem JavaScript');
    await plain.locator('#site-nav a').nth(2).click();
    check(new URL(plain.url()).hash === '#projects', 'Navegação por seção funciona sem JS');
    await plain.locator('.language-switch').click();
    await plain.locator('.language-option[href]').click();
    check(await plain.locator('html').getAttribute('lang') === (lang === 'en' ? 'pt-BR' : 'en'), 'Seleção de idioma funciona sem JS');
    await noJS.close();
  }
  assert.deepEqual(errors, [], 'Nenhum erro JavaScript durante os cenários');
  console.log(`PASS: ${checks} verificações. Capturas: ${screenshots}`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
  await rm(harness, { force: true });
}
