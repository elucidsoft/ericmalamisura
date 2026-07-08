/**
 * Single source of truth for all site content.
 * Consumed by: pages, project detail routes, llms.txt endpoints, JSON-LD, sitemap.
 */

export const SITE_URL = 'https://ericmalamisura.com';

export const PERSON = {
  name: 'Eric Malamisura',
  firstName: 'Eric',
  lastName: 'Malamisura',
  role: 'World-Leading AI Expert & Programming Language Architect',
  shortTitle: 'Creator of OriLang',
  location: 'United States',
  tagline: 'Languages, compilers, and systems for the age of AI.',
  /**
   * No email is ever rendered — all contact flows through /contact
   * (Web3Forms). Paste your access key from https://web3forms.com
   * (requested with your address) to activate the form.
   */
  contact: {
    web3formsKey: 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY',
    endpoint: 'https://api.web3forms.com/submit',
  },
  /** One-line meta description (kept under 155 chars for SEO). */
  metaDescription:
    'Eric Malamisura — world-leading AI expert and creator of the OriLang programming language and compiler. Languages, platforms, and systems for the age of AI.',
  /** Longer human + machine readable bio. */
  bio: [
    'Eric Malamisura is a world-leading AI expert of renown — a systems engineer and programming-language architect, and the creator, designer, and sole author of Ori (OriLang), a statically-typed, natively-compiled programming language built from the ground up for the age of AI.',
    'OriLang is a from-scratch compiler with Hindley–Milner type inference, value semantics, automatic reference counting (no garbage collector, no borrow checker), capability-based effects, and first-class testing — compiling to standalone native binaries through LLVM. It is one of the most technically ambitious independent language projects in the world.',
    'Beyond the language, Eric architects the full stack around it: a GPU-accelerated terminal emulator, production SaaS platforms serving millions of API calls, and the web frameworks that power them. He builds the compiler, the runtime, the tooling, and the product.',
  ],
  social: {
    github: 'https://github.com/elucidsoft',
    githubHandle: 'elucidsoft',
  },
} as const;

/**
 * Featured OriLang code — taken from the compiler's own spec suite
 * (compiler_repo/tests/spec/patterns/variant_punning.ori) and verified:
 * compiled and test passing via `ori test` before publication.
 */
export const CODE_SHOWCASE = {
  language: 'OriLang',
  code: `// Every function ships with its test — enforced by the compiler.
use std.testing { assert_eq }

type Shape = Circle(radius: float) | Square(side: float);

@area (s: Shape) -> float = match s {
    Circle(radius:) -> radius * radius * 3.14,
    Square(side:) -> side * side,
}

@test_area tests @area () -> void = {
    assert_eq(actual: area(s: Circle(radius: 2.0)), expected: 12.56);
    assert_eq(actual: area(s: Square(side: 3.0)), expected: 9.0)
}`,
  provenance:
    'Real Ori, from the compiler’s spec suite — compiled and test passing (1 passed, 0 failed) before publication.',
  verdict: '1 passed, 0 failed — OK',
} as const;

export const DISCIPLINES = [
  'Applied AI',
  'AI Language Tooling',
  'Compiler Engineering',
  'Programming Language Design',
  'Type Systems',
  'LLVM Code Generation',
  'GPU Rendering',
  'Distributed Systems',
  'Developer Tooling',
  'API Platforms',
  'Frontend Architecture',
  'Real-Time Systems',
] as const;

export type Project = {
  slug: string;
  name: string;
  /** Flagship projects render larger and lead the showcase. */
  flagship?: boolean;
  category: string;
  year: string;
  tagline: string;
  /** Short summary for cards + meta descriptions. */
  summary: string;
  /** Full description paragraphs for the detail page + llms-full. */
  description: string[];
  highlights: string[];
  stack: string[];
  url?: string;
  status: string;
  role: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'ori-lang',
    name: 'OriLang',
    flagship: true,
    category: 'Programming Language & Compiler',
    year: '2026 — present',
    tagline: 'Functional code. Imperative speed. Native binaries.',
    summary:
      'A programming language with mandatory testing baked into the compiler — statically-typed, natively compiled, no garbage collector and no borrow checker. Built for the age of AI.',
    description: [
      'OriLang is a statically-typed, expression-based, compiled programming language designed and authored entirely by Eric Malamisura. It compiles to standalone native executables on Windows, Linux, and macOS through LLVM — no garbage collector, no borrow checker, no runtime, no VM.',
      'Its defining innovation is the memory model: Automatic Reference Counting paired with value semantics, where every variable owns its data and every assignment is a logical copy. There is no shared mutable state, no aliasing bugs, no data races, and no reference cycles — prevented by language design rather than a collector. The compiler then transforms that value-semantic code into in-place mutations, delivering imperative performance from functional source.',
      'Testing is not a library bolted on after the fact — it is mandatory and baked into the compiler itself. If it compiles, it has tests; if it has tests, they pass. Combined with full Hindley–Milner type inference, capability-based effects, const generics, and traits with associated types, OriLang is engineered to be the language LLMs reach for: deterministic, statically verifiable, and shipped with a self-contained AI writing kit so models can author correct OriLang without it ever appearing in their training data.',
    ],
    highlights: [
      'From-scratch compiler with LLVM native code generation',
      'Hindley–Milner type inference across the whole program',
      'ARC + value semantics: no GC, no borrow checker, no cycles',
      'Mandatory testing baked into the compiler',
      'Ships an AI/LLM writing kit (llms.txt) for model-authored code',
    ],
    stack: ['Rust', 'LLVM', 'WASM', 'Type Theory'],
    url: 'https://ori-lang.com',
    status: 'Active development',
    role: 'Creator, language designer & compiler author',
  },
  {
    slug: 'ori-term',
    name: 'OriTerminal',
    flagship: true,
    category: 'GPU Terminal Emulator',
    year: '2026 — present',
    tagline: 'A GPU-rendered, cross-platform terminal emulator.',
    summary:
      'A GPU-rendered cross-platform terminal emulator built from the ground up — every pixel drawn by a custom renderer at 60+ FPS, with a brutalist terminal-native interface.',
    description: [
      'OriTerminal is a GPU-accelerated terminal emulator built entirely from scratch. There are no OS controls and no borrowed platform widgets — every pixel of the grid and the application chrome is drawn by a custom GPU renderer running at 60+ FPS.',
      'The interface follows an intentional, high-craft brutalist design language with a terminal soul: flat surfaces, structural borders that expose the grid, mechanical state changes that snap rather than ease. It is a machine that renders a terminal, and its UI is an extension of that grid rather than a skin from another design system.',
      'OriTerminal is the companion environment to the OriLang language — a developer surface engineered for speed, precision, and total visual control.',
    ],
    highlights: [
      'Custom GPU renderer — no native widgets, no compromises',
      '60+ FPS terminal grid and application chrome',
      'Brutalist, terminal-native design system',
      'Built from scratch in a systems language',
    ],
    stack: ['Rust', 'GPU / WGPU', 'Systems Programming'],
    url: 'https://oriterm.com',
    status: 'Alpha',
    role: 'Creator & systems engineer',
  },
  {
    slug: 'cloudlayer-io',
    name: 'cloudlayer.io',
    category: 'Document Conversion API',
    year: '2020 — present',
    tagline: 'HTML and URLs to pixel-perfect documents, at scale.',
    summary:
      'A dynamic PDF and image generation service — turn HTML, URLs, and templates into pixel-perfect PDF, PNG, and WEBP through a single API.',
    description: [
      'cloudlayer.io is a production-grade document conversion platform that transforms HTML and URLs into pixel-perfect PDF, PNG, and WEBP output. It powers invoicing, reporting, certificates, and automated document generation for businesses across the globe.',
      'The system is built as a distributed, queue-driven architecture — a public API surface, a job coordinator backed by BullMQ, and a fleet of headless rendering workers — engineered for throughput, reliability, and consistent rendering fidelity.',
      'Official SDKs ship for Go, Java, JavaScript, PHP, Python, Ruby, and Rust, making the API a first-class building block in any stack.',
    ],
    highlights: [
      'HTML / URL → PDF, PNG, WEBP at production scale',
      'Distributed queue-driven rendering architecture',
      'Official SDKs in 7 languages',
      'Built on Bun, BullMQ, Redis, and headless Chromium',
    ],
    stack: ['Bun', 'TypeScript', 'BullMQ', 'Redis', 'Puppeteer', 'Firebase'],
    url: 'https://cloudlayer.io',
    status: 'In production',
    role: 'Founder & principal engineer',
  },
  {
    slug: 'upstat-io',
    name: 'Upstat',
    category: 'Incident Response Platform',
    year: '2022 — present',
    tagline: 'Operational intelligence for the teams who keep things up.',
    summary:
      'A collaborative incident-response and operational-intelligence platform for DevOps, SRE, and engineering teams — monitoring, on-call, status pages, and an AI assistant.',
    description: [
      'Upstat is a collaborative incident-response and operational-intelligence platform built for DevOps engineers, SREs, and engineering managers. It covers the full incident lifecycle alongside proactive monitoring, on-call scheduling, service cataloging, and external status communication.',
      'It pairs multi-region synthetic monitoring and heartbeat health checks with a complete incident workflow, entity-based dependency modeling with impact analysis, advanced on-call rotations, and infrastructure-independent status pages.',
      'A context-aware AI assistant sits across the platform, delivering role-based operational intelligence to the people resolving incidents in real time.',
    ],
    highlights: [
      'Full incident lifecycle with real-time team coordination',
      'Multi-region HTTP/PING monitoring and heartbeats',
      'Service catalog with dependency and impact modeling',
      'On-call scheduling and infrastructure-independent status pages',
      'Context-aware AI operational assistant',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'SvelteKit', 'Cloudflare', 'WarpKit'],
    url: 'https://upstat.io',
    status: 'In production',
    role: 'Founder & principal engineer',
  },
  {
    slug: 'warpkit',
    name: 'WarpKit',
    category: 'Frontend Framework',
    year: '2023 — present',
    tagline: 'State-based routing for serious Svelte 5 applications.',
    summary:
      'A standalone Svelte 5 SPA framework with state-based routing, a predictable navigation pipeline, config-driven data fetching, schema-driven forms, and real-time WebSockets.',
    description: [
      'WarpKit is a standalone Svelte 5 single-page-application framework that organizes routing around application state — unauthenticated, onboarding, authenticated — rather than around URLs alone. Every navigation flows through a predictable ten-phase pipeline with guards and middleware.',
      'It bundles a config-driven data layer with E-Tag caching and stale-while-revalidate, schema-driven forms with deep proxy binding and StandardSchema validation, type-safe real-time WebSockets with automatic reconnection, and a pluggable provider system for swapping browser APIs under test.',
      'WarpKit is built and battle-tested in production, powering both Upstat and cloudlayer.io.',
    ],
    highlights: [
      'State-based routing with a 10-phase navigation pipeline',
      'Config-driven data layer with E-Tag + stale-while-revalidate',
      'Schema-driven forms with StandardSchema validation',
      'Type-safe real-time WebSockets with auto-reconnect',
      'Powers Upstat and cloudlayer.io in production',
    ],
    stack: ['Svelte 5', 'TypeScript', 'WebSockets', 'StandardSchema'],
    url: 'https://warpkit.org',
    status: 'Alpha — in production use',
    role: 'Creator & maintainer',
  },
  {
    slug: 'orijs',
    name: 'OriJS',
    category: 'Backend Framework',
    year: '2023 — present',
    tagline: 'A NestJS-inspired framework for Bun — without the decorators.',
    summary:
      'A Bun-native backend framework — fast, type-safe, with first-class testing support. Dependency injection, guards, and interceptors through TypeScript interfaces, no decorators required. Powers production systems.',
    description: [
      'OriJS is a NestJS-inspired web framework for the Bun runtime that deliberately avoids decorators. It delivers dependency injection, guards, interceptors, and organized controllers through plain TypeScript interfaces and a fluent builder API.',
      'It borrows the best ideas from across the ecosystem — DI and structure from NestJS, end-to-end type safety from Elysia, lightweight middleware from Hono, schema-based validation from Fastify, and structured logging from Pino — while keeping configuration explicit, testable, and free of runtime reflection.',
      'The framework is organized into focused, swappable provider packages so every piece of infrastructure can be replaced with your own implementation.',
    ],
    highlights: [
      'Dependency injection without decorators or reflect-metadata',
      'Guards, interceptors, and organized controllers',
      'End-to-end type safety and schema-based validation',
      'Swappable provider package architecture',
    ],
    stack: ['Bun', 'TypeScript', 'Dependency Injection'],
    url: 'https://orijs.org',
    status: 'Alpha — in production use',
    role: 'Creator & maintainer',
  },
];

export const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#disciplines', label: 'Craft' },
  { href: '/contact', label: 'Contact' },
] as const;
