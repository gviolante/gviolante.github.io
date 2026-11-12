// Melhorias progressivas: conteúdo, idioma e links funcionam sem JavaScript.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuToggle && navigation) {
  menuToggle.hidden = false;
  document.documentElement.classList.add('has-menu');
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
  });
  matchMedia('(min-width: 961px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
}
const languageSwitch = document.querySelector('.language-switch');
const syncLanguageAnchor = () => {
  if (!languageSwitch) return;
  const url = new URL(languageSwitch.href);
  url.hash = location.hash;
  languageSwitch.href = url.href;
};
syncLanguageAnchor();
window.addEventListener('hashchange', syncLanguageAnchor);

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
