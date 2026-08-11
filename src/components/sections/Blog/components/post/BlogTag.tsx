"use client";

import { Tag } from "@/components/ui/Tag";
import { HOVER_OPACITY } from "@/constants";
import { Link } from "@/i18n/routing";
import { getTagUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

type TProps = {
  tag: string;
  size?: "sm" | "md";
  insideCard?: boolean;
};

export function BlogTag({ tag, size = "md", insideCard = false }: TProps) {
  if (insideCard) {
    return (
      <Link
        href={getTagUrl(tag) as "/blog"}
        onClick={(e) => e.stopPropagation()}
        className={cn("relative z-10", HOVER_OPACITY)}
      >
        <Tag size={size}>{tag}</Tag>
      </Link>
    );
  }

  return (
    <Link href={getTagUrl(tag) as "/blog"} className={HOVER_OPACITY}>
      <Tag size={size}>{tag}</Tag>
    </Link>
  );
}
