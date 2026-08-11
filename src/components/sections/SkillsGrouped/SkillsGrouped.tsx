"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";

import { SKILL_CATEGORIES } from "./constants";
import { SkillCategoryCard } from "./SkillCategoryCard";

type TProps = {
  id?: string;
};

export function SkillsGrouped({ id }: TProps) {
  const t = useTranslations("experiencePage");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-8">
          <SectionHeader title={t("skills.title")} />

          {SKILL_CATEGORIES.map((category) => (
            <SkillCategoryCard
              key={category.key}
              category={category}
              label={t(`skills.${category.key}`)}
            />
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
