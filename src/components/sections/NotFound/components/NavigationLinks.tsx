"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

const ROUTES = [
  { path: "/", labelKey: "goHome" },
  { path: "/projects", labelKey: "viewWork" },
] as const;

export function NavigationLinks() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-3">
      {ROUTES.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-border hover:bg-muted/50 hover:border-foreground/20 transition-colors"
        >
          <span className="text-green-500">→</span>
          <span>cd {route.path}</span>
          <span className="text-muted-foreground">({t(route.labelKey)})</span>
        </Link>
      ))}
    </div>
  );
}
