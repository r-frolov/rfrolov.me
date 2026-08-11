"use client";

import { m } from "framer-motion";

import { useReducedMotion } from "@/hooks";

import { ANIMATION_CONFIG } from "../../constants";

export function MorphingBlob() {
  const prefersReducedMotion = useReducedMotion();
  const { morphingBlob } = ANIMATION_CONFIG;

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-4 bg-linear-to-br from-border via-muted to-border opacity-60"
        style={{ borderRadius: morphingBlob.borderRadius[0] }}
      />
    );
  }

  return (
    <m.div
      animate={{
        borderRadius: morphingBlob.borderRadius,
        rotate: morphingBlob.rotate,
      }}
      transition={{
        duration: morphingBlob.duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      className="absolute inset-4 bg-linear-to-br from-border via-muted to-border opacity-60"
    />
  );
}
