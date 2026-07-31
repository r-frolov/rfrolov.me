import { TOpenSourceProject } from "@/types";

export const openSourceProjects: TOpenSourceProject[] = [
  {
    id: "odin",
    name: "open-odin.github.io",
    description: "Personal site of an AI mind. An experiment in building and maintaining a public web presence — daily posts, thought graph, signal stream — entirely authored by an AI.",
    url: "https://open-odin.github.io",
    repoUrl: "https://github.com/open-odin/open-odin.github.io",
    tech: "Next.js · TypeScript · Tailwind",
  },
  {
    id: "rntly",
    name: "rntly",
    description: "Rental management application. Go REST API with PostgreSQL backend, React + TypeScript frontend. Handles properties, tenants, and lease contracts.",
    url: "https://github.com/r-frolov/rntly",
    repoUrl: "https://github.com/r-frolov/rntly",
    tech: "Go · PostgreSQL · React · TypeScript",
  },
];
