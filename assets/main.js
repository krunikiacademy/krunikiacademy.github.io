/* =========================================
   KRUNIKI - assets/main.js
   Works with index2.html structure:
   #navToggle, #mobileMenu, #menuBackdrop
   Slide from RIGHT only, no overlap bugs
   ========================================= */

(function () {
  "use strict";

  const btn = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("menuBackdrop");

  // Guard: if any element missing, do nothing safely.
  if (!btn || !menu || !backdrop) return;

  const OPEN_CLASS = "isOpen";
  const ACTIVE_CLASS = "isActive"; // for button styling in CSS
  const BODY_LOCK_CLASS = "menuOpen";

  function lockScroll(lock) {
    if (lock) {
      document.documentElement.classList.add(BODY_LOCK_CLASS);
      document.body.classList.add(BODY_LOCK_CLASS);
    } else {
      document.documentElement.classList.remove(BODY_LOCK_CLASS);
      document.body.classList.remove(BODY_LOCK_CLASS);
    }
  }

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    // Ensure visible
    menu.hidden = false;
    backdrop.hidden = false;

    // Accessibility + active state
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add(ACTIVE_CLASS);

    // Let transitions run
    requestAnimationFrame(() => {
      menu.classList.add(OPEN_CLASS);
      backdrop.classList.add(OPEN_CLASS);
    });

    lockScroll(true);
  }

  function closeMenu() {
    menu.classList.remove(OPEN_CLASS);
    backdrop.classList.remove(OPEN_CLASS);

    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove(ACTIVE_CLASS);

    lockScroll(false);

    // Wait for transition, then hide
    window.setTimeout(() => {
      menu.hidden = true;
      backdrop.hidden = true;
    }, 220);
  }

  function toggleMenu() {
    isOpen() ? closeMenu() : openMenu();
  }

  // Click
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Backdrop closes
  backdrop.addEventListener("click", (e) => {
    e.preventDefault();
    if (isOpen()) closeMenu();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Clicking links closes
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (isOpen()) closeMenu();
    });
  });

  // Defensive: If resized to desktop width, force close
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 861 && isOpen()) closeMenu();
  });
})();
