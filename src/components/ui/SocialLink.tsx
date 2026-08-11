"use client";

import { m } from "framer-motion";

import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR, ICON_SIZE } from "@/constants";
import { useReducedMotion, useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";
import { TSocialLink } from "@/types";

type TSocialLinkProps = TSocialLink & {
  className?: string;
};

export function SocialLink({ name, href, icon: Icon, className }: TSocialLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const isTactile = useTactileSurface("social-link");

  if (isTactile) {
    return (
      <a
        href={href}
        {...EXTERNAL_LINK_PROPS}
        className={cn("tactile-surface tactile-surface--ghost tactile-surface--sm tactile-surface--square", className)}
        aria-label={name}
      >
        <span>
          <Icon className={ICON_SIZE.md} />
        </span>
      </a>
    );
  }

  return (
    <m.a
      href={href}
      {...EXTERNAL_LINK_PROPS}
      // -m-2/p-2 grows the 20px icon to a 36px target without shifting the row.
      className={cn(
        HOVER_TEXT_COLOR,
        "-m-2 inline-block p-2 transition-colors duration-300",
        className
      )}
      aria-label={name}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { rotate: [0, -8, 8, -6, 6, 0], transition: { duration: 0.5 } }
      }
    >
      <Icon className={ICON_SIZE.md} />
    </m.a>
  );
}
