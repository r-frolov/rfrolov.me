// src/components/sections/Experience/hooks/useScrollSpy.ts
"use client";

import { useEffect, useState } from "react";

type TScrollSpyResult = {
  activeId: string;
  scrollProgress: number;
  hasScrolled: boolean;
};

export function useScrollSpy(sectionIds: string[]): TScrollSpyResult {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const lastId = sectionIds[sectionIds.length - 1];

    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

      setScrollProgress(progress);
      setHasScrolled(scrollY > 50);

      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;

      if (atBottom && lastId) {
        setActiveId(lastId);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return { activeId, scrollProgress, hasScrolled };
}
