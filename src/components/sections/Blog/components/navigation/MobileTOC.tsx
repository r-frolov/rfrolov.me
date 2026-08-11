"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, m } from "framer-motion";
import { List, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { THeading } from "@/types";

import { useHeadingObserver } from "./hooks";

type TMobileTOCProps = {
  headings: THeading[];
};

// Hide the floating button once the reader is this many pixels from the
// bottom of the document — beyond that point they're past the prose and
// into Related Posts / footer, where the TOC adds nothing.
const HIDE_NEAR_BOTTOM_PX = 900;

export function MobileTOC({ headings }: TMobileTOCProps) {
  const t = useTranslations("blog");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { activeId, scrollToHeading } = useHeadingObserver({ headings });

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const remaining = doc.scrollHeight - window.scrollY - window.innerHeight;
      // Show only once the reader has scrolled past the article header,
      // and hide again near the bottom.
      setIsVisible(window.scrollY > 200 && remaining > HIDE_NEAR_BOTTOM_PX);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    scrollToHeading(id, () => setIsOpen(false));
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <m.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "fixed bottom-6 right-6 z-40 lg:hidden",
              "flex h-10 w-10 items-center justify-center",
              "rounded-full border border-border bg-background shadow-lg",
              "cursor-pointer transition-colors hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            )}
            aria-label={t("openTableOfContents")}
          >
            <List className="h-5 w-5" />
          </m.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <m.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
              className={cn(
                "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
                "max-h-[70vh] overflow-y-auto",
                "rounded-t-2xl border-t border-border bg-background p-6 shadow-lg"
              )}
              aria-label="Table of contents"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {t("onThisPage")}
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  aria-label={t("closeTableOfContents")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="space-y-1">
                {headings.map(({ id, text, level }) => {
                  const isActive = activeId === id;

                  return (
                    <li key={id}>
                      <button
                        onClick={() => handleLinkClick(id)}
                        className={cn(
                          "block w-full text-left py-2 text-sm transition-colors cursor-pointer",
                          level === 2 ? "pl-0" : "pl-4",
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
