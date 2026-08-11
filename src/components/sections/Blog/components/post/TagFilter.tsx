"use client";

import { ReactNode, useState } from "react";

import { useMediaQuery, useRowOverflow } from "@/hooks";
import { cn } from "@/lib/utils";

type TLabels = {
  all: string;
  showLess: string;
  showMoreAria: (count: number) => string;
  showLessAria: string;
};

type TProps = {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
  isTactile: boolean;
  labels: TLabels;
};

const tagChipClass = (active: boolean) =>
  cn(
    "shrink-0 whitespace-nowrap text-xs px-3 py-2 rounded-full cursor-pointer transition-[color,background-color,opacity,scale] duration-200 active:scale-[0.96]",
    active ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:opacity-70"
  );

// "+N" / "Show less" read as actions, so they get an outlined treatment that's
// visually distinct from the filled/muted tag chips. When `active`, the outline
// strengthens to signal a selected tag is hidden in the collapsed overflow.
const actionChipClass = (active: boolean) =>
  cn(
    "shrink-0 whitespace-nowrap text-xs px-3 py-2 rounded-full cursor-pointer transition-[color,border-color,scale] duration-200 active:scale-[0.96] border",
    active
      ? "border-foreground/50 text-foreground"
      : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground"
  );

type TChipProps = {
  children: ReactNode;
  tactile: boolean;
  action?: boolean;
  active?: boolean;
  onClick?: () => void;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
};

function Chip({
  children,
  tactile,
  action = false,
  active = false,
  onClick,
  ariaPressed,
  ariaExpanded,
  ariaLabel,
  tabIndex,
}: TChipProps) {
  const shared = {
    onClick,
    "aria-pressed": ariaPressed,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    tabIndex,
  };

  if (tactile) {
    return (
      <button {...shared} className="tactile-surface tactile-surface--ghost tactile-surface--sm shrink-0">
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button {...shared} className={action ? actionChipClass(active) : tagChipClass(active)}>
      {children}
    </button>
  );
}

export function TagFilter({ tags, selectedTags, onToggle, onClear, isTactile, labels }: TProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [expanded, setExpanded] = useState(false);

  const collapsible = isDesktop && !expanded;

  // Chips measured = "All" + every tag (stable order — no reshuffle on select).
  const { containerRef, measureRef, visibleCount } = useRowOverflow({
    itemCount: tags.length + 1,
    enabled: collapsible,
  });

  const visibleTagCount = collapsible ? Math.max(visibleCount - 1, 0) : tags.length;
  const hiddenCount = tags.length - visibleTagCount;
  const showOverflow = collapsible && hiddenCount > 0;
  // When collapsed, flag the "+N" chip if a selected tag is hidden in the overflow.
  const hasHiddenSelection =
    showOverflow && tags.slice(visibleTagCount).some((tag) => selectedTags.includes(tag));
  const isAllActive = selectedTags.length === 0;

  const allChip = (interactive: boolean) => (
    <Chip
      tactile={isTactile}
      active={isAllActive}
      ariaPressed={interactive ? isAllActive : undefined}
      onClick={interactive ? onClear : undefined}
      tabIndex={interactive ? undefined : -1}
    >
      {labels.all}
    </Chip>
  );

  const tagChip = (tag: string, interactive: boolean) => {
    const active = selectedTags.includes(tag);

    return (
      <Chip
        key={tag}
        tactile={isTactile}
        active={active}
        ariaPressed={interactive ? active : undefined}
        onClick={interactive ? () => onToggle(tag) : undefined}
        tabIndex={interactive ? undefined : -1}
      >
        {tag}
      </Chip>
    );
  };

  // Mobile: keep the edge-to-edge horizontal-scroll row, no overflow chip.
  if (!isDesktop) {
    return (
      <div
        className={cn(
          "-mx-6 flex items-center gap-2 overflow-x-auto px-6",
          "[&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        )}
      >
        {allChip(true)}
        {tags.map((tag) => tagChip(tag, true))}
      </div>
    );
  }

  // Desktop: single-line collapse with inline expand.
  const displayedTags = expanded ? tags : tags.slice(0, visibleTagCount);

  return (
    <div className="relative">
      {/* Off-screen mirror: all chips + a "+N" sample, used only for measurement. */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute -z-10 flex h-0 flex-nowrap items-center gap-2 overflow-hidden opacity-0"
      >
        {allChip(false)}
        {tags.map((tag) => tagChip(tag, false))}
        <Chip tactile={isTactile} action tabIndex={-1}>
          +{tags.length}
        </Chip>
      </div>

      <div ref={containerRef} className={cn("flex items-center gap-2", expanded && "flex-wrap")}>
        {allChip(true)}
        {displayedTags.map((tag) => tagChip(tag, true))}

        {showOverflow && (
          <Chip
            tactile={isTactile}
            action
            active={hasHiddenSelection}
            ariaExpanded={false}
            ariaLabel={labels.showMoreAria(hiddenCount)}
            onClick={() => setExpanded(true)}
          >
            +{hiddenCount}
          </Chip>
        )}

        {expanded && (
          <Chip
            tactile={isTactile}
            action
            ariaExpanded
            ariaLabel={labels.showLessAria}
            onClick={() => setExpanded(false)}
          >
            {labels.showLess}
          </Chip>
        )}
      </div>
    </div>
  );
}
