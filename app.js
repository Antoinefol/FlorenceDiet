const ratio = 0.1;
var options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll("[class*='reveal-']").forEach(function (r) {
  observer.observe(r);
});

const wrap = document.querySelector(".wrap-avis");
const avis = document.querySelectorAll(".avis");
const carousel = document.querySelector(".carousel");

let index = 0;

function updateCarousel() {

    const slideWidth = avis[0].offsetWidth;
    const gap = 50;

    const carouselWidth = carousel.offsetWidth;
    const wrapWidth = wrap.scrollWidth;

    // position normale
    let translateX = (carouselWidth / 2) - (slideWidth / 2) - index * (slideWidth + gap);

    // limites pour empêcher le vide
    const maxTranslate = 0;
    const minTranslate = carouselWidth - wrapWidth;

    if (translateX > maxTranslate) translateX = maxTranslate;
    if (translateX < minTranslate) translateX = minTranslate;

    wrap.style.transform = `translateX(${translateX}px)`;
}

function nextSlide() {

    index++;

    if (index >= avis.length)
        index = 0;

    updateCarousel();
}

// initialisation
updateCarousel();

// responsive
window.addEventListener("resize", updateCarousel);

// auto slide
setInterval(nextSlide, 3000);