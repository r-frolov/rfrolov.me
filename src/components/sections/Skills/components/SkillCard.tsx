"use client";

import { m } from "framer-motion";

import { TechIcon } from "@/components/ui";
import { TSkill } from "@/types";

import { SKILLS_ANIMATION } from "../constants";

type TSkillCardProps = {
  skill: TSkill;
};

export function SkillCard({ skill }: TSkillCardProps) {
  return (
    <m.div
      variants={SKILLS_ANIMATION.item}
      className="flex flex-col items-center gap-1.5 p-2 rounded-md
                 hover:bg-muted/50 transition-colors duration-300
                 group cursor-default"
    >
      <TechIcon
        slug={skill.icon}
        className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors"
      />
      <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {skill.name}
      </span>
    </m.div>
  );
}
