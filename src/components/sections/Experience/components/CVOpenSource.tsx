import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR } from "@/constants";
import { openSourceProjects } from "@/data/open-source";
import { cn } from "@/lib/utils";

type TProps = {
  id?: string;
};

export function CVOpenSource({ id }: TProps) {
  const t = useTranslations("experiencePage.openSource");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />
          <div className="space-y-6">
            {openSourceProjects.map((project) => (
              <div key={project.id} className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <p className="text-xs text-muted-foreground/60">{project.tech}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-0.5">
                  {project.url !== project.repoUrl && (
                    <a
                      href={project.url}
                      {...EXTERNAL_LINK_PROPS}
                      className={cn("transition-colors duration-300", HOVER_TEXT_COLOR)}
                      aria-label={`${project.name} live site`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    {...EXTERNAL_LINK_PROPS}
                    className={cn("transition-colors duration-300", HOVER_TEXT_COLOR)}
                    aria-label={`${project.name} repository`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
