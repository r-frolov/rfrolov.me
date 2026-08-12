"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { SPACING } from "@/constants";
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
          <SectionHeader title={t("latestPosts")} link={{ href: "/blog", label: t("viewAll") }} />

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
