/**
 * Scroll reveals (IntersectionObserver — no GSAP dependency).
 * The ONLY module that gates content visibility; must never leave
 * anything hidden.
 */

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function revealEverything() {
  document
    .querySelectorAll('[data-reveal], .line-mask')
    .forEach((el) => el.classList.add('is-in'));
}

export function initReveals() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .line-mask');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEverything();
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => io.observe(el));

  // Failsafe: guarantee nothing stays hidden — covers static captures,
  // non-scrolling viewports, and any environment where IO doesn't fire.
  const revealAll = () => {
    io.disconnect();
    revealEverything();
  };
  window.addEventListener('load', () => setTimeout(revealAll, 1400), { once: true });
  // Hard backstop in case `load` never fires.
  setTimeout(revealAll, 3500);
}
