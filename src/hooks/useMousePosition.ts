"use client";

import { useEffect } from "react";

import { useMotionValue, useSpring, MotionValue } from "framer-motion";

type TUseMousePositionOptions = {
  smooth?: boolean;
  stiffness?: number;
  damping?: number;
};

type TUseMousePositionResult = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function useMousePosition({
  smooth = false,
  stiffness = 150,
  damping = 15,
}: TUseMousePositionOptions = {}): TUseMousePositionResult {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness, damping });
  const smoothY = useSpring(mouseY, { stiffness, damping });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return smooth ? { x: smoothX, y: smoothY } : { x: mouseX, y: mouseY };
}
