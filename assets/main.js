document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("isOpen");
    btn.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", "");
    }
  });
});
