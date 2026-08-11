"use client";

import { m } from "framer-motion";

import { TechIcon } from "@/components/ui";
import { TSkillCategory } from "@/types";

import { SKILLS_GROUPED_ANIMATION } from "./constants";

type TProps = {
  category: TSkillCategory;
  label: string;
};

export function SkillCategoryCard({ category, label }: TProps) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
        {label}
      </h3>
      <m.div
        variants={SKILLS_GROUPED_ANIMATION.container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-3"
      >
        {category.skills.map((skill) => (
          <m.div
            key={skill.name}
            variants={SKILLS_GROUPED_ANIMATION.item}
            className="group flex items-center gap-1.5 text-muted-foreground transition-colors duration-200 cursor-default"
            style={{ "--skill-color": skill.color } as React.CSSProperties}
          >
            <TechIcon
              slug={skill.icon}
              className="h-3.5 w-3.5 [color:var(--skill-color)] opacity-60 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="text-xs transition-colors duration-200 group-hover:[color:var(--skill-color)]">
              {skill.name}
            </span>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}
