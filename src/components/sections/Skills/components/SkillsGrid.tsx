"use client";

import { TechIcon } from "@/components/ui";

import { SKILLS } from "../constants";

export function SkillsGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
      {SKILLS.map((skill) => (
        <div
          key={skill.name}
          className="group flex items-center gap-1.5 text-muted-foreground transition-colors duration-200 cursor-default"
          style={{ "--skill-color": skill.color } as React.CSSProperties}
        >
          <TechIcon
            slug={skill.icon}
            className="h-3.5 w-3.5 [color:var(--skill-color)] opacity-60 group-hover:opacity-100 transition-opacity duration-200"
          />
          <span className="text-xs transition-colors duration-200 group-hover:text-foreground">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}
