"use client";

import { ReactNode } from "react";

import { PRESS_SCALE } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

import { ExternalLink } from "./ExternalLink";

type TLinkButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: ReactNode;
  className?: string;
};

export function LinkButton({ href, variant = "solid", children, className }: TLinkButtonProps) {
  const isTactile = useTactileSurface("link-button");

  if (isTactile) {
    const variantClass =
      variant === "solid" ? "tactile-surface--primary" : "tactile-surface--outline";

    return (
      <ExternalLink
        href={href}
        className={cn("tactile-surface tactile-surface--md", variantClass, className)}
      >
        <span>{children}</span>
      </ExternalLink>
    );
  }

  // Legacy branch — untouched.
  return (
    <ExternalLink
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md hover:opacity-80 transition-[opacity,scale] duration-200 cursor-pointer",
        PRESS_SCALE,
        variant === "solid"
          ? "bg-foreground text-background"
          : "border border-muted-foreground/30 text-foreground",
        className
      )}
    >
      {children}
    </ExternalLink>
  );
}
