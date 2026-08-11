"use client";

import { Grid, List } from "lucide-react";
import { useTranslations } from "next-intl";

import { HOVER_TEXT_COLOR, ICON_SIZE } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

type TViewMode = "grid" | "list";

type TViewToggleProps = {
  view: TViewMode;
  onViewChange: (view: TViewMode) => void;
};

export function ViewToggle({ view, onViewChange }: TViewToggleProps) {
  const t = useTranslations("common");
  const isTactile = useTactileSurface("view-toggle");

  if (isTactile) {
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          className="tactile-surface tactile-surface--ghost tactile-surface--sm tactile-surface--square"
          aria-label={t("gridView")}
          aria-pressed={view === "grid"}
        >
          <span><Grid className={ICON_SIZE.sm} /></span>
        </button>
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className="tactile-surface tactile-surface--ghost tactile-surface--sm tactile-surface--square"
          aria-label={t("listView")}
          aria-pressed={view === "list"}
        >
          <span><List className={ICON_SIZE.sm} /></span>
        </button>
      </div>
    );
  }

  // Legacy branch — current code, untouched.
  const getButtonClassName = (isActive: boolean) =>
    cn(
      "p-2.5 rounded transition-all cursor-pointer",
      isActive ? "bg-background text-foreground shadow-sm" : HOVER_TEXT_COLOR
    );

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
      <button
        onClick={() => onViewChange("grid")}
        className={getButtonClassName(view === "grid")}
        aria-label={t("gridView")}
        aria-pressed={view === "grid"}
      >
        <Grid className={ICON_SIZE.sm} />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={getButtonClassName(view === "list")}
        aria-label={t("listView")}
        aria-pressed={view === "list"}
      >
        <List className={ICON_SIZE.sm} />
      </button>
    </div>
  );
}

export type { TViewMode };
