import { TProject } from "@/types";

export const projects: TProject[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "Modern developer portfolio built with Next.js 15 and Tailwind CSS v4. Features smooth animations, dark mode, and a creative 404 page with terminal emulation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: 2025,
    category: "personal",
    highlight: "You're looking at it",
    github: "https://github.com/r-frolov/rfrolov.me",
    featured: true,
  },
  {
    id: "purpose-green",
    title: "Purpose Green",
    description:
      "Green+ portal for sustainable real estate development. Digital energy analysis, ESG consulting, and portfolio management platform helping property owners reduce energy demand by up to 80%.",
    technologies: ["React", "TypeScript", "MUI", "Redux Toolkit"],
    year: 2025,
    category: "work",
    highlight: "Leading 360° provider for sustainable real estate in Germany",
    href: "https://www.purpose-green.com/en",
    featured: true,
  },
];
