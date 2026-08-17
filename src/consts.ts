/**
 * Single source of truth for all site content.
 * Consumed by: pages, project detail routes, llms.txt endpoints, JSON-LD, sitemap.
 */

export const SITE_URL = 'https://ericmalamisura.com';

export const PERSON = {
  name: 'Eric Malamisura',
  firstName: 'Eric',
  lastName: 'Malamisura',
  role: 'Applied AI Engineer & Programming Language Designer',
  shortTitle: 'Creator of OriLang',
  location: 'United States',
  tagline: 'AI systems, programming languages, developer tools, and software products.',
  /**
   * No email is ever rendered — all contact flows through /contact
   * (Web3Forms). Paste your access key from https://web3forms.com
   * (requested with your address) to activate the form.
   */
  contact: {
    web3formsKey: 'c9a6b09e-d9b9-47c4-80ff-63b92acff698',
    endpoint: 'https://api.web3forms.com/submit',
  },
  /** One-line meta description (kept under 155 chars for SEO). */
  metaDescription:
    'Eric Malamisura is an applied AI engineer and the creator of OriLang. He builds AI systems, programming languages, developer tools, and software products.',
  /** Longer human + machine readable bio. */
  bio: [
    'Eric Malamisura is an applied AI engineer, programming-language designer, and founder. He created OriLang, a statically typed, natively compiled programming language, and is building its compiler and AI-oriented language tooling.',
    'His work on OriLang spans type inference, value semantics, automatic reference counting, capability-based effects, integrated testing, and LLVM code generation. The project reflects his focus on making ambitious systems ideas practical for working developers.',
    'Eric is the founder of Elucidsoft (founded in 2010), an independent software company. He also builds applied AI features, a GPU-accelerated terminal emulator, the cloudlayer.io and Upstat software products, and the WarpKit and OriJS frameworks used in those products. His work moves between AI, low-level systems engineering, and product development.',
  ],
  company: {
    name: 'Elucidsoft',
    legalName: 'Elucidsoft LLC',
    url: 'https://elucidsoft.com',
    foundingYear: 2010,
  },
  social: {
    github: 'https://github.com/elucidsoft',
    githubHandle: 'elucidsoft',
    company: 'https://elucidsoft.com',
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
  /** Search-result summary, kept concise while the card summary can carry more detail. */
  metaDescription: string;
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
    metaDescription:
      'OriLang is Eric Malamisura’s statically typed, natively compiled programming language with integrated testing, value semantics, and LLVM code generation.',
    description: [
      'OriLang is a statically-typed, expression-based, compiled programming language designed and authored entirely by Eric Malamisura. It compiles to standalone native executables on Windows, Linux, and macOS through LLVM — no garbage collector, no borrow checker, no runtime, no VM.',
      'OriLang pairs automatic reference counting with value semantics: variables own their data and assignments behave as logical copies. The design rules out shared mutable state and reference cycles, while compiler optimizations can turn value-semantic operations into in-place mutations.',
      'Testing is part of the language and compiler rather than an external library. OriLang also combines Hindley–Milner type inference, capability-based effects, const generics, and traits with associated types. Its AI writing kit gives models a versioned language reference and examples, supporting AI-assisted development even though OriLang is new to model training data.',
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
    metaDescription:
      'OriTerminal is Eric Malamisura’s GPU-rendered, cross-platform terminal emulator, written in Rust with a custom renderer and terminal-native interface.',
    description: [
      'OriTerminal is a GPU-accelerated terminal emulator written in Rust. A custom GPU renderer draws both the terminal grid and the application chrome at a 60+ FPS target instead of relying on native platform widgets.',
      'Its interface uses a restrained brutalist design language: flat surfaces, structural borders, and quick state changes. The application chrome is designed as an extension of the terminal grid.',
      'OriTerminal is also the companion development environment for OriLang, with a focus on rendering performance and consistent cross-platform behavior.',
    ],
    highlights: [
      'Custom GPU renderer for the grid and application chrome',
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
    metaDescription:
      'cloudlayer.io is Eric Malamisura’s document conversion API for generating PDF, PNG, and WEBP files from HTML, URLs, and templates.',
    description: [
      'cloudlayer.io is a document conversion platform that transforms HTML and URLs into PDF, PNG, and WEBP output. Customers use it for invoicing, reporting, certificates, and automated document generation.',
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
    metaDescription:
      'Upstat is Eric Malamisura’s incident-response platform for monitoring, on-call scheduling, status pages, service intelligence, and AI-assisted operations.',
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
    metaDescription:
      'WarpKit is Eric Malamisura’s Svelte 5 SPA framework for state-based routing, data fetching, schema-driven forms, and real-time applications.',
    description: [
      'WarpKit is a standalone Svelte 5 single-page-application framework that organizes routing around application state — unauthenticated, onboarding, authenticated — rather than around URLs alone. Every navigation flows through a predictable ten-phase pipeline with guards and middleware.',
      'It bundles a config-driven data layer with E-Tag caching and stale-while-revalidate, schema-driven forms with deep proxy binding and StandardSchema validation, type-safe real-time WebSockets with automatic reconnection, and a pluggable provider system for swapping browser APIs under test.',
      'WarpKit is used in production by Upstat and cloudlayer.io while the framework remains in alpha.',
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
    metaDescription:
      'OriJS is Eric Malamisura’s Bun-native TypeScript framework with dependency injection, guards, interceptors, and testing support—without decorators.',
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
