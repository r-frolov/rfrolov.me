"use client";

import { memo, useCallback, useState } from "react";

import { AnimatePresence, m } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/ui";
import { ICON_SWAP, ICON_SWAP_TRANSITION } from "@/constants";
import { useHydrated, useReducedMotion, useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

type TCopyButtonProps = {
  text: string;
};

const COPIED_STATE_MS = 1500;

export const CopyButton = memo(function CopyButton({ text }: TCopyButtonProps) {
  const { showToast } = useToast();
  const t = useTranslations("copy");
  const isTactile = useTactileSurface("copy-button");
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(t("copied"));
      setTimeout(() => setCopied(false), COPIED_STATE_MS);
    } catch {
      showToast(t("copyFailed"));
    }
  }, [text, showToast, t]);

  const glyph = copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />;

  const icon = hydrated ? (
    <span className="relative block h-4 w-4">
      <AnimatePresence initial={false}>
        <m.span
          key={copied ? "copied" : "idle"}
          className="absolute inset-0"
          {...ICON_SWAP}
          transition={prefersReducedMotion ? { duration: 0 } : ICON_SWAP_TRANSITION}
        >
          {glyph}
        </m.span>
      </AnimatePresence>
    </span>
  ) : (
    glyph
  );

  return (
    <button
      onClick={handleCopy}
      className={
        isTactile
          ? "tactile-surface tactile-surface--ghost tactile-surface--xs tactile-surface--square"
          : cn(
              "p-1 rounded transition-colors duration-200 cursor-pointer",
              copied ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground"
            )
      }
      aria-label={copied ? t("copied") : t("copyCode")}
    >
      {isTactile ? <span>{icon}</span> : icon}
    </button>
  );
});
