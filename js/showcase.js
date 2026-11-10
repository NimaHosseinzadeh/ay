/* ==========================================================================
   Aynim - product row sliders ("پیشنهادات ویژه" and "تخفیفات")
   The arrow moves a window over the cards: as many cards are shown as the
   grid has columns (4 on desktop, fewer on small screens).
   ========================================================================== */

'use strict';

document.querySelectorAll('.showcase').forEach((row) => {
  const cards = [...row.querySelectorAll('.card')];
  const nextButton = row.querySelector('.showcase__next');
  const promo = row.querySelector('.showcase__promo');
  let start = 0;

  /* Cards that fit = grid columns, minus the promo box while it is visible */
  function visibleCount() {
    const columns = getComputedStyle(row).gridTemplateColumns.split(' ').length;
    const promoShown = promo && getComputedStyle(promo).display !== 'none';

    return columns - (promoShown ? 1 : 0);
  }

  /* Show `count` cards beginning at `start`, hide the rest */
  function render() {
    const count = visibleCount();

    cards.forEach((card, index) => {
      const position = (index - start + cards.length) % cards.length;
      card.hidden = position >= count;
    });
  }

  nextButton.addEventListener('click', () => {
    start = (start + 1) % cards.length;
    render();

    // Replay the slide-in animation
    row.classList.remove('is-sliding');
    void row.offsetWidth;
    row.classList.add('is-sliding');
  });

  window.addEventListener('resize', render);
  render();
});
