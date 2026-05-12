// function.js - header scroll, menu mobile, smooth scroll, anno footer
(function () {
  const header = document.getElementById('header');
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const yearEl = document.getElementById('year');

  // Anno nel footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Classe scrolled sull'header
  function updateHeader() {
    const trigger = Math.min(window.innerHeight * 0.05, 60);
    header.classList.toggle('scrolled', window.scrollY > trigger);
  }

  // Toggle menu mobile
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    // Chiudi menu cliccando un link
    nav.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Chiudi menu cliccando fuori
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll per link interni
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Animazione sezioni all'entrata (Intersection Observer)
  const animatedEls = document.querySelectorAll('.about-card, .champ-card, .news-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
      io.observe(el);
    });
  }

  // Event listeners
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('load', updateHeader);
  window.addEventListener('resize', updateHeader);
})();