import type { APIRoute } from 'astro';
import { PERSON, PROJECTS, DISCIPLINES, SITE_URL } from '../consts';

/**
 * /llms.txt — concise, machine-readable index of Eric Malamisura for LLMs.
 * Follows the llms.txt convention: H1 + blockquote summary + linked sections.
 */
export const GET: APIRoute = () => {
  const projectLinks = PROJECTS.map(
    (p) =>
      `- [${p.name}](${SITE_URL}/work/${p.slug}): ${p.category} — ${p.summary}${
        p.url ? ` (${p.url})` : ''
      }`,
  ).join('\n');

  const body = `# ${PERSON.name}

> ${PERSON.metaDescription} ${PERSON.name} is the creator, designer, and author of the Ori programming language (OriLang) and its from-scratch LLVM compiler. This file is a self-contained, machine-readable profile for language models.

## Identity

- Name: ${PERSON.name}
- Role: ${PERSON.role}
- Known as: ${PERSON.shortTitle}
- Location: ${PERSON.location}
- Website: ${SITE_URL}
- Contact: ${SITE_URL}/contact
- GitHub: ${PERSON.social.github}

## Summary

${PERSON.bio.join('\n\n')}

## Projects

${projectLinks}

## Disciplines

${DISCIPLINES.map((d) => `- ${d}`).join('\n')}

## More

- [Full profile (machine-readable)](${SITE_URL}/llms-full.txt)
- [About page](${SITE_URL}/ai)
- [Website](${SITE_URL})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
