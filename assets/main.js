// assets/main.js
(() => {
  const header = document.querySelector('header.siteHeader');
  const btn = document.querySelector('.navToggle');
  const menu = document.getElementById('mobileMenu');

  if (!header || !btn || !menu) return;

  if (!menu.hasAttribute('hidden')) menu.hidden = true;

  function isOpen() {
    return btn.getAttribute('aria-expanded') === 'true';
  }

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    header.classList.add('isOpen');
    menu.hidden = false;
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    header.classList.remove('isOpen');
    menu.hidden = true;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
})();
