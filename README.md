# rfrolov.me

My personal site — portfolio, blog, CV, and a log of what I read.

[**rfrolov.me**](https://rfrolov.me) &nbsp;·&nbsp; [![Deploy](https://github.com/r-frolov/rfrolov.me/actions/workflows/nextjs.yml/badge.svg)](https://github.com/r-frolov/rfrolov.me/actions/workflows/nextjs.yml)

Built with Next.js 16 and exported to static HTML — no server, no runtime, just
files on GitHub Pages.

## Features

- **Bilingual** — every page exists in English and German under `/en` and `/de`,
  with hreflang alternates that only ever point at pages that exist.
- **MDX content** — blog posts, project write-ups, and book reflections, with
  syntax highlighting, reading time, series grouping, tag pages, and a
  generated table of contents.
- **Command palette** — <kbd>⌘K</kbd> to jump to any page or post, switch theme,
  or change language.
- **Tactile mode** — an opt-in interaction skin that makes surfaces respond
  physically. Off by default, toggled from the footer or with
  <kbd>Shift</kbd>+<kbd>T</kbd>.
- **Terminal 404** — an interactive prompt instead of a dead end: `cd` with tab
  completion navigates the site.
- **Per-page Open Graph images** — generated at build time from the page's own
  content, in the site's typeface.
- **SEO** — JSON-LD for person, articles, breadcrumbs and book reviews, plus a
  sitemap whose `lastmod` is derived from the content rather than hand-kept.
- **Light and dark themes**, and a reduced-motion path throughout.

### Keyboard shortcuts

| Key                                          | Action                   |
| -------------------------------------------- | ------------------------ |
| <kbd>⌘K</kbd> / <kbd>Ctrl</kbd>+<kbd>K</kbd> | Open the command palette |
| <kbd>?</kbd>                                 | Show all shortcuts       |
| <kbd>T</kbd>                                 | Toggle theme             |
| <kbd>L</kbd>                                 | Switch language          |
| <kbd>Shift</kbd>+<kbd>T</kbd>                | Toggle tactile mode      |

## Getting started

```bash
bun install
bun run dev
```

Open [localhost:3000](http://localhost:3000). The site redirects to your
default locale.

## Scripts

| Script                            | What it does                            |
| --------------------------------- | --------------------------------------- |
| `bun run dev`                     | Development server                      |
| `bun run build`                   | Build and export to `out/`              |
| `bun run lint` / `lint:fix`       | ESLint                                  |
| `bun run typecheck`               | `tsc --noEmit`                          |
| `bun run format` / `format:check` | Prettier                                |
| `bun run blog:new <slug>`         | Scaffold a post in both locales         |
| `bun run blog:check`              | Report posts missing a translation      |
| `bun run covers:fetch`            | Fetch book covers for the readings page |

There is no `start` script — `output: "export"` produces a static `out/`
directory, so serve that with any static file server.

## Adding content

### A blog post

```bash
bun run blog:new my-post-slug
```

That creates `NNN_my-post-slug.en.mdx` and `.de.mdx` in `src/content/blog/`,
both as drafts. The numeric prefix sets the ordering; the locale suffix is what
splits them. Frontmatter:

```yaml
title: "How I Use Different AI Models for Different Development Tasks"
description: "One-line summary, used for the card and the OG image."
date: "2026-04-14"
tags: ["ai", "developer-tools"]
featured: true
draft: false
series: { name: "Claude Code", order: 2 } # optional
```

Drafts are hidden in production builds and visible in development. A post
without a German file simply does not appear on `/de` — `bun run blog:check`
lists those.

### A book

Add an entry to `src/data/readings.ts` with `status: "reading"` or
`"finished"`. For a longer reflection, add
`src/content/readings/<slug>.mdx` — the body is rendered on the book's page.

### A project

Add it to `src/data/projects/en.ts` and `de.ts`. For a detail page, add
`src/content/projects/<id>.<locale>.mdx`; without one the project renders as a
card only.

## Project structure

```
src/
├── app/           # App Router pages, nested under [locale]
├── components/
│   ├── layout/    # Navbar, Footer, MobileMenu, LanguageSwitcher
│   ├── providers/ # Theme, motion, tactile, analytics
│   ├── sections/  # Page sections (Hero, Blog, Projects, Experience, ...)
│   ├── seo/       # JSON-LD
│   └── ui/        # Reusable primitives
├── constants/     # Routes, styles, animations, site identity
├── content/       # MDX: blog posts, project details, book reflections
├── data/          # Static data (projects, experience, education, readings)
├── hooks/         # Shared React hooks
├── i18n/          # Locale config and routing
├── lib/           # Content loading, SEO, OG image helpers
├── messages/      # UI translations (en.json, de.json)
└── types/         # Shared TypeScript types
```

## Deployment

Pushing to `main` runs [the Pages workflow](.github/workflows/nextjs.yml):
lint, typecheck, build, then publish `out/`. A failure at any step blocks the
deploy.

## Notes on the static export

`output: "export"` rules out middleware, API routes, and anything else needing
a request at runtime. Two consequences worth knowing before changing code here:

- Locale routing is entirely in the URL. There is no `Accept-Language`
  negotiation, so `/` serves a redirect to the default locale.
- Client components must not read the clock or other impure sources during
  render. Compute in a server component and pass the value down, so it is
  baked in at build time.

## Tech stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · next-intl ·
next-mdx-remote · Shiki · Bun

## License

[MIT](LICENSE) © Roman Frolov
