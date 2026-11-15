import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../src/theme.js', import.meta.url), 'utf8');

function openPage({ stored = null, dark = false, storageBlocked = false } = {}) {
  const root = { dataset: {} };
  const events = {};
  const buttons = ['system', 'light', 'dark'].map(value => ({
    dataset: { themeOption: value },
    setAttribute(name, state) { this[name] = state; },
    addEventListener(_, handler) { this.click = handler; },
  }));
  const summary = { focus() { events.focused = true; } };
  const control = { hidden: true, open: false, querySelector: () => summary, querySelectorAll: () => buttons, contains: target => buttons.includes(target) || target === summary };
  const media = { matches: dark, addEventListener: (_, handler) => { events.system = handler; } };
  let ready = false;
  const storage = {
    getItem: () => { if (storageBlocked) throw new Error('Indisponível'); return stored; },
    setItem: (_, value) => { if (storageBlocked) throw new Error('Indisponível'); stored = value; },
    removeItem: () => { if (storageBlocked) throw new Error('Indisponível'); stored = null; },
  };
  vm.runInNewContext(source, {
    localStorage: storage,
    window: { matchMedia: () => media, addEventListener: (name, handler) => { events[name] = handler; } },
    document: {
      documentElement: root,
      querySelector: (selector) => selector === '.theme-control' && ready ? control : null,
      querySelectorAll: () => ready ? buttons : [],
      addEventListener: (name, handler) => { events[name] = handler; },
    },
  });
  return {
    root, control, buttons, events,
    ready() { ready = true; events.DOMContentLoaded(); },
    choose(value) { buttons.find(button => button.dataset.themeOption === value).click(); },
    system(isDark) { media.matches = isDark; events.system(); },
    external(value) { events.storage({ key: 'portfolio-theme', newValue: value }); },
  };
}

test('tema salvo é aplicado antes do carregamento dos controles', () => {
  const page = openPage({ stored: 'dark' });
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.control.hidden, true);
  page.ready();
  assert.equal(page.control.hidden, false);
});

test('opções indicam a preferência e o painel fecha com escolha, Escape e clique externo', () => {
  const page = openPage();
  page.ready();
  assert.equal(page.buttons[0]['aria-pressed'], 'true');
  page.control.open = true;
  page.choose('dark');
  assert.equal(page.buttons[2]['aria-pressed'], 'true');
  assert.equal(page.buttons[0]['aria-pressed'], 'false');
  assert.equal(page.control.open, false);
  assert.equal(page.events.focused, true);
  page.control.open = true;
  page.events.keydown({ key: 'Escape' });
  assert.equal(page.control.open, false);
  page.control.open = true;
  page.events.click({ target: {} });
  assert.equal(page.control.open, false);
});

test('modo sistema acompanha mudanças ao vivo e respeita a escolha explícita', () => {
  const page = openPage();
  page.ready();
  page.system(true);
  assert.equal(page.root.dataset.theme, 'dark');
  page.choose('light');
  page.system(false);
  page.system(true);
  assert.equal(page.root.dataset.theme, 'light');
  page.choose('system');
  assert.equal(page.root.dataset.theme, 'dark');
});

test('controle funciona mesmo sem acesso ao armazenamento', () => {
  const page = openPage({ storageBlocked: true, dark: true });
  page.ready();
  assert.equal(page.root.dataset.theme, 'dark');
  assert.doesNotThrow(() => page.choose('light'));
  assert.equal(page.root.dataset.theme, 'light');
});

test('preferências inválidas usam o sistema e alterações em outra aba são aplicadas', () => {
  const page = openPage({ stored: 'invalid', dark: true });
  assert.equal(page.root.dataset.themePreference, 'system');
  page.external('light');
  assert.equal(page.root.dataset.theme, 'light');
  page.external(null);
  assert.equal(page.root.dataset.theme, 'dark');
});
