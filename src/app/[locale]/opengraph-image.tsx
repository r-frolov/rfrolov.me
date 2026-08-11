import { ImageResponse } from "next/og";

import { locales } from "@/i18n/config";
import { OG_COLORS, OG_SIZE, ogBaseStyles, ogImageOptions, ogTagStyles } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "Roman Frolov - Frontend Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        ...ogBaseStyles,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            margin: 0,
          }}
        >
          Roman Frolov
        </h1>
        <p
          style={{
            fontSize: 36,
            color: OG_COLORS.muted,
            margin: 0,
          }}
        >
          Frontend Developer
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
            color: OG_COLORS.mutedForeground,
            fontSize: 24,
          }}
        >
          <span style={ogTagStyles}>React</span>
          <span style={ogTagStyles}>TypeScript</span>
          <span style={ogTagStyles}>Next.js</span>
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          color: OG_COLORS.mutedForeground,
        }}
      >
        rfrolov.me
      </p>
    </div>,
    ogImageOptions()
  );
}
