document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".navToggle");
  const menu = document.getElementById("mobileMenu");
  const header = document.querySelector("header.siteHeader");

  if (!btn || !menu || !header) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("isOpen");
    header.classList.toggle("isOpen", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
