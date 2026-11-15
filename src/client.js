// Melhorias progressivas: conteúdo, idioma e links funcionam sem JavaScript.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuToggle && navigation) {
  menuToggle.hidden = false;
  document.documentElement.classList.add('has-menu');
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    if (open) navigation.querySelector('a')?.focus({ preventScroll: true });
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
  });
  matchMedia('(min-width: 961px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') || event.target.closest('.theme-control, .language-control')) setMenu(false);
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
}
const languageControl = document.querySelector('.language-control');
const languageLinks = document.querySelectorAll('.language-option[href]');
const syncLanguageAnchor = () => {
  languageLinks.forEach(link => {
    const url = new URL(link.href);
    url.hash = location.hash;
    link.href = url.href;
  });
};
syncLanguageAnchor();
window.addEventListener('hashchange', syncLanguageAnchor);
if (languageControl) {
  document.addEventListener('click', event => {
    if (!languageControl.contains(event.target)) languageControl.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && languageControl.open) {
      languageControl.open = false;
      languageControl.querySelector('summary').focus();
    }
  });
}

// Destaque acompanha a seção visível, sem interceptar navegação nativa.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      navigation?.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}
const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const feedback = document.querySelector('.copy-feedback');
    try { await navigator.clipboard.writeText(copyButton.dataset.email); feedback.textContent = copyButton.dataset.success; }
    catch { feedback.textContent = copyButton.dataset.error; }
  });
}
