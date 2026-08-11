# CLAUDE.md

This is Roman Frolov's personal portfolio website.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `output: "export"` to static HTML)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **i18n**: next-intl, English and German, `localePrefix: "always"`
- **Content**: MDX via next-mdx-remote
- **Package Manager**: Bun
- **Icons**: Lucide React, Simple Icons

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Start dev server (http://localhost:3000)
bun run build      # Build and export to out/
bun run lint       # Run ESLint
bun run typecheck  # tsc --noEmit
```

There is no `bun run start` — the build is a static export.

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
├── data/          # Static data (projects/, experience/, education/, readings.ts)
├── hooks/         # Shared React hooks
├── i18n/          # Locale config and routing
├── lib/           # Content loading, SEO, OG image helpers
├── messages/      # UI translations (en.json, de.json)
└── types/         # Shared TypeScript types
```

## Static export constraints

`output: "export"` means no middleware, no API routes, no server-side runtime.
Anything that needs a request at runtime has to be done at build time or in the
browser. Client components must not read the clock or other impure sources
during render — compute in a server component and pass the value down.

## Code Conventions

- **Path aliases**: Use `@/*` for imports from `src/`
- **Class merging**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **Types**: Prefix type names with `T` (e.g., `TProject`, `TSkill`)
- **Components**: One component per file, use named exports with barrel files (`index.ts`)
- **Styling**: Tailwind CSS with CSS variables for theming (light + dark, driven by `next-themes`)
- **Font**: JetBrains Mono (monospace throughout)
- **Comments**: Only for complex logic, not obvious code
- **Clickable elements**: Always include `cursor-pointer` and `hover:opacity-*` transitions

## CSS Variables (globals.css)

- `--background`: Page background
- `--foreground`: Primary text color
- `--muted`: Muted background color
- `--muted-foreground`: Secondary text color

## Tactile Mode

The site has an opt-in "tactile mode" gated by a footer toggle and `Shift+T`. Off by default; persisted in `localStorage["rf-tactile"]`. See `docs/superpowers/specs/2026-04-10-tactile-mode-design.md` for the full design.

### Per-surface escape hatches (power-user)

Some interactive surfaces opt in via `useTactileSurface(surfaceId)`. To temporarily disable a single surface without disabling the whole mode:

- **Console:**
  ```js
  window.__rfTactile.disable("navbar");      // persistent in localStorage
  window.__rfTactile.enable("navbar");       // remove from disabled set
  window.__rfTactile.reset();                // clear all disabled surfaces
  ```
- **URL query param** (session-only, not persisted):
  ```
  ?tactile-off=navbar,link-button
  ```

### Surface IDs

- `navbar`
- `mobile-menu`
- `language-switcher`
- `view-toggle`
- `link-button`
- `icon-button`
- `command-palette`
- `project-filters`
- `blog-filters`
- `copy-button`
- `collapsible-code`
- `collapsible`
- `search-clear`
- `heading-link`
- `experience-toggle`
- `hamburger`
- `social-link`
- `animated-card`

The footer toggle button (`TactileModeToggle`) does not have a surface ID and cannot be disabled — it is the toggle itself.
