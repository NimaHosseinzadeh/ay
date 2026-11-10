/* ==========================================================================
   Aynim - hero slider
   Autoplay every 5 seconds, next arrow and clickable dots
   ========================================================================== */

'use strict';

const hero = document.querySelector('.hero');
const slides = hero.querySelectorAll('.hero__slide');
const dots = document.querySelectorAll('.dots__item');
const nextButton = hero.querySelector('.hero__next');

let current = 0;
let timer;

/* Show one slide and mark its dot */
function showSlide(index) {
  current = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.hidden = i !== current;
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === current);
  });
}

function startAutoplay() {
  stopAutoplay();
  timer = setInterval(() => showSlide(current + 1), 5000);
}

function stopAutoplay() {
  clearInterval(timer);
}

/* Arrow: next slide */
nextButton.addEventListener('click', () => {
  showSlide(current + 1);
  startAutoplay();
});

/* Dots: go to that slide */
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoplay();
  });
});

/* Pause while the mouse is over the slider */
hero.addEventListener('mouseenter', stopAutoplay);
hero.addEventListener('mouseleave', startAutoplay);

showSlide(0);
startAutoplay();
