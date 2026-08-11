"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz0123456789";

type TTextScrambleProps = {
  text: string;
  duration?: number;
  className?: string;
};

export function TextScramble({ text, duration = 800, className }: TTextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);

      return;
    }

    let frame = 0;
    const totalFrames = Math.floor(duration / 16);
    const resolveAt = new Array(text.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * totalFrames));

    const intervalId = window.setInterval(() => {
      frame += 1;
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (frame >= resolveAt[index]) return char;

          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setDisplayText(next);

      if (frame >= totalFrames) {
        window.clearInterval(intervalId);
        setDisplayText(text);
      }
    }, 16);

    return () => window.clearInterval(intervalId);
  }, [text, duration, prefersReducedMotion]);

  return <span className={className}>{displayText}</span>;
}
