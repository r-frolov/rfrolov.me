"use client";

import { ReactNode, useRef } from "react";

import { m, useScroll, useTransform } from "framer-motion";

type TProps = {
  children: ReactNode;
};

export function ScrollTimeline({ children }: TProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Background track */}
      <div className="absolute left-[3px] top-0 bottom-0 w-px bg-border" />
      {/* Animated fill */}
      <m.div
        className="absolute left-[3px] top-0 w-px bg-foreground/40 origin-top"
        style={{ height }}
      />
      {children}
    </div>
  );
}
