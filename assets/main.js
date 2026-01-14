// assets/main.js
(function () {
  async function loadHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    try {
      const res = await fetch("header.html", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load header.html");
      const html = await res.text();
      mount.innerHTML = html;

      // After header is injected, wire up the mobile menu
      setupMobileMenu();
    } catch (err) {
      console.error(err);
    }
  }

  function setupMobileMenu() {
    const btn = document.querySelector(".navToggle");
    const menu = document.getElementById("mobileMenu");

    if (!btn || !menu) return;

    function open() {
      btn.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      document.body.classList.add("menuOpen");
    }

    function close() {
      btn.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.classList.remove("menuOpen");
    }

    function isOpen() {
      return btn.getAttribute("aria-expanded") === "true";
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen() ? close() : open();
    });

    // close when clicking outside
    document.addEventListener("click", (e) => {
      if (!isOpen()) return;
      const clickedInsideMenu = menu.contains(e.target);
      const clickedToggle = btn.contains(e.target);
      if (!clickedInsideMenu && !clickedToggle) close();
    });

    // close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) close();
    });

    // if resize to desktop, close
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) close();
    });
  }

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadHeader);
  } else {
    loadHeader();
  }
})();
