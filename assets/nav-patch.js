// assets/nav-patch.js
(() => {
  "use strict";

  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  // Fix Android: capture click and force navigation safely
  menu.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      const href = a.getAttribute("href") || "";
      if (!href) return;

      // Respect modified clicks (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      // Allow in-page anchors
      if (href.startsWith("#")) return;

      // Force navigation
      e.preventDefault();
      window.location.assign(href);
    },
    true // capture
  );
})();
