"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { SPRING_TRANSITION } from "@/constants";
import { useReducedMotion, useTactile } from "@/hooks";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const t = useTranslations("common");
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { tactile } = useTactile();

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 150, damping: 20 });
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = useTransform(smoothProgress, (p) => circumference * (1 - p));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;

      progress.set(Math.min(ratio, 1));
      setIsVisible(scrollTop > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [progress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={prefersReducedMotion || tactile ? undefined : { scale: 1.1 }}
          whileTap={prefersReducedMotion || tactile ? undefined : { scale: 0.9 }}
          transition={prefersReducedMotion ? { duration: 0 } : SPRING_TRANSITION}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-40 group",
            "flex h-11 w-11 items-center justify-center",
            "rounded-full border border-border bg-background/90 backdrop-blur shadow-lg",
            "cursor-pointer transition-colors hover:bg-muted"
          )}
          aria-label={t("scrollToTop")}
        >
          {/* Progress ring */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 44 44"
          >
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />
            <m.circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>
          <ArrowUp className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
