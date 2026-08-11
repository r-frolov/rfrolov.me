"use client";

import { memo } from "react";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

import { AnimatedCard } from "@/components/ui";
import { ARROW_HOVER, ICON_SIZE } from "@/constants";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "./BlogTags";
import { ReadingTime } from "./ReadingTime";

type TBlogPostCardProps = {
  post: TBlogPostMeta;
  index: number;
  /**
   * 3 on the home page, where the grid sits under the "Latest posts" h2.
   * 2 on /blog, where the page h1 is the only heading above it.
   */
  headingLevel?: 2 | 3;
};

export const BlogPostCard = memo(function BlogPostCard({
  post,
  index,
  headingLevel = 3,
}: TBlogPostCardProps) {
  const Heading = `h${headingLevel}` as const;
  const locale = useLocale();
  const formattedDate = formatDate(post.date, { locale });

  return (
    <AnimatedCard
      index={index}
      href={`/blog/${post.slug}`}
      internal
      featured={post.featured}
      linkLabel={post.title}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formattedDate}</span>
              <span>·</span>
              <ReadingTime minutes={post.readingTime} showLabel />
            </div>
            <Heading
              className="font-medium text-balance"
              style={{ viewTransitionName: `blog-title-${post.slug}` }}
            >
              {post.title}
            </Heading>
          </div>
          <ArrowRight
            className={cn(ICON_SIZE.sm, "shrink-0 text-muted-foreground", ARROW_HOVER.right)}
          />
        </div>

        <p className="text-sm text-muted-foreground text-pretty line-clamp-2 mt-3 grow">{post.description}</p>

        <div className="mt-4">
          <BlogTags tags={post.tags} limit={3} wrap insideCard />
        </div>
      </div>
    </AnimatedCard>
  );
});
