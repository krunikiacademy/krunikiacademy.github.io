(function () {
  "use strict";

  const btn = document.getElementById("krHam");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("menuBackdrop");
  if (!btn || !menu || !backdrop) return;

  const OPEN_CLASS = "isOpen";
  const ACTIVE_CLASS = "isActive";
  const BODY_LOCK_CLASS = "menuOpen";

  function lockScroll(lock) {
    document.documentElement.classList.toggle(BODY_LOCK_CLASS, lock);
    document.body.classList.toggle(BODY_LOCK_CLASS, lock);
  }

  function openMenu() {
    menu.hidden = false;
    backdrop.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add(ACTIVE_CLASS);
    requestAnimationFrame(() => menu.classList.add(OPEN_CLASS));
    lockScroll(true);
  }

  function closeMenu() {
    menu.classList.remove(OPEN_CLASS);
    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove(ACTIVE_CLASS);
    lockScroll(false);
    setTimeout(() => {
      menu.hidden = true;
      backdrop.hidden = true;
    }, 260);
  }

  btn.addEventListener("pointerup", (e) => {
    e.preventDefault();
    const opened = btn.getAttribute("aria-expanded") === "true";
    opened ? closeMenu() : openMenu();
  });

  backdrop.addEventListener("pointerup", (e) => {
    e.preventDefault();
    closeMenu();
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("pointerup", closeMenu));
})();
