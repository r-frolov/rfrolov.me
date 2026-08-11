"use client";

import { useEffect, useRef } from "react";

import { m, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks";

import { FloatingImage } from "./FloatingImage";
import { MorphingBlob } from "./MorphingBlob";

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handleMouseMove(event: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (event.clientX - centerX) / window.innerWidth;
      const distanceY = (event.clientY - centerY) / window.innerHeight;
      x.set(distanceX * 20);
      y.set(distanceY * 20);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, x, y]);

  return (
    <div ref={containerRef} className="relative shrink-0 mx-auto lg:mx-0">
      <m.div
        style={prefersReducedMotion ? undefined : { x: smoothX, y: smoothY }}
        className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
      >
        <MorphingBlob />
        <FloatingImage />
      </m.div>
    </div>
  );
}
