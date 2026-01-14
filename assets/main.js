// assets/main.js
(() => {
  const btn = document.querySelector('.navToggle');
  const menu = document.getElementById('mobileMenu');

  if (!btn || !menu) return;

  function isOpen() {
    return btn.getAttribute('aria-expanded') === 'true';
  }

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();
