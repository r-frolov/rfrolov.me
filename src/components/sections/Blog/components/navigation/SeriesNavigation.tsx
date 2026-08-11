"use client";

import { ChevronLeft, ChevronRight, List } from "lucide-react";

import { ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { TSeriesInfo } from "@/lib/blog";
import { cn } from "@/lib/utils";

type TSeriesNavigationProps = {
  series: TSeriesInfo;
};

export function SeriesNavigation({ series }: TSeriesNavigationProps) {
  const { name, posts, currentIndex } = series;
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="my-8 rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <List className={cn(ICON_SIZE.sm, "text-muted-foreground")} aria-hidden="true" />
        <span className="text-sm font-medium">
          Part {currentIndex + 1} of {posts.length} in series
        </span>
        <span className="text-sm text-muted-foreground">&quot;{name}&quot;</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}` as "/blog"}
            className={cn(
              "flex-1 flex items-center gap-2 p-3 rounded-md",
              "bg-background hover:bg-muted/50 transition-colors cursor-pointer",
              "border border-transparent hover:border-border"
            )}
          >
            <ChevronLeft className={cn(ICON_SIZE.sm, "text-muted-foreground shrink-0")} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Previous</p>
              <p className="text-sm font-medium truncate">{prevPost.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}` as "/blog"}
            className={cn(
              "flex-1 flex items-center gap-2 p-3 rounded-md text-right",
              "bg-background hover:bg-muted/50 transition-colors cursor-pointer",
              "border border-transparent hover:border-border"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Next</p>
              <p className="text-sm font-medium truncate">{nextPost.title}</p>
            </div>
            <ChevronRight className={cn(ICON_SIZE.sm, "text-muted-foreground shrink-0")} />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <details className="mt-3">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          View all posts in this series
        </summary>
        <ol className="mt-2 space-y-1">
          {posts.map((post, index) => (
            <li key={post.slug}>
              {index === currentIndex ? (
                <span className="text-sm font-medium">
                  {index + 1}. {post.title}
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}` as "/blog"}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {index + 1}. {post.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
