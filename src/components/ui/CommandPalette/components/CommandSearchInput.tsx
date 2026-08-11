"use client";

import { RefObject } from "react";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { ICON_SIZE, KBD_BASE } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

type TCommandSearchInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
};

export function CommandSearchInput({
  inputRef,
  query,
  onQueryChange,
  onClose,
}: TCommandSearchInputProps) {
  const t = useTranslations();
  const isTactile = useTactileSurface("command-palette");

  return (
    <div className="flex items-center gap-3 border-b border-border px-4">
      <Search className={cn(ICON_SIZE.sm, "text-muted-foreground")} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={t("commandPalette.placeholder")}
        aria-label={t("commandPalette.placeholder")}
        style={{ outline: "none", boxShadow: "none" }}
        className={cn(
          // 16px on mobile — see SearchInput.
          "flex-1 bg-transparent py-4 text-base sm:text-sm",
          "placeholder:text-muted-foreground",
          isTactile && "tactile-well"
        )}
      />
      {isTactile ? (
        <button
          onClick={onClose}
          aria-label={t("commandPalette.close")}
          className="hidden sm:inline-flex tactile-surface tactile-surface--ghost tactile-surface--xs"
        >
          <span>ESC</span>
        </button>
      ) : (
        <button
          onClick={onClose}
          aria-label={t("commandPalette.close")}
          className={cn(
            KBD_BASE,
            "hidden sm:inline-flex items-center gap-1 px-2 py-1",
            "text-xs text-muted-foreground",
            "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
          )}
        >
          ESC
        </button>
      )}
    </div>
  );
}
