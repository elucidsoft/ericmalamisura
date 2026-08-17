import type { APIRoute } from 'astro';
import { PERSON, PROJECTS, SITE_URL } from '../consts';

/**
 * /llms.txt — concise, machine-readable index of Eric Malamisura for LLMs.
 * Follows the llms.txt convention: H1 + blockquote summary + linked sections.
 */
export const GET: APIRoute = () => {
  const projectLinks = PROJECTS.map(
    (p) => `- [${p.name}](${SITE_URL}/work/${p.slug}): ${p.category}; ${p.status}. ${p.summary}`,
  ).join('\n');

  const body = `# ${PERSON.name}

> ${PERSON.metaDescription} This index follows the proposed llms.txt convention and was last reviewed on 2026-08-07.

## Projects

${projectLinks}

## Profiles and contact

- [Elucidsoft](https://elucidsoft.com): Independent software company founded by Eric Malamisura in 2010.
- [Full machine-readable profile](${SITE_URL}/llms-full.txt): Detailed biography, project roles, status, and technical context.
- [AI reference profile](${SITE_URL}/ai): Visible canonical facts and links.
- [Portfolio](${SITE_URL}): Human-readable overview and selected work.
- [Contact](${SITE_URL}/contact): Direct contact form.
- [GitHub](${PERSON.social.github}): Public code and repositories.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
