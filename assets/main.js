(function () {
  "use strict";

  const btn = document.getElementById("navToggle");
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
    // สำคัญ: remove hidden + เปิดให้ชัวร์
    menu.hidden = false;
    backdrop.hidden = false;

    btn.setAttribute("aria-expanded", "true");
    btn.classList.add(ACTIVE_CLASS);

    // ให้ transition ทำงาน
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
    }, 260);
  }

  function toggleMenu(e) {
    if (e) e.preventDefault();
    const opened = btn.getAttribute("aria-expanded") === "true";
    opened ? closeMenu() : openMenu();
  }

  // iPad: pointerup ติดแน่นกว่า click
  btn.addEventListener("pointerup", toggleMenu);
  btn.addEventListener("click", (e) => e.preventDefault()); // กัน double fire บางเครื่อง

  backdrop.addEventListener("pointerup", (e) => {
    e.preventDefault();
    if (btn.getAttribute("aria-expanded") === "true") closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") closeMenu();
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("pointerup", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 861 && btn.getAttribute("aria-expanded") === "true") closeMenu();
  });
})();
