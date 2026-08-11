"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

import { HOVER_TEXT_COLOR, PRESS_SCALE } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  active?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  ({ children, className, active, ...props }, ref) => {
    const isTactile = useTactileSurface("icon-button");

    if (isTactile) {
      return (
        <button
          ref={ref}
          aria-pressed={active}
          className={cn(
            "tactile-surface tactile-surface--ghost tactile-surface--md tactile-surface--square",
            className
          )}
          {...props}
        >
          <span>{children}</span>
        </button>
      );
    }

    // Legacy branch — untouched.
    return (
      <button
        ref={ref}
        className={cn(
          "p-2 rounded-md transition-[color,background-color,scale] duration-200 cursor-pointer",
          PRESS_SCALE,
          active ? "text-foreground bg-muted/50" : HOVER_TEXT_COLOR,
          !active && "hover:bg-muted/50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
