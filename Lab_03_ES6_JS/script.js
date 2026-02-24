// Main index — minimal JS for interactivity
(() => {
  'use strict';

  // Stagger animation for cards that enter the viewport via IntersectionObserver
  const cards = document.querySelectorAll('.nav-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  }

  // Keyboard shortcut: number keys 1-7 navigate to tasks
  document.addEventListener('keydown', (e) => {
    const n = parseInt(e.key);
    if (n >= 1 && n <= 7 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const card = cards[n - 1];
      if (card) card.click();
    }
  });

  console.log('%c Lab 03 — ES6 JavaScript ', 'background:#0071e3;color:#fff;padding:4px 12px;border-radius:4px;font-weight:600');
  console.log('Press 1-7 to jump to any task.');
})();
