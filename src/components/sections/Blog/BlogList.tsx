"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container } from "@/components/ui";
import { HOVER_OPACITY, SPACING, TEXT_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogPostCard } from "./components";

type TProps = {
  posts: TBlogPostMeta[];
};

export function BlogList({ posts }: TProps) {
  const t = useTranslations("blog");

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={SPACING.section}>
      <Container>
        <AnimatedSection className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={cn(TEXT_SIZE.heading, "font-semibold tracking-tight")}>{t("latestPosts")}</h2>
            <Link
              href="/blog"
              className={cn("-my-1.5 inline-block py-1.5 text-sm text-muted-foreground", HOVER_OPACITY)}
            >
              {t("viewAll")}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
