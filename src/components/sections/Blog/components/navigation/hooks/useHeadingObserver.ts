"use client";

import { useEffect, useState } from "react";

import { TOC_OBSERVER_MARGIN } from "@/components/sections/Blog/constants";
import { useReducedMotion } from "@/hooks";
import { THeading } from "@/types";


const HEADER_OFFSET = 96;

type TUseHeadingObserverOptions = {
  headings: THeading[];
};

type TUseHeadingObserverReturn = {
  activeId: string;
  scrollToHeading: (id: string, closeCallback?: () => void) => void;
};

export function useHeadingObserver({
  headings,
}: TUseHeadingObserverOptions): TUseHeadingObserverReturn {
  const [activeId, setActiveId] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: TOC_OBSERVER_MARGIN }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string, closeCallback?: () => void) => {
    closeCallback?.();
    const element = document.getElementById(id);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      history.pushState(null, "", `#${id}`);
    }
  };

  return { activeId, scrollToHeading };
}
