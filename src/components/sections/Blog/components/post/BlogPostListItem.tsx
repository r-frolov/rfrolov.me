"use client";

import { memo } from "react";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

import { ANIMATION_DURATION, ARROW_HOVER, getStaggeredAnimation, ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "./BlogTags";
import { ReadingTime } from "./ReadingTime";

type TBlogPostListItemProps = {
  post: TBlogPostMeta;
  index: number;
};

export const BlogPostListItem = memo(function BlogPostListItem({ post, index }: TBlogPostListItemProps) {
  const locale = useLocale();
  const formattedDate = formatDate(post.date, { locale });

  return (
    <m.div
      {...getStaggeredAnimation(index, { y: 10, delayMultiplier: 0.05, duration: ANIMATION_DURATION.normal })}
    >
      <Link
        href={`/blog/${post.slug}` as "/blog"}
        className={cn(
          "group flex items-center justify-between gap-4 py-4 border-b border-muted transition-colors",
          "hover:bg-muted/30 -mx-4 px-4 cursor-pointer"
        )}
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-medium truncate group-hover:text-foreground/80 transition-colors">
              {post.title}
            </h3>
            <BlogTags tags={post.tags} limit={2} size="sm" insideCard />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{post.description}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <ReadingTime minutes={post.readingTime} />
          </div>
          <ArrowRight className={cn(ICON_SIZE.sm, "text-muted-foreground", ARROW_HOVER.right)} />
        </div>
      </Link>
    </m.div>
  );
});
