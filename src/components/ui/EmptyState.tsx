"use client";

import { FileX, Search } from "lucide-react";

import { TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";

type TEmptyStateProps = {
  title: string;
  description?: string;
  variant?: "search" | "filter";
  className?: string;
  /** Label and handler for the way out — a filter empty state needs one. */
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function EmptyState({
  title,
  description,
  variant = "filter",
  className,
  action,
}: TEmptyStateProps) {
  const Icon = variant === "search" ? Search : FileX;

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className={cn(TEXT_SIZE.heading, "font-medium")}>{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 cursor-pointer rounded-md border border-muted-foreground/30 px-3 py-1.5 text-sm text-foreground transition-opacity hover:opacity-70"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
