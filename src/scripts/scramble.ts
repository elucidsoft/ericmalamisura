/**
 * Text scramble on hover/focus for [data-scramble] elements — characters
 * cycle through a glyph pool and lock in left to right. Layout-safe on
 * monospace text (length is preserved).
 */

const GLYPHS = '#%&@$/\\|<>[]{}=+*·ABCDEFGHIKLMNOPQRSTUVWXYZ0123456789';
const FRAMES_PER_CHAR = 2.2;

export function initScramble() {
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
    const original = el.textContent ?? '';
    if (!original.trim()) return;
    let raf = 0;

    const play = () => {
      cancelAnimationFrame(raf);
      let frame = 0;
      const total = Math.ceil(original.length * FRAMES_PER_CHAR) + 4;
      const tick = () => {
        frame++;
        const locked = Math.floor((frame / total) * original.length);
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (i < locked || ch === ' ') return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
        if (frame < total) {
          raf = requestAnimationFrame(tick);
        } else {
          el.textContent = original;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('mouseenter', play);
    el.addEventListener('focus', play);
  });
}
