"use client";

import { useRef } from "react";

import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { ICON_SIZE, ICON_SWAP, ICON_SWAP_TRANSITION } from "@/constants";
import { useHydrated, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import { IconButton } from "./IconButton";

type TDocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("theme");
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!hydrated) {
    return (
      <IconButton aria-label={t("toggleTheme")} disabled>
        <div className={ICON_SIZE.sm} />
      </IconButton>
    );
  }

  const isDark = resolvedTheme === "dark";

  function handleToggle() {
    const nextTheme = isDark ? "light" : "dark";
    const doc = document as TDocumentWithViewTransitions;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);

      return;
    }

    const button = buttonRef.current;
    const rect = button?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <IconButton
      ref={buttonRef}
      onClick={handleToggle}
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
    >
      <span className={cn("relative block", ICON_SIZE.sm)}>
        <AnimatePresence initial={false}>
          <m.span
            key={isDark ? "dark" : "light"}
            className="absolute inset-0"
            {...ICON_SWAP}
            transition={prefersReducedMotion ? { duration: 0 } : ICON_SWAP_TRANSITION}
          >
            {isDark ? <Sun className={ICON_SIZE.sm} /> : <Moon className={ICON_SIZE.sm} />}
          </m.span>
        </AnimatePresence>
      </span>
    </IconButton>
  );
}
