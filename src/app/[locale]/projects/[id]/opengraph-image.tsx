import { ImageResponse } from "next/og";

import { isLocale, locales } from "@/i18n/config";
import {
  createNotFoundOgImage,
  OG_COLORS,
  OG_SIZE,
  ogContentStyles,
  ogImageOptions,
  ogTagStyles,
  truncateText,
} from "@/lib/og";
import { getAllProjectsWithContent, getProjectById } from "@/lib/projects";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProjectsWithContent(locale).map((project) => ({
      locale,
      id: project.id,
    }))
  );
}

export const alt = "Project";
export const size = OG_SIZE;
export const contentType = "image/png";

type TProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function Image({ params }: TProps) {
  const { id, locale } = await params;

  if (!isLocale(locale)) {
    return createNotFoundOgImage("Invalid locale");
  }

  const project = getProjectById(id, locale);

  if (!project) {
    return createNotFoundOgImage("Project not found");
  }

  return new ImageResponse(
    <div style={ogContentStyles}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            color: OG_COLORS.muted,
            fontSize: 24,
          }}
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} style={ogTagStyles}>
              {tech}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.2,
            marginTop: 24,
          }}
        >
          {truncateText(project.title, 90)}
        </h1>
        <p
          style={{
            fontSize: 24,
            color: OG_COLORS.muted,
            marginTop: 16,
            lineHeight: 1.4,
          }}
        >
          {truncateText(project.longDescription || project.description, 140)}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: OG_COLORS.mutedForeground,
          fontSize: 24,
        }}
      >
        <span>rfrolov.me</span>
        <span>{project.year}</span>
      </div>
    </div>,
    ogImageOptions()
  );
}
