"use client";

import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { TEducation } from "@/types";

import { EDUCATION_ANIMATION } from "./constants";

type TProps = {
  education: TEducation;
  isLast?: boolean;
};

export function EducationCard({ education, isLast }: TProps) {
  return (
    <m.div
      variants={EDUCATION_ANIMATION.item}
      className={cn("relative pl-6", isLast ? "pb-0" : "pb-8")}
    >
      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
      {!isLast && <div className="absolute left-[3px] top-4 bottom-0 w-px bg-border" />}

      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-medium text-sm">
            {education.degree} · {education.field}
          </h3>
          <span className="text-xs text-muted-foreground">
            {education.startDate} — {education.endDate}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {education.institution} · {education.location}
        </p>

        {education.description && (
          <p className="text-xs text-muted-foreground pt-1">{education.description}</p>
        )}
      </div>
    </m.div>
  );
}
