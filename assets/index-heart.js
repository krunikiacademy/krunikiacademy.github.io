(() => {
  "use strict";

  const slider = document.querySelector("[data-heart-slider]");
  if (!slider) return;

  const viewport = slider.querySelector(".heartSliderViewport");
  const track = slider.querySelector(".heartSliderTrack");
  const slides = Array.from(slider.querySelectorAll(".heartSlide"));
  const dots = Array.from(slider.querySelectorAll(".heartSliderDots button"));
  const previous = slider.querySelector(".heartSliderPrev");
  const next = slider.querySelector(".heartSliderNext");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!viewport || !track || slides.length < 2) return;

  let current = 0;
  let timer = null;
  let touchStartX = 0;

  const resizeViewport = () => {
    const activeImage = slides[current].querySelector("img");
    if (!activeImage) return;
    viewport.style.height = `${activeImage.getBoundingClientRect().height}px`;
  };

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("isActive", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    resizeViewport();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (!reduceMotion) timer = window.setInterval(() => show(current + 1), 6500);
  };

  previous?.addEventListener("click", () => {
    show(current - 1);
    start();
  });

  next?.addEventListener("click", () => {
    show(current + 1);
    start();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      show(index);
      start();
    });
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  slider.addEventListener("focusout", start);
  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
    stop();
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) >= 45) show(current + (distance < 0 ? 1 : -1));
    start();
  }, { passive: true });

  window.addEventListener("resize", resizeViewport);

  slides.forEach((slide) => {
    const image = slide.querySelector("img");
    if (image && !image.complete) image.addEventListener("load", resizeViewport, { once: true });
  });

  show(0);
  start();
})();
