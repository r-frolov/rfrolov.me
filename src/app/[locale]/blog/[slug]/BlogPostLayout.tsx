"use client";

import { ReactNode } from "react";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import {
  BlogTag,
  MobileTOC,
  PostNavigation,
  ReadingTime,
  RelatedPosts,
  SeriesNavigation,
  TableOfContents,
} from "@/components/sections/Blog";
import { Breadcrumbs, Container, TBreadcrumb } from "@/components/ui";
import { ANIMATION_DURATION } from "@/constants";
import { TAdjacentPosts, TSeriesInfo } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { TBlogPostMeta, THeading } from "@/types";

type TBlogPostLayoutProps = {
  post: TBlogPostMeta;
  headings: THeading[];
  adjacentPosts: TAdjacentPosts;
  relatedPosts: TBlogPostMeta[];
  seriesInfo: TSeriesInfo | null;
  children: ReactNode;
};

export function BlogPostLayout({
  post,
  headings,
  adjacentPosts,
  relatedPosts,
  seriesInfo,
  children,
}: TBlogPostLayoutProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const formattedDate = formatDate(post.date, { month: "long", locale });

  const breadcrumbs: TBreadcrumb[] = [
    { label: t("home"), href: "/" },
    { label: t("blog"), href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <section className="py-12 lg:py-16">
        <Container>
          <div className="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 xl:grid-cols-[1fr_250px]">
            <m.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION_DURATION.slower }}
              className="mx-auto max-w-2xl lg:mx-0"
            >
              <Breadcrumbs items={breadcrumbs} />

              <header className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>·</span>
                  <ReadingTime minutes={post.readingTime} showLabel />
                </div>

                <h1
                  className="text-3xl font-semibold tracking-tight text-balance"
                  style={{ viewTransitionName: `blog-title-${post.slug}` }}
                >
                  {post.title}
                </h1>

                <p className="text-lg text-muted-foreground text-pretty">{post.description}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <BlogTag key={tag} tag={tag} />
                  ))}
                </div>
              </header>

              {seriesInfo && <SeriesNavigation series={seriesInfo} />}

              <hr className="border-border mb-8" />

              <div className="prose-custom">{children}</div>

              <PostNavigation previous={adjacentPosts.previous} next={adjacentPosts.next} />

              <RelatedPosts posts={relatedPosts} />
            </m.article>

            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>

      <MobileTOC headings={headings} />
    </>
  );
}
