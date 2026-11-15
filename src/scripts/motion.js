import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Melhorias progressivas: o HTML nasce visível, sem classe CSS que dependa de JS. */
export function initMotion() {
  let media;
  const root = document.documentElement;

  const conditions = {
    enabled: '(prefers-reduced-motion: no-preference)',
    reduced: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 961px) and (hover: hover) and (pointer: fine)',
  };
  const setup = context => {
    if (!context.conditions.enabled) {
      root.dataset.motion = 'reduced';
      return () => { delete root.dataset.motion; };
    }
    const desktop = context.conditions.desktop;
    root.dataset.motion = 'active';
    const pending = new Map();
    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.reading-progress');
    const hero = document.querySelector('.hero');

    // Preparar a entrada fora da tela evita ocultar um elemento que já apareceu.
    document.querySelectorAll('[data-reveal]').forEach(element => {
      if (element.getBoundingClientRect().top < innerHeight || element.contains(document.activeElement)) return;
      const animation = gsap.fromTo(element,
        { y: desktop ? 48 : 24, opacity: 0 },
        { y: 0, opacity: 1, duration: desktop ? 0.95 : 0.65, ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          onComplete: () => pending.delete(element),
        });
      pending.set(element, animation);
    });

    let entrance;
    if (hero && scrollY < 40 && !location.hash) {
      entrance = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
        .fromTo('.hero-copy > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 });
    }

    if (progress) gsap.fromTo(progress, { scaleX: 0, autoAlpha: 1 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
    });
    ScrollTrigger.create({
      start: 12, end: 'max',
      onUpdate: self => header?.classList.toggle('is-scrolled', self.scroll() > 12),
    });

    // Movimento vinculado ao scroll apenas em elementos decorativos.
    document.querySelectorAll('.section-rule').forEach(line => {
      gsap.fromTo(line, { scaleX: 0.2, opacity: 0.35 }, {
        scaleX: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: line.closest('.section-heading'), start: 'top 90%', end: 'top 40%', scrub: 0.6 },
      });
    });
    document.querySelectorAll('.section-atmosphere span').forEach(atmosphere => {
      gsap.fromTo(atmosphere, { yPercent: desktop ? 20 : 8 }, {
        yPercent: desktop ? -20 : -8, ease: 'none',
        scrollTrigger: { trigger: atmosphere.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
    });

    // Ao tabular, terminar entradas antes de mostrar o foco; nunca ocultá-lo.
    const showFocus = event => {
      if (hero?.contains(event.target)) entrance?.progress(1);
      for (const [element, animation] of pending) {
        if (element.contains(event.target)) animation.progress(1);
      }
    };
    const refresh = () => ScrollTrigger.refresh();
    const finishForPrint = () => {
      entrance?.progress(1);
      pending.forEach(animation => animation.progress(1));
    };
    document.addEventListener('focusin', showFocus);
    window.addEventListener('load', refresh, { once: true });
    window.addEventListener('beforeprint', finishForPrint);

    return () => {
      document.removeEventListener('focusin', showFocus);
      window.removeEventListener('load', refresh);
      window.removeEventListener('beforeprint', finishForPrint);
      header?.classList.remove('is-scrolled');
      delete root.dataset.motion;
      pending.clear();
    };
  };

  const mount = () => {
    media = gsap.matchMedia();
    media.add(conditions, setup);
  };
  mount();

  // Evitar animações em andamento restauradas pelo back/forward cache.
  const suspend = () => media.revert();
  const restore = event => { if (event.persisted) mount(); };
  window.addEventListener('pagehide', suspend);
  window.addEventListener('pageshow', restore);
  if (import.meta.hot) import.meta.hot.dispose(() => {
    media.revert();
    window.removeEventListener('pagehide', suspend);
    window.removeEventListener('pageshow', restore);
  });
}
