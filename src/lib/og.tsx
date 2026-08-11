import fs from "fs";
import path from "path";

import { ImageResponse } from "next/og";

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_COLORS = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a1a1aa",
  mutedForeground: "#71717a",
  card: "#27272a",
} as const;

export const OG_FONTS = {
  mono: "JetBrains Mono",
} as const;

const FONT_PATH = path.join(process.cwd(), "public/fonts/JetBrainsMono-Regular.ttf");

type TOgFont = {
  name: string;
  data: Buffer;
  weight: 400;
  style: "normal";
};

let cachedFonts: TOgFont[] | null = null;

// Satori falls back to its default sans unless the face is passed explicitly.
export function loadOgFonts(): TOgFont[] {
  if (!cachedFonts) {
    cachedFonts = [
      {
        name: OG_FONTS.mono,
        data: fs.readFileSync(FONT_PATH),
        weight: 400,
        style: "normal",
      },
    ];
  }

  return cachedFonts;
}

type TOgBaseStyles = {
  height: string;
  width: string;
  display: string;
  backgroundColor: string;
  color: string;
  fontFamily: string;
};

export const ogBaseStyles: TOgBaseStyles = {
  height: "100%",
  width: "100%",
  display: "flex",
  backgroundColor: OG_COLORS.background,
  color: OG_COLORS.foreground,
  fontFamily: OG_FONTS.mono,
};

export const ogContentStyles = {
  ...ogBaseStyles,
  flexDirection: "column" as const,
  justifyContent: "space-between" as const,
  padding: 60,
};

export const ogCenteredStyles = {
  ...ogBaseStyles,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

export const ogTagStyles = {
  backgroundColor: OG_COLORS.card,
  padding: "8px 16px",
  borderRadius: 8,
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - 3).trim() + "...";
}

export function ogImageOptions() {
  return { ...OG_SIZE, fonts: loadOgFonts() };
}

export function createNotFoundOgImage(message: string): ImageResponse {
  return new ImageResponse(
    <div style={ogCenteredStyles}>
      <span style={{ fontSize: 48 }}>{message}</span>
    </div>,
    ogImageOptions()
  );
}
