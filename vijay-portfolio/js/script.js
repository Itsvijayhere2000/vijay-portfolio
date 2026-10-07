(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('nav-menu');
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Header background + back-to-top visibility ---------- */
  function initScrollState() {
    const header = document.querySelector('.site-header');
    const backToTop = document.querySelector('.back-to-top');
    let ticking = false;

    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ---------- Active navigation link ---------- */
  function initActiveNav() {
    const links = new Map(
      [...document.querySelectorAll('.nav__link')].map((link) => [link.getAttribute('href').slice(1), link])
    );

    const setActive = (activeId) => {
      links.forEach((link, id) => {
        const active = id === activeId;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    // A section counts as current while it crosses a thin band just above the viewport's middle.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    if (prefersReducedMotion) return;

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver((entries) => {
      // Elements entering together (e.g. a row of cards) are staggered.
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          setTimeout(() => entry.target.classList.add('is-visible'), index * 80);
          observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  /* ---------- Terminal typing ---------- */
  function initTerminalTyping() {
    if (prefersReducedMotion) return;

    const CHAR_DELAY = 24;
    const LINE_DELAY = 160;
    const START_DELAY = 700;

    const body = document.querySelector('.terminal__body');
    const cursor = body.querySelector('.terminal__cursor');

    // The full text ships in the HTML; it is emptied here and typed back in.
    const queue = [...body.querySelectorAll('.terminal__line')].map((line) => {
      const target = line.querySelector('[data-typed]');
      const text = target.textContent;
      target.textContent = '';
      line.classList.add('is-pending');
      return { line, target, text };
    });

    const typeLine = (index) => {
      if (index === queue.length) return;

      const { line, target, text } = queue[index];
      let typed = 0;
      line.classList.remove('is-pending');
      target.after(cursor);

      const tick = () => {
        typed += 1;
        target.textContent = text.slice(0, typed);
        if (typed < text.length) setTimeout(tick, CHAR_DELAY);
        else setTimeout(() => typeLine(index + 1), LINE_DELAY);
      };

      tick();
    };

    setTimeout(() => typeLine(0), START_DELAY);
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollState();
    initActiveNav();
    initScrollReveal();
    initTerminalTyping();
    initFooterYear();
  });
})();
