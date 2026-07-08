/**
 * Night Edition theme switching. The pre-paint default is set inline in
 * Base.astro <head>; this module owns runtime toggling + persistence.
 */

export type Edition = 'day' | 'night';

const META_COLORS: Record<Edition, string> = {
  day: '#e9e8e5',
  night: '#0d0d0b',
};

export function currentEdition(): Edition {
  return document.documentElement.dataset.theme === 'night' ? 'night' : 'day';
}

export function setEdition(edition: Edition) {
  if (edition === 'night') {
    document.documentElement.dataset.theme = 'night';
  } else {
    delete document.documentElement.dataset.theme;
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', META_COLORS[edition]);
  try {
    localStorage.setItem('edition', edition);
  } catch {
    /* private mode — theme still applies for this page view */
  }
}

export function toggleEdition(): Edition {
  const next: Edition = currentEdition() === 'night' ? 'day' : 'night';
  setEdition(next);
  return next;
}

export function initTheme() {
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => toggleEdition());
  });
}
