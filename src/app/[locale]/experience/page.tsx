import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { CVAbout, CVHeader, CVLanguages, CVOpenSource, CVTalks, ScrollDots } from "@/components/sections/Experience/components";
import { SkillsGrouped } from "@/components/sections/SkillsGrouped";
import { JsonLd } from "@/components/seo";
import { getCareerYears, SITE_URL } from "@/constants";
import { getEducation } from "@/data/education";
import { getExperiences } from "@/data/experience";
import { isLocale, locales } from "@/i18n/config";
import { generateExperiencePageSchema } from "@/lib";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("experienceTitle"),
    description: t("experienceDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/experience`,
      languages: {
        en: `${SITE_URL}/en/experience`,
        de: `${SITE_URL}/de/experience`,
      },
    },
  };
}

export default async function ExperiencePage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);
  const experiences = getExperiences(locale);
  const education = getEducation(locale);
  const t = await getTranslations({ locale, namespace: "experiencePage" });

  const navItems = [
    { id: "about", label: t("about.title") },
    { id: "skills", label: t("skills.title") },
    { id: "experience", label: t("experience.title") },
    { id: "education", label: t("education.title") },
    { id: "open-source", label: t("openSource.title") },
    { id: "talks", label: t("talks.title") },
    { id: "languages", label: t("languages.title") },
  ];

  return (
    <main className="pt-16">
      <JsonLd data={generateExperiencePageSchema(locale)} />
      <CVHeader />
      <ScrollDots items={navItems} />
      <CVAbout id="about" />
      <SkillsGrouped id="skills" />
      <Experience experiences={experiences} careerYears={getCareerYears()} id="experience" />
      <Education education={education} id="education" />
      <CVOpenSource id="open-source" />
      <CVTalks id="talks" />
      <CVLanguages id="languages" />
      <div className="pb-12 lg:pb-16" />
    </main>
  );
}
