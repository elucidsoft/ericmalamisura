/**
 * Contact form (Web3Forms) enhancement: async submit with inline status.
 * Without JS the form POSTs natively and the `redirect` field returns the
 * visitor to /contact/?sent=1 — handled here on load as well.
 */

const MSG = {
  sending: 'Posting…',
  sent: 'Letter received. A reply follows.',
  error: 'The mailroom jammed — try again or use GitHub.',
};

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const say = (text: string) => {
    if (status) status.textContent = text;
  };

  if (new URLSearchParams(location.search).get('sent') === '1') {
    say(MSG.sent);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    say(MSG.sending);
    if (submit) submit.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        form.reset();
        say(MSG.sent);
      } else {
        say(json.message || MSG.error);
      }
    } catch {
      say(MSG.error);
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
