import { useCallback, useEffect, useState } from "react";

type TOptions = {
  itemCount: number;
  sectionId: string;
};

export function useKeyboardNavigation({ itemCount, sectionId }: TOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const scrollToItem = useCallback(
    (index: number) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const items = section.querySelectorAll("[data-experience-card]");
      const target = items[index];

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        setActiveIndex(index);
      }
    },
    [sectionId]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;

      if (e.key === "j") {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, itemCount - 1);
        scrollToItem(next);
      } else if (e.key === "k") {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        scrollToItem(prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, itemCount, scrollToItem]);

  return { activeIndex };
}
