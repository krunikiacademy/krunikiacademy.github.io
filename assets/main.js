// assets/main.js
(() => {
  const btn = document.querySelector(".navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  // initial state
  btn.setAttribute("aria-expanded", "false");
  menu.hidden = true;
  menu.classList.remove("isOpen");

  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  const openMenu = () => {
    btn.setAttribute("aria-expanded", "true");
    menu.hidden = false;
    menu.classList.add("isOpen");
  };

  const closeMenu = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.classList.remove("isOpen");
    menu.hidden = true;
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // ให้ตรงกับ CSS breakpoint (เราใช้ 980)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 981px)").matches) closeMenu();
  });
})();
