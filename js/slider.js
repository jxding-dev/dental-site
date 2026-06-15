const initReviewSlider = (slider) => {
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll("[data-slider-slide]"));
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");

  if (!slides.length || !prevButton || !nextButton || !dotsContainer) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoplayId = null;
  const autoplayDelay = 4500;

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const goToSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    updateSlides();
  };

  const stopAutoplay = () => {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
  };

  const startAutoplay = () => {
    if (slides.length <= 1 || autoplayId) return;
    autoplayId = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, autoplayDelay);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `${index + 1}번 후기 보기`);

    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
    return dot;
  });

  prevButton.addEventListener("click", () => {
    goToSlide(activeIndex - 1);
    restartAutoplay();
  });

  nextButton.addEventListener("click", () => {
    goToSlide(activeIndex + 1);
    restartAutoplay();
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  updateSlides();
  startAutoplay();
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider]").forEach(initReviewSlider);
});
