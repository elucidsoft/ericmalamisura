/**
 * Types out [data-typer] code blocks character by character when they
 * scroll into view, then reveals [data-typer-out] result lines. The block
 * is fully visible without JS; a hard backstop guarantees it can never
 * stay hidden.
 */

export function initTypewriter() {
  document.querySelectorAll<HTMLElement>('[data-typer]').forEach(setup);
}

function setup(root: HTMLElement) {
  const code = root.querySelector('code');
  if (!code) return;

  // Wrap every character so highlighting spans keep their colors.
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  const chars: HTMLElement[] = [];
  for (const node of textNodes) {
    const frag = document.createDocumentFragment();
    for (const ch of node.data) {
      const s = document.createElement('span');
      s.className = 'tw-char';
      s.textContent = ch;
      frag.appendChild(s);
      chars.push(s);
    }
    node.replaceWith(frag);
  }

  const outs = Array.from(root.querySelectorAll<HTMLElement>('[data-typer-out]'));
  const caret = document.createElement('span');
  caret.className = 'tw-caret';
  caret.setAttribute('aria-hidden', 'true');
  root.classList.add('tw-armed');

  let started = false;
  let finished = false;

  const revealOuts = () => {
    outs.forEach((o, idx) => {
      setTimeout(() => o.classList.add('is-typed'), 350 + idx * 500);
    });
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    root.classList.remove('tw-armed');
    caret.remove();
    outs.forEach((o) => o.classList.add('is-typed'));
  };

  const start = () => {
    if (started) return;
    started = true;
    let i = 0;
    const step = () => {
      if (i >= chars.length) {
        finished = true;
        caret.remove();
        revealOuts();
        return;
      }
      const el = chars[i++];
      el.style.visibility = 'visible';
      el.after(caret);
      const ch = el.textContent || '';
      const delay = ch === '\n' ? 90 : 8 + Math.random() * 13;
      setTimeout(step, delay);
    };
    step();
  };

  new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          obs.disconnect();
          start();
        }
      }
    },
    { threshold: 0.3 },
  ).observe(root);

  // Backstop: whatever happens, the code is fully readable eventually.
  setTimeout(finish, 16000);
}
