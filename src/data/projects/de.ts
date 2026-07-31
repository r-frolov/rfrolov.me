import { TProject } from "@/types";

export const projects: TProject[] = [
  {
    id: "portfolio",
    title: "Persönliches Portfolio",
    description:
      "Modernes Entwickler-Portfolio erstellt mit Next.js 15 und Tailwind CSS v4. Mit flüssigen Animationen, Dark Mode und einer kreativen 404-Seite mit Terminal-Emulation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: 2025,
    category: "personal",
    highlight: "Du siehst es gerade",
    github: "https://github.com/r-frolov/rfrolov.me",
    featured: true,
  },
  {
    id: "purpose-green",
    title: "Purpose Green",
    description:
      "Green+ Portal für nachhaltige Immobilienentwicklung. Digitale Energieanalyse, ESG-Beratung und Portfolio-Management-Plattform, die Immobilieneigentümern hilft, den Energiebedarf um bis zu 80% zu senken.",
    technologies: ["React", "TypeScript", "MUI", "Redux Toolkit"],
    year: 2025,
    category: "work",
    highlight: "Führender 360°-Anbieter für nachhaltige Immobilien in Deutschland",
    href: "https://www.purpose-green.com/en",
    featured: true,
  },
];
