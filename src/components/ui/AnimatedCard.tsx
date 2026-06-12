"use client";

import { ComponentProps, ReactNode } from "react";

import { m } from "framer-motion";

import {
  CARD_BASE,
  CARD_BORDER,
  CARD_HOVER,
  EXTERNAL_LINK_PROPS,
  getStaggeredAnimation,
} from "@/constants";
import { useHydrated, useReducedMotion, useTactileSurface } from "@/hooks";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { ShineCard } from "./ShineCard";
import { TiltCard } from "./TiltCard";

type TLinkHref = ComponentProps<typeof Link>["href"];

type TAnimatedCardProps = {
  children: ReactNode;
  index: number;
  className?: string;
  href?: string;
  featured?: boolean;
  large?: boolean;
  internal?: boolean;
  linkLabel?: string;
};

export function AnimatedCard({
  children,
  index,
  className,
  href,
  featured = false,
  large = false,
  internal = false,
  linkLabel,
}: TAnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const isTactile = useTactileSurface("animated-card");

  const baseClasses = cn(
    "group block h-full",
    CARD_BASE,
    CARD_HOVER,
    large && "md:col-span-2",
    featured ? CARD_BORDER.featured : CARD_BORDER.default,
    className
  );

  const outerClasses = cn("h-full", large && "md:col-span-2");

  // Until the client has hydrated, render plain HTML that matches the SSR
  // output byte-for-byte — m.* components emit an inline `style={}`
  // on the client that server omits, which React treats as a hydration
  // mismatch and tears the tree down. Once `useHydrated()` flips true we
  // re-render with m.* and Framer Motion plays the entrance animation.
  const animation = prefersReducedMotion ? {} : getStaggeredAnimation(index);

  if (isTactile) {
    const tactileBaseClasses = cn(
      "group block h-full",
      "tactile-card",
      "rounded-lg border bg-background p-6",
      large && "md:col-span-2",
      featured ? "border-foreground/20" : "border-muted",
      className
    );

    if (href && internal) {
      // Overlay link instead of wrapping children — cards may contain their own
      // links (e.g. blog tags), and nested <a> elements are invalid HTML that
      // break hydration. Rendered after children so it paints above
      // stacking-context content (e.g. viewTransitionName titles); inner links
      // opt out of the overlay via `relative z-10`.
      const overlay = (
        <Link
          href={href as TLinkHref}
          aria-label={linkLabel}
          className="absolute inset-0"
        />
      );

      return (
        <div className={outerClasses}>
          {hydrated && !prefersReducedMotion ? (
            <m.div {...animation} className={cn(tactileBaseClasses, "relative cursor-pointer")}>
              {children}
              {overlay}
            </m.div>
          ) : (
            <div className={cn(tactileBaseClasses, "relative cursor-pointer")}>
              {children}
              {overlay}
            </div>
          )}
        </div>
      );
    }

    if (href) {
      return (
        <div className={outerClasses}>
          {hydrated && !prefersReducedMotion ? (
            <m.a
              href={href}
              {...EXTERNAL_LINK_PROPS}
              {...animation}
              className={cn(tactileBaseClasses, "cursor-pointer")}
            >
              {children}
            </m.a>
          ) : (
            <a
              href={href}
              {...EXTERNAL_LINK_PROPS}
              className={cn(tactileBaseClasses, "cursor-pointer")}
            >
              {children}
            </a>
          )}
        </div>
      );
    }

    return (
      <div className={outerClasses}>
        {hydrated && !prefersReducedMotion ? (
          <m.div {...animation} className={tactileBaseClasses}>
            {children}
          </m.div>
        ) : (
          <div className={tactileBaseClasses}>{children}</div>
        )}
      </div>
    );
  }

  const inner = (() => {
    if (href && internal) {
      // Overlay link instead of wrapping children — see the tactile branch above.
      const overlay = (
        <Link
          href={href as TLinkHref}
          aria-label={linkLabel}
          className="absolute inset-0"
        />
      );

      return hydrated && !prefersReducedMotion ? (
        <m.div {...animation} className={cn(baseClasses, "relative cursor-pointer")}>
          {children}
          {overlay}
        </m.div>
      ) : (
        <div className={cn(baseClasses, "relative cursor-pointer")}>
          {children}
          {overlay}
        </div>
      );
    }

    if (href) {
      return hydrated && !prefersReducedMotion ? (
        <m.a
          href={href}
          {...EXTERNAL_LINK_PROPS}
          {...animation}
          className={cn(baseClasses, "cursor-pointer")}
        >
          {children}
        </m.a>
      ) : (
        <a href={href} {...EXTERNAL_LINK_PROPS} className={cn(baseClasses, "cursor-pointer")}>
          {children}
        </a>
      );
    }

    return hydrated && !prefersReducedMotion ? (
      <m.div {...animation} className={baseClasses}>
        {children}
      </m.div>
    ) : (
      <div className={baseClasses}>{children}</div>
    );
  })();

  return (
    <TiltCard className={outerClasses} featured={featured}>
      <ShineCard className="h-full">{inner}</ShineCard>
    </TiltCard>
  );
}
