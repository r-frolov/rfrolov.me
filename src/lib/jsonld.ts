import { SITE_NAME, SITE_ROLE, SITE_URL } from "@/constants";
import { TBlogPostMeta, TBook, TProjectDetailMeta } from "@/types";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: SITE_ROLE,
    sameAs: [
      "https://github.com/r-frolov",
      "https://www.linkedin.com/in/r-frolov",
    ],
  };
}

export function generateBlogPostSchema(post: TBlogPostMeta, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    // Approximate word count based on reading time (200 words per minute)
    wordCount: post.readingTime * 200,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };
}

export function generateExperiencePageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: SITE_ROLE,
      hasOccupation: {
        "@type": "Occupation",
        name: SITE_ROLE,
        occupationLocation: {
          "@type": "City",
          name: "Berlin",
        },
        skills: "React, TypeScript, Next.js, Tailwind CSS, Node.js",
      },
    },
    url: `${SITE_URL}/${locale}/experience`,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}

export function generateProjectJsonLd(project: TProjectDetailMeta, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    dateCreated: `${project.year}-01-01`,
    url: project.href || `${SITE_URL}/${locale}/projects/${project.id}`,
    ...(project.github && { codeRepository: project.github }),
    keywords: project.technologies.join(", "),
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}

type TBreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Emit a BreadcrumbList so search engines can render rich breadcrumb
 * trails in SERPs instead of the raw URL path.
 */
export function generateBreadcrumbSchema(items: TBreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBookReviewSchema(book: TBook, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Book",
      name: book.title,
      author: {
        "@type": "Person",
        name: book.author,
      },
    },
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/${locale}/readings/${book.slug}`,
    inLanguage: "en-US",
  };
}
