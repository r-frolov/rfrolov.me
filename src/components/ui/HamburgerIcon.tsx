"use client";

import { m } from "framer-motion";

import { ANIMATION_DURATION } from "@/constants";

type THamburgerIconProps = {
  isOpen: boolean;
};

export function HamburgerIcon({ isOpen }: THamburgerIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-foreground"
    >
      {/* Top line - moves down and rotates to form \ */}
      <m.line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        strokeWidth={2}
        strokeLinecap="round"
        initial={false}
        animate={{
          y1: isOpen ? 12 : 6,
          y2: isOpen ? 12 : 6,
          rotate: isOpen ? 45 : 0,
        }}
        transition={{ duration: ANIMATION_DURATION.fast }}
        style={{ transformOrigin: "center" }}
      />
      {/* Middle line - fades out */}
      <m.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        strokeWidth={2}
        strokeLinecap="round"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: ANIMATION_DURATION.fast }}
      />
      {/* Bottom line - moves up and rotates to form / */}
      <m.line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        strokeWidth={2}
        strokeLinecap="round"
        initial={false}
        animate={{
          y1: isOpen ? 12 : 18,
          y2: isOpen ? 12 : 18,
          rotate: isOpen ? -45 : 0,
        }}
        transition={{ duration: ANIMATION_DURATION.fast }}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}
