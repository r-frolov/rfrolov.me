"use client";

import Image from "next/image";

import { m } from "framer-motion";

import { useReducedMotion } from "@/hooks";

import { ANIMATION_CONFIG } from "../../constants";

export function FloatingImage() {
  const { floatingImage } = ANIMATION_CONFIG;
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      initial={false}
      animate={prefersReducedMotion ? {} : { y: floatingImage.y }}
      transition={
        prefersReducedMotion
          ? {}
          : {
              duration: floatingImage.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      className="absolute inset-8 sm:inset-10 lg:inset-12"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
        <Image
          src="/images/hero.webp"
          alt="Roman Frolov"
          fill
          priority
          sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 192px"
          className="object-cover"
        />
      </div>
    </m.div>
  );
}
