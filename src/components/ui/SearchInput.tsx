"use client";

import { useEffect, useRef, useState } from "react";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { useTactileSurface } from "@/hooks";
import { useDebounce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type TSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  debounceMs = 300,
}: TSearchInputProps) {
  const t = useTranslations("common");
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTactile = useTactileSurface("search-clear");

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useDebounce(onChange, debounceMs);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        const isInputOrTextarea =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (!isInputOrTextarea) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder ?? t("searchPlaceholder")}
        className={cn(
          // 16px on mobile: iOS Safari zooms the page when a focused input is
          // smaller, and there is no gesture that undoes that zoom.
          "w-full rounded-lg border border-border-strong bg-background py-2 pl-10 pr-10",
          "text-base sm:text-sm",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background",
          "transition-shadow",
          isTactile && "tactile-well"
        )}
      />
      {localValue ? (
        <button
          onClick={handleClear}
          className={
            isTactile
              ? "absolute right-3 top-1/2 -translate-y-1/2 tactile-surface tactile-surface--ghost tactile-surface--xs tactile-surface--square"
              : "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
          }
          aria-label={t("clearSearch")}
        >
          {isTactile ? (
            <span>
              <X className="h-4 w-4" />
            </span>
          ) : (
            <X className="h-4 w-4" />
          )}
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none rounded border border-border bg-muted px-1.5 text-xs text-muted-foreground sm:block">
          /
        </kbd>
      )}
    </div>
  );
}
