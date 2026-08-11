export const HOVER_OPACITY = "hover:opacity-70 transition-opacity cursor-pointer";

export const HOVER_TEXT_COLOR = "text-muted-foreground hover:text-foreground";

export const CARD_BASE =
  "rounded-lg border bg-background p-6 shadow-xs transition-[box-shadow,transform,border-color] duration-300";

export const CARD_HOVER = "hover:shadow-md hover:scale-[1.01]";

export const CARD_BORDER = {
  featured: "border-muted-foreground/40 hover:border-muted-foreground/60",
  default: "border-border hover:border-muted-foreground/30",
} as const;

export const ICON_SIZE = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export const TEXT_SIZE = {
  label: "text-xs",
  body: "text-sm",
  heading: "text-lg",
  title: "text-2xl",
} as const;

// Durations only. Always pair with a transition-property utility
// (`transition-colors`, `transition-[width]`, …) — on its own a duration leaves
// `transition-property` at its initial value of `all`.
export const TRANSITION = {
  fast: "duration-100",
  normal: "duration-200",
  slow: "duration-300",
} as const;

export const SPACING = {
  section: "py-12 lg:py-16",
  gap: {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  },
} as const;

export const ARROW_HOVER = {
  upRight:
    "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1",
  right:
    "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5",
} as const;

export const KBD_BASE = "rounded border border-border bg-muted/50";

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
