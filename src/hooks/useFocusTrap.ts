"use client";

import { RefObject, useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusable(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

/**
 * Keeps Tab inside an `aria-modal` container and returns focus to whatever was
 * focused before it opened. Without the trap, focus walks into page content
 * that `aria-modal="true"` hides from assistive technology, so a keyboard user
 * lands on controls a screen reader claims do not exist.
 */
export function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const container = containerRef.current;

      if (!container) return;

      const focusable = getFocusable(container);

      if (focusable.length === 0) {
        e.preventDefault();

        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      // Focus outside the container (or on the container itself) means the
      // browser is about to walk into the page behind — pull it back in.
      if (!activeEl || !container.contains(activeEl)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();

        return;
      }

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);

      const toRestore = previouslyFocused.current;

      if (toRestore?.isConnected) {
        toRestore.focus();
      }
    };
  }, [active, containerRef]);
}
