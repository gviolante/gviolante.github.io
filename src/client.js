// Melhorias progressivas: conteúdo, links e navegação existem sem JavaScript.
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
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });
  matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
}

const toolbar = document.querySelector('.filter-toolbar');
if (toolbar) {
  toolbar.hidden = false;
  const buttons = [...toolbar.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.catalog-grid [data-category]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visible += 1;
    });
    document.querySelector('#filter-count').textContent = `${visible} ${visible === 1 ? 'projeto' : 'projetos'}`;
  }));
}

const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const feedback = document.querySelector('.copy-feedback');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      feedback.textContent = 'E-mail copiado!';
    } catch {
      feedback.textContent = 'Não foi possível copiar. Use o link de e-mail acima.';
    }
  });
}
