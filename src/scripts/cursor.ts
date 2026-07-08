/**
 * Custom cursor: a blinking terminal caret that follows the pointer and
 * morphs into a selection frame over interactive elements. Fine pointers
 * only; the native cursor is hidden via html.cursor-on (see global.css).
 */

import { gsap } from 'gsap';

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], .hover-target';

export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Hidden via visibility (not opacity — the blink animation owns opacity)
  // until the first real mouse move.
  const el = document.createElement('div');
  el.className = 'cursor-caret cursor-caret--idle';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  document.documentElement.classList.add('cursor-on');

  gsap.set(el, { xPercent: -50, yPercent: -50 });
  const xTo = gsap.quickTo(el, 'x', { duration: 0.16, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.16, ease: 'power3.out' });

  window.addEventListener(
    'mousemove',
    (e) => {
      el.classList.remove('cursor-caret--idle');
      xTo(e.clientX);
      yTo(e.clientY);
    },
    { passive: true },
  );

  document.addEventListener('mouseover', (e) => {
    if ((e.target as Element).closest?.(INTERACTIVE)) {
      el.classList.add('cursor-caret--hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as Element).closest?.(INTERACTIVE)) {
      el.classList.remove('cursor-caret--hover');
    }
  });
  document.addEventListener('mousedown', () => el.classList.add('cursor-caret--press'));
  document.addEventListener('mouseup', () => el.classList.remove('cursor-caret--press'));
  document.documentElement.addEventListener('mouseleave', () => {
    el.classList.add('cursor-caret--idle');
  });
}
