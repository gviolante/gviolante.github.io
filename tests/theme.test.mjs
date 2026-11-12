import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../src/theme.js', import.meta.url), 'utf8');

function openPage({ stored = null, dark = false, storageBlocked = false } = {}) {
  const root = { dataset: {} };
  const events = {};
  const control = { hidden: true };
  const select = { value: '', closest: () => control, addEventListener: (_, handler) => { events.select = handler; } };
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
      querySelector: (selector) => selector === '#theme-select' && ready ? select : null,
      addEventListener: (_, handler) => { events.ready = handler; },
    },
  });
  return {
    root, control,
    ready() { ready = true; events.ready(); },
    choose(value) { select.value = value; events.select(); },
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
