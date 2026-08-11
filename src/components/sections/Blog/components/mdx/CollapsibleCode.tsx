"use client";

import { ReactNode, useId, useMemo, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { useTactileSurface } from "@/hooks";
import { getTextContent } from "@/lib/extract-text";
import { cn } from "@/lib/utils";

import { CopyButton } from "./CopyButton";

type TCollapsibleCodeProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleCode({ title, children, defaultOpen = false }: TCollapsibleCodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const codeContent = useMemo(() => getTextContent(children), [children]);
  const contentId = useId();
  const isTactile = useTactileSurface("collapsible-code");

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          "bg-muted/50 transition-colors",
          !isOpen && "rounded-b-lg"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={
            isTactile
              ? "tactile-surface tactile-surface--ghost tactile-surface--xs"
              : "flex items-center gap-2 text-left text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
          }
        >
          {isTactile ? (
            <span className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {title}
            </span>
          ) : (
            <>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{title}</span>
            </>
          )}
        </button>
        <CopyButton text={codeContent} />
      </div>
      <div
        id={contentId}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="collapsible-code-content [&_.code-block-header]:hidden [&>div]:my-0 [&>div]:rounded-none [&>div]:border-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
