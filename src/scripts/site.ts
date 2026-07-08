/**
 * Boot orchestrator. Reveals run first and can never gate content on
 * failure; every other module is an isolated enhancement.
 */

import { initReveals, revealEverything } from './reveal';
import { initTheme } from './theme';
import { initTerminal } from './terminal';
import { initContactForm } from './contactform';
import { initMotion } from './motion';
import { initCursor } from './cursor';
import { initScramble } from './scramble';
import { initAscii } from './ascii';
import { initTypewriter } from './typewriter';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let started = false;

export function initSite() {
  if (started) return;
  started = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

function boot() {
  try {
    initReveals();
  } catch (err) {
    revealEverything();
    console.error('[site] reveal failed, showing all content', err);
  }

  // Functional (motion-free) features — always on.
  safe(initTheme);
  safe(initTerminal);
  safe(initContactForm);

  if (prefersReduced) return;

  // Motion enhancements — each isolated so one failure can't blank the page.
  safe(initMotion);
  safe(initCursor);
  safe(initScramble);
  safe(initAscii);
  safe(initTypewriter);
}

function safe(fn: () => void) {
  try {
    fn();
  } catch (err) {
    console.error('[site] enhancement skipped', err);
  }
}
