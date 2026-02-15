const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav='links']");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));

  const getStep = () => {
    if (!track || !track.children.length) {
      return 0;
    }
    const card = track.children[0];
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return card.getBoundingClientRect().width + gap;
  };

  const updateDots = () => {
    if (!track || !dots.length) {
      return;
    }
    const step = getStep() || 1;
    const index = Math.round(track.scrollLeft / step);
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  if (prevButton && nextButton && track) {
    prevButton.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateDots);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const step = getStep();
      if (!track) {
        return;
      }
      track.scrollTo({ left: step * index, behavior: "smooth" });
    });
  });

  updateDots();
}
