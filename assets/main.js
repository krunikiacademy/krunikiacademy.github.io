/* =========================================
   KRUNIKI - assets/main.js (v1.1)
   - Removes old duplicate listeners by cloning nodes
   - Opens mobile menu from RIGHT only
   - Works with: #navToggle, #mobileMenu, #menuBackdrop
   ========================================= */

(function () {
  "use strict";

  const oldBtn = document.getElementById("navToggle");
  const oldMenu = document.getElementById("mobileMenu");
  const oldBackdrop = document.getElementById("menuBackdrop");

  if (!oldBtn || !oldMenu || !oldBackdrop) return;

  // ✅ Remove any previous event listeners by cloning
  const btn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(btn, oldBtn);

  const backdrop = oldBackdrop.cloneNode(true);
  oldBackdrop.parentNode.replaceChild(backdrop, oldBackdrop);

  const menu = oldMenu; // menu usually has no listeners; keep as is

  const OPEN_CLASS = "isOpen";
  const ACTIVE_CLASS = "isActive";
  const BODY_LOCK_CLASS = "menuOpen";

  function lockScroll(lock) {
    document.documentElement.classList.toggle(BODY_LOCK_CLASS, lock);
    document.body.classList.toggle(BODY_LOCK_CLASS, lock);
  }

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
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

    window.setTimeout(() => {
      menu.hidden = true;
      backdrop.hidden = true;
    }, 220);
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      // ✅ kill other handlers (if any) on same click
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    }
    isOpen() ? closeMenu() : openMenu();
  }

  // Click
  btn.addEventListener("click", toggleMenu, true);

  // Backdrop closes
  backdrop.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      if (isOpen()) closeMenu();
    },
    true
  );

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Clicking any link closes
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Defensive: if resized to desktop, close
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 861 && isOpen()) closeMenu();
  });
})();
