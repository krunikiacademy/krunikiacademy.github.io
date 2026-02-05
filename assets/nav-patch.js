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

// assets/nav-patch.js
(() => {
  "use strict";

  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  const shouldIgnore = (e) =>
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (typeof e.button === "number" && e.button !== 0);

  const go = (href) => {
    // navigate after current event stack (allow close animation if any)
    setTimeout(() => window.location.assign(href), 0);
  };

  const handleNav = (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;

    const href = a.getAttribute("href") || "";
    if (!href) return;

    // allow in-page anchors normally
    if (href.startsWith("#")) return;

    // allow modified clicks (new tab)
    if (shouldIgnore(e)) return;

    // FORCE navigation even if other handlers preventDefault / suppress click
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    go(href);
  };
  
 // ✅ สำคัญ: pointerup capture (แก้กรณี click ไม่ถูกสร้าง)
  menu.addEventListener("pointerup", handleNav, true);

  // ✅ เผื่อบางเบราว์เซอร์ที่ยังส่ง click ปกติ
  menu.addEventListener("click", handleNav, true);
})();
