# rfrolov.me

Personal website built with Next.js, TypeScript, and Tailwind CSS. Statically
exported and deployed to GitHub Pages.

## Tech Stack

- Next.js 16 (App Router, `output: "export"`)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- next-intl (English and German)
- MDX for blog posts, project detail pages, and book reflections
- Bun

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/           # App Router pages, nested under [locale]
├── components/
│   ├── layout/    # Navbar, Footer, MobileMenu, LanguageSwitcher
│   ├── providers/ # Theme, motion, tactile, analytics providers
│   ├── sections/  # Page sections (Hero, Blog, Projects, Experience, ...)
│   ├── seo/       # JSON-LD
│   └── ui/        # Reusable primitives
├── constants/     # Routes, styles, animations, site identity
├── content/       # MDX: blog posts, project details, book reflections
├── data/          # Static data (projects, experience, education, readings)
├── hooks/         # Shared React hooks
├── i18n/          # Locale config and routing
├── lib/           # Content loading, SEO, OG image helpers
├── messages/      # UI translations (en, de)
└── types/         # Shared TypeScript types
```

## Scripts

- `bun run dev` — start the development server
- `bun run build` — build and export to `out/`
- `bun run lint` / `bun run lint:fix` — ESLint
- `bun run typecheck` — `tsc --noEmit`
- `bun run format` / `bun run format:check` — Prettier
- `bun run blog:new` — scaffold a new blog post
- `bun run blog:check` — report posts missing a translation
- `bun run covers:fetch` — fetch book covers for the readings page

There is no `bun run start`: `output: "export"` produces a static `out/`
directory, so serve that with any static file server instead.
