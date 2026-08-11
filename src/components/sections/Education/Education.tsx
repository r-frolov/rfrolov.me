"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { TEducation } from "@/types";

import { EDUCATION_ANIMATION } from "./constants";
import { EducationCard } from "./EducationCard";

type TProps = {
  education: TEducation[];
  id?: string;
};

export function Education({ education, id }: TProps) {
  const t = useTranslations("experiencePage");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("education.title")} />

          <m.div variants={EDUCATION_ANIMATION.container} initial="hidden" animate="show">
            {education.map((edu, index) => (
              <EducationCard
                key={edu.id}
                education={edu}
                isLast={index === education.length - 1}
              />
            ))}
          </m.div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
