"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

import { useReducedMotion } from "@/hooks";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナ01</>={};".split("");

// The canvas cannot inherit a Tailwind class, so it reads the same tokens the
// stylesheet does and rebuilds its colors whenever the theme flips.
function token(name: string, alpha: number) {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return `hsl(${channels} / ${alpha})`;
}

type TDrop = {
  x: number;
  y: number;
  speed: number;
  char: string;
  length: number;
};

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: TDrop[] = [];

    function initDrops() {
      drops = Array.from({ length: columns }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: 0.3 + Math.random() * 0.7,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        length: 4 + Math.floor(Math.random() * 10),
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      columns = Math.floor(width / fontSize);
      initDrops();
    }

    resize();

    const fadeColor = token("--background", 0.08);
    const glyphColor = token("--muted-foreground", 0.35);

    function draw() {
      if (!ctx) return;
      // Fade existing content
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      drops.forEach((drop) => {
        // Randomly change the character occasionally
        if (Math.random() < 0.03) {
          drop.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        ctx.fillStyle = glyphColor;
        ctx.fillText(drop.char, drop.x, drop.y);

        drop.y += drop.speed * fontSize * 0.1;

        if (drop.y > height + drop.length * fontSize) {
          drop.y = -drop.length * fontSize;
          drop.x = Math.floor(Math.random() * columns) * fontSize;
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    let animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion, resolvedTheme]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-40"
    />
  );
}
