"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, CountUp, SectionHeader } from "@/components/ui";
import { TExperience } from "@/types";

import { ExperienceCard, ScrollTimeline } from "./components";
import { EXPERIENCE_ANIMATION } from "./constants";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

type TProps = {
  experiences: TExperience[];
  careerYears: number;
  id?: string;
};

export function Experience({ experiences, careerYears, id }: TProps) {
  const t = useTranslations("experience");

  useKeyboardNavigation({
    itemCount: experiences.length,
    sectionId: "experience",
  });

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <div className="space-y-2">
            <SectionHeader title={t("title")} />
            <p className="text-xs text-muted-foreground">
              {t.rich("careerSummary", {
                years: () => <CountUp value={careerYears} />,
                roles: () => <CountUp value={experiences.length} />,
              })}
            </p>
          </div>

          <ScrollTimeline>
            <m.div variants={EXPERIENCE_ANIMATION.container} initial="hidden" animate="show">
              {experiences.map((exp, index) => (
                <div key={exp.id}>
                  {exp.transition && (
                    <div className="relative pl-6 pb-4">
                      <p className="text-xs italic text-muted-foreground/60 pl-2 border-l border-muted-foreground/20">
                        {exp.transition}
                      </p>
                    </div>
                  )}
                  <ExperienceCard
                    experience={exp}
                    isLast={index === experiences.length - 1}
                  />
                </div>
              ))}
            </m.div>
          </ScrollTimeline>
        </AnimatedSection>
      </Container>
    </section>
  );
}
