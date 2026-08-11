"use client";

import { useTranslations } from "next-intl";

import { useReadingProgress } from "@/hooks";
import { cn } from "@/lib/utils";
import { THeading } from "@/types";

import { useHeadingObserver } from "./hooks";

type TTableOfContentsProps = {
  headings: THeading[];
};

export function TableOfContents({ headings }: TTableOfContentsProps) {
  const t = useTranslations("blog");
  const progress = useReadingProgress();
  const { activeId, scrollToHeading } = useHeadingObserver({ headings });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToHeading(id);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("onThisPage")}
        </p>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>

      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="border-l border-border">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block -ml-px border-l-2 py-1.5 text-sm transition-[color,border-color] duration-150 cursor-pointer rounded-r-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  level === 2 ? "pl-4 pr-2" : "pl-7 pr-2",
                  isActive
                    ? "border-foreground text-foreground font-medium bg-muted/50"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-muted/30"
                )}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
