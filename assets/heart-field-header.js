(() => {
  "use strict";

  const initializeHeartFieldHeader = () => {
    const page = document.body;

    if (!page.classList.contains("hfa90Page")) {
      return;
    }

    const updateHeaderState = () => {
      page.classList.toggle("hfa90Scrolled", window.scrollY > 1);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    document.querySelectorAll("#mobileMenu a[href]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          link.target === "_blank"
        ) {
          return;
        }

        event.preventDefault();
        link.classList.add("hfa90MenuPressed");

        window.setTimeout(() => {
          window.location.assign(link.href);
        }, 180);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeHeartFieldHeader);
  } else {
    initializeHeartFieldHeader();
  }
})();

