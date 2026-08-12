"use client";

import { ReactNode, useRef } from "react";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useHydrated, useReducedMotion } from "@/hooks";

type TTiltCardProps = {
  children: ReactNode;
  maxTilt?: number;
  featured?: boolean;
  className?: string;
};

export function TiltCard({ children, maxTilt = 8, className }: TTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]);

  // Dynamic shadow offset — shifts opposite to the tilt so the card feels lifted
  const shadowX = useTransform(mouseX, [0, 1], [12, -12]);
  const shadowY = useTransform(mouseY, [0, 1], [12, -12]);

  const springConfig = { stiffness: 200, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShadowX = useSpring(shadowX, springConfig);
  const smoothShadowY = useSpring(shadowY, springConfig);

  const shadowStrength = useSpring(0, springConfig);

  const boxShadow = useTransform(
    [smoothShadowX, smoothShadowY, shadowStrength],
    ([x, y, strength]: number[]) =>
      `${x}px ${y}px 32px hsl(var(--lift) / calc(var(--lift-cast) * ${strength})), 0 1px 2px hsl(var(--lift) / calc(var(--lift-contact) * ${strength}))`
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
    shadowStrength.set(1);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    shadowStrength.set(0);
  }

  // Pre-hydration + reduced-motion both bypass the m.div wrapper so
  // the initial HTML exactly matches SSR (no empty inline style).
  if (prefersReducedMotion || !hydrated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        boxShadow,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        borderRadius: "var(--radius-lg, 0.5rem)",
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
