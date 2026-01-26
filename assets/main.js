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

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 861 && btn.getAttribute("aria-expanded") === "true") closeMenu();
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const ham = document.getElementById("krHam");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("menuBackdrop");
  const header = document.querySelector(".siteHeader");
  if (!ham || !menu || !backdrop || !header) return;

  // กัน bind ซ้ำ (อาการแตะแล้วเหมือนต้องแตะหลายครั้งเพราะ toggle สองรอบ)
  if (ham.dataset.bound === "1") return;
  ham.dataset.bound = "1";

  const openMenu = () => {
    header.classList.add("isMenuOpen");
    menu.hidden = false;
    backdrop.hidden = false;
    ham.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    header.classList.remove("isMenuOpen");
    menu.hidden = true;
    backdrop.hidden = true;
    ham.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = !menu.hidden;
    isOpen ? closeMenu() : openMenu();
  };

  // iOS: ใช้ pointerup/touchstart ให้ติดมือกว่า click
  ham.addEventListener("pointerup", toggleMenu, { passive: false });
  ham.addEventListener("touchstart", toggleMenu, { passive: false });

  // แตะ backdrop ปิด
  backdrop.addEventListener("pointerup", (e) => {
    e.preventDefault();
    closeMenu();
  }, { passive: false });

  // แตะลิงก์แล้วปิด (กันค้าง)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    closeMenu();
  });

  // กด ESC ปิด (desktop)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
