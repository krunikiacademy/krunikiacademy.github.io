// assets/main.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".navToggle");
  const menu = document.getElementById("mobileMenu");

  if (!btn || !menu) return;

  const openMenu = () => {
    btn.setAttribute("aria-expanded", "true");
    menu.classList.add("isOpen");
    document.body.classList.add("navOpen");
  };

  const closeMenu = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.classList.remove("isOpen");
    document.body.classList.remove("navOpen");
  };

  const toggleMenu = () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  };

  btn.addEventListener("click", toggleMenu);

  // ปิดเมนูเมื่อกดลิงก์ในเมนู (UX ดีขึ้น)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // ปิดด้วยปุ่ม ESC (desktop/iPad keyboard)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // กันกรณี resize จาก mobile -> desktop แล้วเมนูค้าง
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });
});
