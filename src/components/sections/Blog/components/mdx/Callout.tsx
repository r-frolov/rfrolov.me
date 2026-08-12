import { ReactNode } from "react";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type TCalloutVariant = "note" | "tip" | "warning";

type TProps = {
  variant?: TCalloutVariant;
  title?: string;
  children: ReactNode;
};

/* Each variant carries one hue per theme, used for the bar, the icon and the
   title alike. The dark theme needs a lighter step than the light theme needs
   a darker one, so the pairs are not mirror images. */
const variantConfig = {
  note: {
    icon: Info,
    surfaceClass: "bg-blue-500/10",
    accentClass: "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400",
    defaultTitle: "Note",
    role: "note" as const,
  },
  tip: {
    icon: Lightbulb,
    surfaceClass: "bg-green-500/10",
    accentClass: "border-green-700 text-green-700 dark:border-green-400 dark:text-green-400",
    defaultTitle: "Tip",
    role: "note" as const,
  },
  warning: {
    icon: AlertTriangle,
    surfaceClass: "bg-amber-500/10",
    accentClass: "border-amber-700 text-amber-700 dark:border-amber-400 dark:text-amber-400",
    defaultTitle: "Warning",
    role: "alert" as const,
  },
};

export function Callout({ variant = "note", title, children }: TProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role={config.role}
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        config.surfaceClass,
        config.accentClass
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-5" />
        <span className="font-semibold">{title || config.defaultTitle}</span>
      </div>
      <div className="text-muted-foreground text-sm [&>p]:mb-0">{children}</div>
    </div>
  );
}
