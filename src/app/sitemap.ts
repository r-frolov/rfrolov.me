import { MetadataRoute } from "next";

import { SITE_URL, STATIC_ROUTES } from "@/constants";
import { defaultLocale, locales, TLocale } from "@/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { getAllProjectsWithContent } from "@/lib/projects";
import { getBooks } from "@/lib/readings";

export const dynamic = "force-static";

// Build the { en: url, de: url, x-default: url } map for a localized path so
// the sitemap can declare hreflang alternates — Google needs these to
// understand that /en/blog/foo and /de/blog/foo are the same page in different
// languages. Only locales that actually have the page are listed: several blog
// posts are English-only, and pointing hreflang at a URL that 404s is worse
// than declaring no alternate at all.
function languageAlternates(
  path: string,
  availableLocales: readonly TLocale[] = locales
): Record<string, string> {
  if (availableLocales.length === 0) {
    return {};
  }

  const alternates = Object.fromEntries(
    availableLocales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );

  const fallback = availableLocales.includes(defaultLocale)
    ? defaultLocale
    : availableLocales[0];

  return { ...alternates, "x-default": `${SITE_URL}/${fallback}${path}` };
}

function newest(dates: Date[], fallback: Date): Date {
  const valid = dates.filter((date) => !Number.isNaN(date.getTime()));

  if (valid.length === 0) {
    return fallback;
  }

  return new Date(Math.max(...valid.map((date) => date.getTime())));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postsByLocale = new Map(locales.map((locale) => [locale, getAllPosts(locale)]));
  const projectsByLocale = new Map(
    locales.map((locale) => [locale, getAllProjectsWithContent(locale)])
  );
  const books = getBooks();

  // lastModified is derived from the content each page renders rather than a
  // hand-maintained constant, which had gone stale by over a year.
  const postDates = locales.flatMap((locale) =>
    (postsByLocale.get(locale) ?? []).map((post) => new Date(post.date))
  );
  const projectDates = locales.flatMap((locale) =>
    (projectsByLocale.get(locale) ?? []).map((project) => new Date(`${project.year}-12-31`))
  );
  const bookDates = books.map((book) => new Date(book.dateRead));

  const buildDate = new Date();
  const newestPost = newest(postDates, buildDate);
  const newestProject = newest(projectDates, buildDate);
  const newestBook = newest(bookDates, buildDate);
  const newestOverall = newest([newestPost, newestProject, newestBook], buildDate);

  const staticRouteDates: Record<(typeof STATIC_ROUTES)[number], Date> = {
    "": newestOverall,
    "/experience": newestOverall,
    "/blog": newestPost,
    "/projects": newestProject,
    "/readings": newestBook,
  };

  const staticUrls = locales.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: staticRouteDates[route],
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: { languages: languageAlternates(route) },
    }))
  );

  const localesWithPost = (slug: string) =>
    locales.filter((locale) =>
      (postsByLocale.get(locale) ?? []).some((post) => post.slug === slug)
    );

  const blogUrls = locales.flatMap((locale) =>
    (postsByLocale.get(locale) ?? []).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: languageAlternates(`/blog/${post.slug}`, localesWithPost(post.slug)),
      },
    }))
  );

  // Tag pages are generated per locale from that locale's posts, so a tag can
  // exist in English and not in German.
  const tagsByLocale = new Map(
    locales.map((locale) => {
      const tags = new Map<string, Date>();

      for (const post of postsByLocale.get(locale) ?? []) {
        for (const tag of post.tags) {
          const slug = tag.toLowerCase();
          const date = new Date(post.date);
          const known = tags.get(slug);

          if (!known || date > known) {
            tags.set(slug, date);
          }
        }
      }

      return [locale, tags] as const;
    })
  );

  const tagIndexUrls = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/blog/tags`,
    lastModified: newestPost,
    changeFrequency: "monthly" as const,
    priority: 0.4,
    alternates: { languages: languageAlternates("/blog/tags") },
  }));

  const tagUrls = locales.flatMap((locale) =>
    Array.from(tagsByLocale.get(locale) ?? []).map(([tag, lastModified]) => ({
      url: `${SITE_URL}/${locale}/blog/tags/${tag}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.4,
      alternates: {
        languages: languageAlternates(
          `/blog/tags/${tag}`,
          locales.filter((other) => tagsByLocale.get(other)?.has(tag))
        ),
      },
    }))
  );

  const localesWithProject = (id: string) =>
    locales.filter((locale) =>
      (projectsByLocale.get(locale) ?? []).some((project) => project.id === id)
    );

  const projectUrls = locales.flatMap((locale) =>
    (projectsByLocale.get(locale) ?? []).map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      lastModified: new Date(`${project.year}-12-31`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: languageAlternates(`/projects/${project.id}`, localesWithProject(project.id)),
      },
    }))
  );

  // Every book gets a page, including the one currently being read — the
  // sitemap used to list only finished ones, leaving live pages undeclared.
  const readingUrls = locales.flatMap((locale) =>
    books.map((book) => ({
      url: `${SITE_URL}/${locale}/readings/${book.slug}`,
      lastModified: newest([new Date(book.dateRead)], newestBook),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: languageAlternates(`/readings/${book.slug}`) },
    }))
  );

  return [
    ...staticUrls,
    ...blogUrls,
    ...tagIndexUrls,
    ...tagUrls,
    ...projectUrls,
    ...readingUrls,
  ];
}
