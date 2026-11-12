import { projects, profile, studies, papers, getStudy } from './data/projects.js';
import { copy, homeUrl } from './data/content.js';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const sections = ['home', 'about', 'projects', 'papers', 'skills', 'contact'];
export const studyUrl = (slug, lang) => `/${lang === 'pt' ? 'projetos' : 'projects'}/${slug}/`;
const documentUrl = (name, lang) => `/assets/documents/${name}-${lang}.pdf`;
const external = 'target="_blank" rel="noopener noreferrer"';

function header(lang, alternatePath) {
  const t = copy[lang];
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="${homeUrl(lang)}" aria-label="Gabriel Violante — ${t.nav[0]}">gv<span>.</span></a>
    <nav id="site-nav" aria-label="${t.navigation}">${sections.map((id, i) => `<a href="${homeUrl(lang)}#${id}">${t.nav[i]}</a>`).join('')}</nav>
    <div class="header-controls">
      <a class="language-switch" href="${alternatePath}" lang="${lang === 'en' ? 'pt-BR' : 'en'}" hreflang="${lang === 'en' ? 'pt-BR' : 'en'}" aria-label="${t.language}">${lang === 'en' ? 'PT' : 'EN'}<span aria-hidden="true"> ↗</span></a>
      <label class="theme-control" hidden><span aria-hidden="true">◐</span><span class="sr-only">${t.theme}</span><select id="theme-select">${['system', 'light', 'dark'].map((theme, i) => `<option value="${theme}">${t.themes[i]}</option>`).join('')}</select></label>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu <span aria-hidden="true">＋</span></button>
    </div>
  </div></header>`;
}

export function layout({ title, description, body, lang = 'en', path = '/', alternatePath = '/pt/', siteUrl = '' }) {
  const t = copy[lang];
  const canonical = siteUrl ? new URL(path, siteUrl).href : '';
  return `<!doctype html><html lang="${t.locale}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f5f4ec">
  <title>${e(title)}</title><meta name="description" content="${e(description)}">
  <meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="${t.ogLocale}">
  ${canonical ? `<link rel="canonical" href="${e(canonical)}"><meta property="og:url" content="${e(canonical)}">${['en', 'pt'].map(l => `<link rel="alternate" hreflang="${copy[l].locale}" href="${e(new URL(l === lang ? path : alternatePath, siteUrl).href)}">`).join('')}` : ''}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml"><script src="/assets/theme.js"></script><link rel="stylesheet" href="/assets/styles.css"><script type="module" src="/assets/client.js"></script>
  </head><body id="top"><a class="skip-link" href="#content">${t.skip}</a>${header(lang, alternatePath)}
  <main id="content">${body}</main>
  <footer class="site-footer container"><a class="footer-name" href="${homeUrl(lang)}">Gabriel Violante<span class="green-dot" aria-hidden="true"></span></a><p>${t.footer}</p><a href="#top">${t.top} ↑</a></footer>
  </body></html>`;
}

function heading(label, title, intro = '') {
  return `<div class="section-heading"><p class="eyebrow">${label}</p><h2>${title}</h2>${intro ? `<p class="section-intro">${intro}</p>` : ''}</div>`;
}
function projectCard(project, lang) {
  const p = project[lang], t = copy[lang];
  return `<article class="project-card">
    <a class="project-image ${project.slug}" href="${project.href}" ${external} aria-label="${e(project.title)} — GitHub"><img src="/assets/images/${project.image}" alt="${e(p.alt)}" width="800" height="520" loading="lazy"></a>
    <div class="project-card-content"><p class="eyebrow">${p.category}</p><h3>${project.title}</h3><p>${p.summary}</p><ul class="tags">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul><a class="text-link" href="${project.href}" ${external}>${t.github} ${arrow}</a></div>
  </article>`;
}
function paperCard(paper, lang) {
  const p = paper[lang], t = copy[lang];
  return `<article class="paper-card"><div class="paper-index"><span>${paper.year}</span><strong>${paper.venue}</strong><span class="paper-role">${p.role}</span></div>
    <div class="paper-copy"><p class="paper-venue">${p.venue}</p><h3><a href="${paper.source}" ${external}>${p.title}</a></h3><p>${p.summary}</p><p class="paper-authors">${paper.authors}</p>
    <div class="paper-actions"><a class="text-link" href="${paper.href}" ${external}>${t.pdf} ${arrow}</a><a href="${studyUrl(paper.slug, lang)}">${t.caseStudy} →</a><span>${t.pdfLanguage}</span></div></div>
  </article>`;
}
export function homePage(options = {}) {
  const lang = options.lang || 'en', t = copy[lang];
  return layout({ ...options, lang, path: homeUrl(lang), alternatePath: homeUrl(lang === 'en' ? 'pt' : 'en'), title: t.title, description: t.description,
    body: `<section id="home" class="hero container" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow"><span class="green-dot" aria-hidden="true"></span>${t.eyebrow}</p>
      <h1 id="hero-title">Gabriel<br>Violante<span class="hero-period">.</span></h1><p class="hero-intro">${t.intro}</p><p class="hero-description">${t.hero}</p>
      <div class="hero-actions"><a class="button button-dark" href="mailto:${profile.email}">${t.email} ${arrow}</a><a class="text-link" href="${documentUrl('resume', lang)}" ${external}>${t.resume} ${arrow}</a></div>
      <p class="hero-location"><span aria-hidden="true">◎</span> ${t.location}</p></div>
      <div class="hero-art"><div class="portrait-orbit" aria-hidden="true"></div><span class="art-cross cross-one" aria-hidden="true">+</span><span class="art-cross cross-two" aria-hidden="true">+</span><img src="/assets/images/gabriel-pixel.png" width="1121" height="1402" alt="${t.portrait}" fetchpriority="high"><span class="art-note" aria-hidden="true">hello, world<span>_</span></span></div>
    </section>
    <section id="about" class="section about-section"><div class="container about-grid"><div>${heading(t.aboutLabel, t.aboutTitle)}<div class="about-copy">${t.about.map(p => `<p>${p}</p>`).join('')}</div><div class="social-links"><a href="${profile.github}" ${external}>GitHub ${arrow}</a><a href="${profile.linkedin}" ${external}>LinkedIn ${arrow}</a></div></div>
      <aside class="journey" aria-label="${t.background}"><h3>${t.background}</h3>${t.journey.map(([label, title, text]) => `<div class="journey-item"><span class="eyebrow">${label}</span><h4>${title}</h4><p>${text}</p></div>`).join('')}</aside></div>
    </section>
    <section id="projects" class="section container">${heading(t.projectsLabel, t.projectsTitle, t.projectsIntro)}<div class="project-grid">${projects.map(p => projectCard(p, lang)).join('')}</div><a class="section-more text-link" href="${profile.github}?tab=repositories" ${external}>${t.allProjects} ${arrow}</a></section>
    <section id="papers" class="section papers-section"><div class="container">${heading(t.papersLabel, t.papersTitle, t.papersIntro)}<div class="papers-list">${papers.map(p => paperCard(p, lang)).join('')}</div>
      <div class="academic-link"><span class="academic-icon" aria-hidden="true">↳</span><div><a class="text-link" href="${documentUrl('academic-background', lang)}" ${external}>${t.academic} ${arrow}</a><p>${t.academicNote}</p></div></div></div></section>
    <section id="skills" class="section container">${heading(t.skillsLabel, t.skillsTitle, t.skillsIntro)}<div class="skills-grid">${t.skillGroups.map(([n, title, items]) => `<article class="skill-card"><span class="skill-number" aria-hidden="true">${n}</span><h3>${title}</h3><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul></article>`).join('')}</div></section>
    <section id="contact" class="contact-section"><div class="container contact-inner"><div><p class="eyebrow">${t.contactLabel}</p><h2>${t.contactTitle.replace('\n', '<br>')}</h2><p class="contact-description">${t.contactText}</p></div><div class="contact-actions"><a class="contact-email" href="mailto:${profile.email}">${profile.email} ${arrow}</a><button class="copy-email" type="button" data-email="${profile.email}" data-success="${t.copied}" data-error="${t.copyError}" hidden>${t.copy} <span aria-hidden="true">⧉</span></button><span class="copy-feedback" role="status"></span><div class="social-links"><a href="${profile.github}" ${external}>GitHub ${arrow}</a><a href="${profile.linkedin}" ${external}>LinkedIn ${arrow}</a></div></div></div></section>` });
}
export function catalogPage(options = {}) {
  const lang = options.lang || 'en', t = copy[lang];
  return layout({ ...options, lang, path: lang === 'pt' ? '/projetos/' : '/projects/', alternatePath: lang === 'pt' ? '/projects/' : '/projetos/', title: `${t.nav[2]} — Gabriel Violante`, description: t.projectsIntro,
    body: `<section class="section container page-intro"><a class="text-link" href="${homeUrl(lang)}#projects">← ${t.back}</a><h1>${t.nav[2]}</h1><p>${t.projectsIntro}</p><div class="project-grid">${projects.map(p => projectCard(p, lang)).join('')}</div></section>` });
}
export function projectPage(original, options = {}) {
  const lang = options.lang || 'en', t = copy[lang], p = getStudy(original, lang), paper = papers.find(item => item.slug === p.slug);
  return layout({ ...options, lang, path: studyUrl(p.slug, lang), alternatePath: studyUrl(p.slug, lang === 'en' ? 'pt' : 'en'), title: `${p.shortTitle} — Gabriel Violante`, description: p.summary,
    body: `<section class="container study-header"><a class="text-link" href="${homeUrl(lang)}#papers">← ${t.back}</a><p class="eyebrow">${p.context} / ${p.period}</p><h1>${e(p.title).replace('\n', '<br>')}</h1><p class="study-summary">${p.summary}</p><dl class="study-meta"><div><dt>${t.role}</dt><dd>${p.role}</dd></div><div><dt>${t.period}</dt><dd>${p.period}</dd></div></dl><a class="button button-dark" href="${paper.href}" ${external}>${t.pdf} ${arrow}</a></section>
    <div class="study-body container"><h2>${p.question}</h2><div>${p.sections.map(s => `<section><h3>${s.title}</h3><p>${s.text}</p></section>`).join('')}<blockquote>${p.takeaway}</blockquote></div></div>` });
}
export function notFoundPage(options = {}) {
  const lang = options.lang || 'en', t = copy[lang];
  return layout({ ...options, lang, path: lang === 'pt' ? '/pt/404.html' : '/404.html', alternatePath: lang === 'pt' ? '/404.html' : '/pt/404.html', title: `404 — Gabriel Violante`, description: t.notFoundText,
    body: `<section class="container not-found"><p class="eyebrow">404</p><h1>${t.notFound}</h1><p>${t.notFoundText}</p><a class="button button-dark" href="${homeUrl(lang)}">${t.back} →</a></section>` });
}
