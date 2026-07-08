/**
 * Display helpers. Data in consts.ts stays plain text (for llms.txt etc.);
 * these adjust only the rendered HTML.
 */

const NBSP = String.fromCharCode(160);

/** Keep "AI" bound to the following word with a non-breaking space. */
export const bindAI = (s: string): string => s.replace(/AI /g, `AI${NBSP}`);
