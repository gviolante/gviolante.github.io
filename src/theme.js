// Executa antes do CSS para restaurar o tema sem piscar a paleta clara.
(() => {
  const storageKey = 'portfolio-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const normalize = (value) => ['light', 'dark'].includes(value) ? value : 'system';
  let preference = 'system';
  try { preference = normalize(localStorage.getItem(storageKey)); } catch { /* Armazenamento pode estar indisponível. */ }

  function applyTheme() {
    const theme = preference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#14241d' : '#f5f4ec');
    const select = document.querySelector('#theme-select');
    if (select) select.value = preference;
  }

  applyTheme();
  systemTheme.addEventListener('change', () => { if (preference === 'system') applyTheme(); });
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey || event.key === null) {
      preference = normalize(event.newValue);
      applyTheme();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#theme-select');
    if (!select) return;
    select.closest('.theme-control').hidden = false;
    select.value = preference;
    select.addEventListener('change', () => {
      preference = normalize(select.value);
      try {
        if (preference === 'system') localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, preference);
      } catch { /* O controle continua funcionando nesta página. */ }
      applyTheme();
    });
  });
})();
