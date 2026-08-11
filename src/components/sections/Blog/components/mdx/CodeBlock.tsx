"use client";

import { ReactNode } from "react";

import { getTextContent } from "@/lib/extract-text";
import { cn } from "@/lib/utils";

import { CopyButton } from "./CopyButton";

type TCodeBlockProps = {
  children: ReactNode;
  className?: string;
};

export function CodeBlock({ children, className }: TCodeBlockProps) {
  const codeContent = getTextContent(children);

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div className="code-block-header flex items-center justify-end px-4 py-2 bg-muted/50 border-b border-border">
        <CopyButton text={codeContent} />
      </div>
      <div className="overflow-x-auto">
        <pre className={cn("p-4 text-sm min-w-max", className)}>{children}</pre>
      </div>
    </div>
  );
}
