/**
 * ASCII loupe: the photo renders normally; moving the pointer over it
 * reveals an ASCII rendering of the image inside a circular radius around
 * the cursor — a compositor's loupe showing the machine's view. Theme
 * aware. Progressive — without JS the plain <img> is all there is.
 */

const CELL = 10; // CSS px per character cell
const RAMP = '@%#*+=-:. '; // dark → light — short ramp for punchy contrast

export function initAscii() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-ascii]').forEach((frame) => {
    const img = frame.querySelector('img');
    if (img) setup(frame, img);
  });
}

function setup(frame: HTMLElement, img: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.className = 'ascii-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Full ASCII art is pre-rendered here, then clipped to the loupe.
  const art = document.createElement('canvas');
  const artCtx = art.getContext('2d');
  if (!artCtx) return;

  let ink = '#0c0c0c';
  let bg = '#e9e8e5';
  let w = 0;
  let h = 0;
  let dpr = 1;

  // Loupe state: eased position + radius easing to 0 when idle.
  let tx = 0;
  let ty = 0;
  let px = 0;
  let py = 0;
  let radius = 0;
  let hovering = false;
  let raf = 0;

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    ink = cs.getPropertyValue('--paper').trim() || ink;
    bg = cs.getPropertyValue('--ink').trim() || bg;
  };

  const build = () => {
    const rect = frame.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    if (!w || !h || !img.naturalWidth) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = art.width = Math.round(w * dpr);
    canvas.height = art.height = Math.round(h * dpr);

    const cols = Math.floor(w / CELL);
    const rows = Math.floor(h / (CELL * 1.15));
    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const octx = off.getContext('2d');
    if (!octx) return;

    // Cover-fit the source image into the sample grid.
    const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    octx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
    const data = octx.getImageData(0, 0, cols, rows).data;

    // Luminance with percentile normalization (2%–98% stretch) so the
    // ASCII spans the full ramp and tracks the photo's actual tonal range.
    const lums = new Float32Array(cols * rows);
    for (let n = 0; n < cols * rows; n++) {
      const k = n * 4;
      lums[n] = (0.2126 * data[k] + 0.7152 * data[k + 1] + 0.0722 * data[k + 2]) / 255;
    }
    const sorted = Array.from(lums).sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * 0.02)];
    const hi = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.98))];
    const range = Math.max(hi - lo, 0.001);

    artCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    artCtx.clearRect(0, 0, w, h);
    // Semi-transparent paper behind the glyphs so the photo ghosts through.
    artCtx.globalAlpha = 0.62;
    artCtx.fillStyle = bg;
    artCtx.fillRect(0, 0, w, h);
    artCtx.globalAlpha = 0.92;
    artCtx.fillStyle = ink;
    artCtx.font = `600 ${CELL + 1}px "JetBrains Mono", ui-monospace, monospace`;
    artCtx.textBaseline = 'top';

    const cellH = h / rows;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const lum = Math.min(1, Math.max(0, (lums[j * cols + i] - lo) / range));
        const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
        if (ch !== ' ') artCtx.fillText(ch, i * CELL, j * cellH);
      }
    }

    if (!canvas.isConnected) frame.appendChild(canvas);
    render();
  };

  const render = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (radius < 0.5) return;
    // Soft peek: full ASCII art masked by a radial falloff around the pointer.
    ctx.save();
    ctx.drawImage(art, 0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-in';
    const g = ctx.createRadialGradient(px, py, radius * 0.12, px, py, radius);
    g.addColorStop(0, 'rgba(0, 0, 0, 1)');
    g.addColorStop(0.55, 'rgba(0, 0, 0, 0.85)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  };

  const loop = () => {
    const targetR = hovering ? Math.min(150, w * 0.52) : 0;
    px += (tx - px) * 0.22;
    py += (ty - py) * 0.22;
    radius += (targetR - radius) * 0.16;
    render();
    if (hovering || radius > 0.5) {
      raf = requestAnimationFrame(loop);
    }
  };

  const wake = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  };

  frame.addEventListener('pointerenter', (e) => {
    const rect = frame.getBoundingClientRect();
    tx = px = e.clientX - rect.left;
    ty = py = e.clientY - rect.top;
    hovering = true;
    wake();
  });
  frame.addEventListener(
    'pointermove',
    (e) => {
      const rect = frame.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!hovering) {
        hovering = true;
        wake();
      }
    },
    { passive: true },
  );
  frame.addEventListener('pointerleave', () => {
    hovering = false;
    wake();
  });

  new MutationObserver(() => {
    readColors();
    build();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  let resizeTimer = 0;
  new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 120);
  }).observe(frame);

  readColors();
  const start = () => {
    // Ensure the mono font is loaded before drawing glyphs.
    const ready =
      'fonts' in document
        ? document.fonts.load(`${CELL + 1}px "JetBrains Mono"`)
        : Promise.resolve();
    ready.then(build, build);
  };
  if (img.complete && img.naturalWidth) {
    start();
  } else {
    img.decode().then(start, () => img.addEventListener('load', start, { once: true }));
  }
}
