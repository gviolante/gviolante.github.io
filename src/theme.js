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
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e0b18' : '#f6f4fb');
    document.querySelectorAll('[data-theme-option]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === preference));
    });
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
    const control = document.querySelector('.theme-control');
    if (!control) return;
    const summary = control.querySelector('summary');
    control.hidden = false;
    applyTheme();
    control.querySelectorAll('[data-theme-option]').forEach(button => button.addEventListener('click', () => {
      preference = normalize(button.dataset.themeOption);
      try {
        if (preference === 'system') localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, preference);
      } catch { /* O controle continua funcionando nesta página. */ }
      applyTheme();
      control.open = false;
      summary.focus();
    }));
    document.addEventListener('click', event => {
      if (!control.contains(event.target)) control.open = false;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && control.open) {
        control.open = false;
        summary.focus();
      }
    });
  });
})();
