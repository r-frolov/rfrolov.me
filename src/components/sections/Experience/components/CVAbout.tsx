import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { PROSE_MEASURE } from "@/constants";
import { cn } from "@/lib/utils";

type TProps = {
  id?: string;
};

export function CVAbout({ id }: TProps) {
  const t = useTranslations("experiencePage.about");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />
          <div className={cn("space-y-3 text-sm text-muted-foreground leading-relaxed", PROSE_MEASURE)}>
            <p>
              I build product-facing web applications with React and TypeScript. I&apos;ve shipped tools used by millions of students, dashboards for enterprise real estate clients, and full-stack work beyond the frontend. I care about systems, not just interfaces — about what happens when things break, not just when they work. I&apos;m drawn to work where the code connects to something real.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
