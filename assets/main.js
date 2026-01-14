/* assets/main.js
   KRUNIKI Academy — shared JS (safe & minimal)
   - Mobile hamburger toggle (.navToggle + #mobileMenu)
*/

(function () {
  function initHamburger() {
    const btn = document.querySelector(".navToggle");
    const menu = document.getElementById("mobileMenu");

    // If a page doesn't have header/menu, do nothing (safe)
    if (!btn || !menu) return;

    // Ensure menu starts hidden (defensive)
    if (btn.getAttribute("aria-expanded") !== "true") {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      menu.hidden = isOpen;
    });

    // Optional: close menu when click a link (nice UX on mobile)
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });

    // Optional: close menu on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        btn.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }
    });
  }

  // Run after DOM ready (works even if script in <head>)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHamburger);
  } else {
    initHamburger();
  }
})();
