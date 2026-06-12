"use client";

import { ArrowRight, ArrowUpRight, GithubIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  AnimatedCard,
  AnimatedSection,
  CategoryWithYear,
  Container,
  ProjectHighlight,
  SectionHeader,
  TechTags,
} from "@/components/ui";
import { ARROW_HOVER, ICON_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TProject } from "@/types";

type TProps = {
  projects: TProject[];
  projectsWithDetails?: string[];
};

export function FeaturedProjects({ projects, projectsWithDetails = [] }: TProps) {
  const t = useTranslations("projects");
  const detailIds = new Set(projectsWithDetails);

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader
            title={t("featuredTitle")}
            link={{ href: "/projects", label: t("viewAll") }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => {
              const hasDetail = detailIds.has(project.id);
              const href = hasDetail
                ? `/projects/${project.id}`
                : project.href || project.github;

              return (
                <AnimatedCard
                  key={project.id}
                  index={index}
                  href={href}
                  internal={hasDetail}
                  linkLabel={project.title}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <CategoryWithYear
                          category={project.category}
                          year={project.year}
                          size="sm"
                        />
                        <h3 className="font-medium text-sm">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!hasDetail && project.github && (
                          <GithubIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                        {hasDetail ? (
                          <ArrowRight
                            className={cn(ICON_SIZE.sm, "text-muted-foreground", ARROW_HOVER.right)}
                          />
                        ) : (
                          <ArrowUpRight
                            className={cn(
                              ICON_SIZE.sm,
                              "text-muted-foreground",
                              ARROW_HOVER.upRight
                            )}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2">
                      {project.description}
                    </p>
                    {project.highlight && <ProjectHighlight highlight={project.highlight} />}
                    <TechTags
                      technologies={project.technologies}
                      limit={3}
                      size="sm"
                      className="pt-1"
                    />
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
