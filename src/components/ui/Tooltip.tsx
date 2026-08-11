import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TTooltipProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Minimal CSS-only tooltip. Hover-only by design — no click-to-pin state,
 * no focus persistence, no JS. The trigger keeps the inline text cursor so
 * the word reads as regular prose; a dotted underline signals "there's
 * more here." The label is an absolutely-positioned sibling revealed via
 * `group-hover`.
 *
 * Usage: <Tooltip label="Full name">Short name</Tooltip>
 */
export function Tooltip({ label, children, className }: TTooltipProps) {
  return (
    <span className={cn("group relative inline", className)}>
      <span className="border-b border-dotted border-muted-foreground/60">{children}</span>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 -translate-x-1/2 whitespace-nowrap",
          "rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground shadow-md",
          "opacity-0 transition-opacity duration-150",
          "group-hover:opacity-100"
        )}
      >
        {label}
      </span>
    </span>
  );
}
