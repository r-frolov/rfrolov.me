import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR } from "@/constants";
import { talks } from "@/data/talks";
import { cn } from "@/lib/utils";

type TProps = {
  id?: string;
};

export function CVTalks({ id }: TProps) {
  const t = useTranslations("experiencePage.talks");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />
          <div className="space-y-6">
            {talks.map((talk) => (
              <div key={talk.id} className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-medium">{talk.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{talk.description}</p>
                  <p className="text-xs text-muted-foreground/60">
                    {talk.event} · {talk.date} · {talk.location}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-0.5">
                  <a
                    href={talk.url}
                    {...EXTERNAL_LINK_PROPS}
                    className={cn("transition-colors duration-300", HOVER_TEXT_COLOR)}
                    aria-label={`${talk.title} session page`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
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
