"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";

import { KBD_BASE } from "@/constants";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type TShortcut = {
  keys: string[];
  label: string;
  scope?: string;
};

function useShortcuts(): TShortcut[] {
  const t = useTranslations("shortcuts");

  return [
    { keys: ["?"], label: t("showShortcuts"), scope: "global" },
    { keys: ["⌘", "K"], label: t("openCommandPalette"), scope: "global" },
    { keys: ["Esc"], label: t("closeDialog"), scope: "global" },
    { keys: ["⇧", "T"], label: t("toggleTactile"), scope: "global" },
    { keys: ["/"], label: t("focusSearch"), scope: "blog" },
    { keys: ["J"], label: t("nextItem"), scope: "experience" },
    { keys: ["K"], label: t("previousItem"), scope: "experience" },
  ];
}

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("shortcuts");
  const shortcuts = useShortcuts();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (event.key === "?" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setIsOpen((prev) => !prev);

        return;
      }

      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const groupedShortcuts = shortcuts.reduce<Record<string, TShortcut[]>>((acc, shortcut) => {
    const scope = shortcut.scope ?? "global";
    if (!acc[scope]) acc[scope] = [];
    acc[scope].push(shortcut);

    return acc;
  }, {});

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 350, damping: 28, mass: 0.6 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            initial={{ opacity: 0, scale: 0.92, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={transition}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-md -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-sm font-medium">{t("title")}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t("close")}
                  className={cn(
                    KBD_BASE,
                    "px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                  )}
                >
                  Esc
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
                {Object.entries(groupedShortcuts).map(([scope, items]) => (
                  <div key={scope}>
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t(`scope.${scope}`)}
                    </p>
                    <ul className="space-y-1.5">
                      {items.map((shortcut) => (
                        <li
                          key={shortcut.label}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="text-sm text-foreground">{shortcut.label}</span>
                          <span className="flex items-center gap-1">
                            {shortcut.keys.map((key) => (
                              <kbd
                                key={key}
                                className={cn(
                                  KBD_BASE,
                                  "inline-flex min-w-[24px] items-center justify-center px-1.5 py-0.5 text-[11px] text-muted-foreground"
                                )}
                              >
                                {key}
                              </kbd>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
