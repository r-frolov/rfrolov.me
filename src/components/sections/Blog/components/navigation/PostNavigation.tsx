"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

type TProps = {
  previous: TBlogPostMeta | null;
  next: TBlogPostMeta | null;
};

type TNavLinkProps = {
  post: TBlogPostMeta;
  direction: "previous" | "next";
  label: string;
};

function NavLink({ post, direction, label }: TNavLinkProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/blog/${post.slug}` as "/blog"}
      className={cn(
        "group flex flex-col gap-2 p-4 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors cursor-pointer",
        isPrevious ? "items-start" : "items-end"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1 text-xs text-muted-foreground",
          !isPrevious && "flex-row-reverse"
        )}
      >
        {isPrevious ? (
          <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
        ) : (
          <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
        )}
        {label}
      </span>
      <span
        className={cn(
          "text-sm font-medium text-foreground group-hover:opacity-70 transition-opacity line-clamp-2",
          !isPrevious && "text-right"
        )}
      >
        {post.title}
      </span>
    </Link>
  );
}

export function PostNavigation({ previous, next }: TProps) {
  const t = useTranslations("blog.navigation");

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-12 pt-8 border-t border-border">
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {previous && <NavLink post={previous} direction="previous" label={t("previous")} />}
        {next && <NavLink post={next} direction="next" label={t("next")} />}
      </div>
    </nav>
  );
}
