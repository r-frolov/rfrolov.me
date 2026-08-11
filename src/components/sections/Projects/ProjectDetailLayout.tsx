"use client";

import { ReactNode } from "react";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import { TableOfContents } from "@/components/sections/Blog";
import { Breadcrumbs, Container, TBreadcrumb } from "@/components/ui";
import { ANIMATION_DURATION } from "@/constants";
import { THeading, TProject, TProjectDetailMeta } from "@/types";

import { ProjectHero } from "./ProjectHero";
import { ProjectMeta } from "./ProjectMeta";
import { RelatedProjects } from "./RelatedProjects";

type TProps = {
  project: TProjectDetailMeta;
  relatedProjects: TProject[];
  headings: THeading[];
  children: ReactNode;
};

export function ProjectDetailLayout({ project, relatedProjects, headings, children }: TProps) {
  const t = useTranslations("nav");

  const breadcrumbs: TBreadcrumb[] = [
    { label: t("home"), href: "/" },
    { label: t("projects"), href: "/projects" },
    { label: project.title },
  ];

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 xl:grid-cols-[1fr_250px]">
          <m.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.slower }}
            className="max-w-2xl space-y-8"
          >
            <ProjectHero project={project} />

            <hr className="border-border" />

            {children}

            <RelatedProjects projects={relatedProjects} />
          </m.article>

          <aside className="hidden lg:block">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: ANIMATION_DURATION.slower, delay: 0.2 }}
              className="sticky top-24 space-y-8"
            >
              <ProjectMeta project={project} />
              {headings.length > 0 && <TableOfContents headings={headings} />}
            </m.div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
