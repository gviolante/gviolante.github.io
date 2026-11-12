import { projects, profile, experiences } from './data/projects.js';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const projectUrl = (project) => `/projetos/${project.slug}/`;
const tags = (project) => `<ul class="tags" aria-label="Temas">${project.tags.map((tag) => `<li>${e(tag)}</li>`).join('')}</ul>`;

function header(active) {
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Gabriel Violante — início"><span class="brand-symbol" aria-hidden="true">gv<span>.</span></span><span>Gabriel Violante</span></a>
      <label class="theme-control" hidden><span aria-hidden="true">◐</span><span class="sr-only">Tema de cores</span><select id="theme-select"><option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Escuro</option></select></label>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu <span aria-hidden="true">＋</span></button>
      <nav id="site-nav" aria-label="Navegação principal">
        <a href="/projetos/" ${active === 'projects' ? 'aria-current="page"' : ''}>Projetos</a>
        <a href="/#sobre">Sobre mim</a>
        <a href="/#pesquisa">Pesquisa</a>
        <a class="nav-contact" href="/#contato">Vamos conversar ${arrow}</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-inner">
    <a class="brand footer-brand" href="/">Gabriel Violante<span class="green-dot" aria-hidden="true"></span></a>
    <p>Curiosidade que vira construção.</p>
    <a href="#top">Voltar ao topo <span aria-hidden="true">↑</span></a>
  </div></footer>`;
}

export function layout({ title, description, body, active = '', path = '/', siteUrl = '' }) {
  const canonical = siteUrl ? new URL(path, siteUrl).href : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f5f4ec">
  <title>${e(title)}</title>
  <meta name="description" content="${e(description)}">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  ${canonical ? `<link rel="canonical" href="${e(canonical)}"><meta property="og:url" content="${e(canonical)}">` : ''}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="/assets/theme.js"></script>
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="module" src="/assets/client.js"></script>
</head>
<body id="top">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  ${header(active)}
  <main id="conteudo">${body}</main>
  ${footer()}
</body>
</html>`;
}

function visual(project, { eager = false } = {}) {
  const loading = eager ? 'eager' : 'lazy';
  if (project.visual === 'game') {
    return `<div class="project-visual game-visual">
      <span class="visual-label">ACESSIBILIDADE EM JOGO</span>
      <div class="sound-rings" aria-hidden="true"></div>
      <img src="/assets/images/enem-runner.png" alt="Tela do Enem Runner: personagem em uma rua com obstáculos sonoros destacados." width="388" height="831" loading="${loading}">
      <span class="game-caption">Enem Runner <span>UNITY / C#</span></span>
    </div>`;
  }
  return `<div class="project-visual network-visual"><img src="/assets/images/network.svg" alt="Diagrama conceitual do TinyFlow conectando tráfego de rede a um modelo leve de detecção." width="640" height="480" loading="${loading}"></div>`;
}

function card(project) {
  return `<article class="project-card" data-category="${e(project.category)}">
    <a class="visual-link" href="${projectUrl(project)}" aria-label="Conhecer ${e(project.shortTitle)}">${visual(project)}</a>
    <div class="project-card-content">
      <div class="project-meta"><span>${e(project.categoryLabel)}</span><span class="project-status">${e(project.status)}</span></div>
      <h3><a href="${projectUrl(project)}">${e(project.title).replaceAll('\n', '<br>')}</a></h3>
      <p>${e(project.summary)}</p>
      ${tags(project)}
      <a class="text-link" href="${projectUrl(project)}">Conhecer o projeto ${arrow}</a>
    </div>
  </article>`;
}

function publications() {
  return projects.filter((project) => project.publication).map((project) => {
    const paper = project.publication;
    return `<article class="publication">
      <span class="publication-year">${e(paper.year)}</span>
      <div><span class="eyebrow">${e(paper.venue)}</span><h3><a href="${projectUrl(project)}">${e(paper.title)}</a></h3><p>${e(paper.authors)}</p></div>
      <a class="paper-link" href="${e(project.links[0].href)}" target="_blank" rel="noopener" aria-label="Ler artigo ${e(project.shortTitle)} em PDF, abre em nova aba">PDF ${arrow}</a>
    </article>`;
  }).join('');
}

export function homePage(options) {
  return layout({ ...options,
    title: 'Gabriel Violante — Ideias ambiciosas. Impacto real.',
    description: 'Estudante de Ciência da Computação na UFMG. Uso inteligência artificial para dar vida a ideias ambiciosas e resolver problemas do mundo real.',
    body: `<section class="hero container" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="green-dot" aria-hidden="true"></span> COMPUTAÇÃO, COM PROPÓSITO</p>
        <h1 id="hero-title">Gabriel<br>Violante<span class="hero-period" aria-hidden="true">.</span></h1>
        <p class="hero-intro">Estudante de Ciência da Computação na UFMG.</p>
        <p class="hero-description">Uso inteligência artificial para dar vida a ideias e resolver problemas difíceis que importam para as pessoas e para o mundo.</p>
        <div class="hero-actions"><a class="button button-dark" href="#projetos">Explore meus projetos <span aria-hidden="true">↓</span></a><a class="text-link" href="#sobre">Um pouco sobre mim ${arrow}</a></div>
        <div class="hero-location"><span aria-hidden="true">◎</span> Belo Horizonte, Brasil <span class="location-divider" aria-hidden="true">/</span> Ciência da Computação · UFMG</div>
      </div>

    </section>
    <div class="focus-strip"><div class="container"><span class="strip-label">MEU PONTO DE ENCONTRO</span><span>Inteligência artificial</span><i aria-hidden="true">✳</i><span>Problemas reais</span><i aria-hidden="true">✳</i><span>Impacto concreto</span></div></div>
    <section id="projetos" class="section container" aria-labelledby="projects-title">
      <div class="section-heading"><div><p class="eyebrow">01 / DA IDEIA À PRÁTICA</p><h2 id="projects-title">Problemas reais.<br>Projetos que <em>respondem.</em></h2></div><p>Da segurança de redes à inclusão nos jogos: diferentes desafios, a mesma vontade de construir algo que faça diferença.</p></div>
      <div class="project-grid">${projects.map((project) => card(project)).join('')}</div>
      <div class="section-end"><span>Pesquisa, software e curiosidade em movimento.</span><a class="text-link" href="/projetos/">Explorar todos os projetos ${arrow}</a></div>
    </section>
    <section id="sobre" class="about-section section" aria-labelledby="about-title"><div class="container about-grid">
      <div class="about-intro"><p class="eyebrow">02 / QUEM ESTÁ POR TRÁS</p><h2 id="about-title">Movido por<br>um bom <em>problema.</em></h2><div class="about-note"><span aria-hidden="true">↳</span><p>A tecnologia fica mais interessante quando encontra o mundo real.</p></div></div>
      <div class="about-copy"><p class="large-copy">Gosto de entender como as coisas funcionam. Gosto ainda mais de descobrir como elas podem funcionar melhor para alguém.</p>
        <p>Sou de Belo Horizonte e curso Ciência da Computação na UFMG, depois de uma formação técnica em Desenvolvimento de Sistemas no COLTEC. Minha trajetória passa por jogos, sistemas, automação e pesquisa em inteligência artificial.</p>
        <p>O que conecta essas experiências é a vontade de resolver problemas difíceis com consequências concretas. IA e sistemas embarcados são caminhos que exploro para transformar ideias ambiciosas em soluções que cheguem às pessoas.</p>
        <div class="about-links"><a class="text-link" href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}<span class="sr-only"> (abre em nova aba)</span></a><a class="text-link" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}<span class="sr-only"> (abre em nova aba)</span></a></div>
      </div>
      <div class="experience-list">${experiences.map((item) => `<article class="experience"><span>${e(item.label)}</span><h3>${e(item.place)}</h3><p>${e(item.text)}</p></article>`).join('')}</div>
    </div></section>
    <section id="pesquisa" class="section container" aria-labelledby="research-title"><div class="section-heading"><div><p class="eyebrow">03 / INVESTIGAR E COMPARTILHAR</p><h2 id="research-title">Conhecimento<br>que ganha <em>forma.</em></h2></div><p>Publicações que documentam perguntas, experimentos e aprendizados construídos em colaboração.</p></div><div class="publication-list">${publications()}</div></section>
    <section id="contato" class="contact-section" aria-labelledby="contact-title"><div class="container contact-inner"><p class="eyebrow">04 / A PRÓXIMA IDEIA</p><h2 id="contact-title">Tem um problema<br>que vale <em>resolver?</em></h2><p>Vamos conversar sobre pesquisa, inteligência artificial<br class="desktop-break"> e ideias que merecem sair do papel.</p><a class="contact-email" href="mailto:${profile.email}">${profile.email} ${arrow}</a><div class="contact-bottom"><span>Belo Horizonte, MG · Brasil</span><button class="copy-email" type="button" data-email="${profile.email}" hidden>Copiar e-mail <span aria-hidden="true">⧉</span></button><span class="copy-feedback" role="status" aria-live="polite"></span></div></div></section>`,
  });
}

export function catalogPage(options) {
  return layout({ ...options, active: 'projects', path: '/projetos/',
    title: 'Projetos — Gabriel Violante',
    description: 'Explore projetos de Gabriel Violante em inteligência artificial, TinyML, cibersegurança e jogos acessíveis.',
    body: `<section class="container catalog-intro"><a class="back-link" href="/">← Início</a><p class="eyebrow">EXPERIMENTAR. APRENDER. CONSTRUIR.</p><h1>Ideias em<br><em>movimento.</em></h1><p class="page-intro">Uma seleção de projetos que conectam desafios técnicos a problemas do mundo real.</p></section>
      <section class="container catalog-section" aria-labelledby="catalog-title"><h2 id="catalog-title" class="sr-only">Todos os projetos</h2>
      <div class="filter-toolbar" hidden><div class="filters" role="group" aria-label="Filtrar projetos"><button type="button" data-filter="all" aria-pressed="true">Todos <span>${String(projects.length).padStart(2, '0')}</span></button><button type="button" data-filter="pesquisa" aria-pressed="false">IA e pesquisa <span>${String(projects.filter(project => project.category === 'pesquisa').length).padStart(2, '0')}</span></button><button type="button" data-filter="jogos" aria-pressed="false">Jogos <span>${String(projects.filter(project => project.category === 'jogos').length).padStart(2, '0')}</span></button></div><p id="filter-count" role="status" aria-live="polite">${projects.length} projetos</p></div>
      <div class="catalog-grid">${projects.map((project) => card(project)).join('')}</div>
      <div class="catalog-note"><span aria-hidden="true">↳</span><p>Este portfólio acompanha o que estou construindo.<br>Outras experiências e projetos serão adicionados por aqui.</p></div></section>`,
  });
}

export function projectPage(project, options) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return layout({ ...options, active: 'projects', path: projectUrl(project),
    title: `${project.shortTitle} — Gabriel Violante`, description: project.summary,
    body: `<article class="project-page"><header class="container project-intro"><a class="back-link" href="/projetos/">← Todos os projetos</a><div class="detail-kicker"><p class="eyebrow">${e(project.categoryLabel)}</p><span class="project-status">${e(project.status)}</span></div><h1>${e(project.title).replaceAll('\n', '<br>')}</h1><p class="page-intro">${e(project.summary)}</p>${tags(project)}
      <dl class="project-facts"><div><dt>Projeto</dt><dd>${e(project.shortTitle)}</dd></div><div><dt>Meu papel</dt><dd>${e(project.role)}</dd></div><div><dt>Contexto</dt><dd>${e(project.context)}</dd></div><div><dt>Período</dt><dd>${e(project.period)}</dd></div></dl></header>
      <figure class="container detail-figure">${visual(project, { eager: true })}<figcaption>${project.visual === 'game' ? 'Imagem do jogo extraída do artigo Enem Runner, SBGames 2022.' : 'Ilustração conceitual do projeto.'}</figcaption></figure>
      <div class="container project-story"><aside><p class="eyebrow">A PERGUNTA</p><h2>${e(project.question)}</h2>${project.links.map((link) => `<a class="button button-dark" href="${e(link.href)}" target="_blank" rel="noopener">${e(link.label)} <span>${e(link.type)} ${arrow}</span><span class="sr-only"> (abre em nova aba)</span></a>`).join('')}</aside><div class="story-sections">${project.sections.map((section, index) => `<section><span class="story-number">0${index + 1}</span><h2>${e(section.title)}</h2><p>${e(section.text)}</p></section>`).join('')}</div></div>
      <div class="container takeaway"><p class="eyebrow">O QUE LEVO DESSE TRABALHO</p><p>${e(project.takeaway)}</p></div>
      <nav class="next-project container" aria-label="Próximo projeto"><div><p class="eyebrow">CONTINUE EXPLORANDO</p><a href="${projectUrl(next)}">${e(next.shortTitle)} ${arrow}</a></div><a class="text-link" href="/#contato">Conversar sobre este projeto ${arrow}</a></nav></article>`,
  });
}

export function notFoundPage(options) {
  return layout({ ...options, title: 'Página não encontrada — Gabriel Violante', description: 'Encontre os projetos e pesquisas de Gabriel Violante.', body: '<section class="container not-found"><p class="eyebrow">404 / CAMINHO NÃO ENCONTRADO</p><h1>Vamos por<br>outro <em>caminho.</em></h1><p>Esta página não existe ou mudou de endereço.</p><a class="button button-dark" href="/">Voltar ao início <span aria-hidden="true">↗</span></a></section>' });
}
