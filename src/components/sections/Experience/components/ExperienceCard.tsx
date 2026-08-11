"use client";

import { useState } from "react";

import Image from "next/image";

import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { TechTags } from "@/components/ui";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";
import { TExperience } from "@/types";

import { EXPERIENCE_ANIMATION } from "../constants";
import { LiveIndicator } from "./LiveIndicator";

type TExperienceCardProps = {
  experience: TExperience;
  isLast?: boolean;
};

export function ExperienceCard({ experience, isLast }: TExperienceCardProps) {
  const isCurrentPosition = experience.isCurrent ?? false;
  const hasHighlights = experience.highlights && experience.highlights.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const isTactile = useTactileSurface("experience-toggle");
  const t = useTranslations("experience");
  const toggleLabel = isExpanded ? t("showLess") : t("highlights");

  return (
    <m.div
      variants={EXPERIENCE_ANIMATION.item}
      data-experience-card
      className={cn("relative pl-6", isLast ? "pb-0" : "pb-8")}
    >
      <LiveIndicator isLive={isCurrentPosition} />

      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-medium text-sm">{experience.position}</h3>
          <span className="text-xs text-muted-foreground">
            {experience.startDate} — {experience.endDate}
          </span>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          {experience.logo && (
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={16}
              height={16}
              className="rounded-sm"
            />
          )}
          {experience.company} · {experience.location}
        </p>

        <p className="text-xs text-muted-foreground pt-1">{experience.description}</p>

        {experience.metrics && experience.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {experience.metrics.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center rounded-full border border-muted-foreground/20 bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        <TechTags technologies={experience.technologies} limit={4} size="sm" className="pt-2" />

        {hasHighlights && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              className={
                isTactile
                  ? "tactile-surface tactile-surface--ghost tactile-surface--xs mt-2"
                  : "flex items-center gap-1 pt-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              }
            >
              {isTactile ? (
                <span className="flex items-center gap-1">
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                  {toggleLabel}
                </span>
              ) : (
                <>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                  <span>{toggleLabel}</span>
                </>
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <m.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden space-y-1 pt-1"
                >
                  {experience.highlights!.map((highlight, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </m.ul>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </m.div>
  );
}
