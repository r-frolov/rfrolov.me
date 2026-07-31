"use client";

import { Download, Github, Linkedin, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container } from "@/components/ui";
import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR } from "@/constants";
import { cn } from "@/lib/utils";

export function CVHeader() {
  const t = useTranslations("experiencePage.contact");

  function handleDownload() {
    window.print();
  }

  return (
    <section className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Roman Frolov</h1>
            <p className="text-lg text-muted-foreground">Software Engineer</p>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>Berlin, Germany</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <a
              href="https://github.com/r-frolov"
              {...EXTERNAL_LINK_PROPS}
              className={cn("inline-flex items-center gap-1.5 text-sm transition-colors duration-300", HOVER_TEXT_COLOR)}
            >
              <Github className="h-3.5 w-3.5" />
              {t("github")}
            </a>

            <a
              href="https://linkedin.com/in/r-frolov"
              {...EXTERNAL_LINK_PROPS}
              className={cn("inline-flex items-center gap-1.5 text-sm transition-colors duration-300", HOVER_TEXT_COLOR)}
            >
              <Linkedin className="h-3.5 w-3.5" />
              {t("linkedin")}
            </a>

            <button
              onClick={handleDownload}
              className={cn("inline-flex items-center gap-1.5 text-sm cursor-pointer transition-colors duration-300", HOVER_TEXT_COLOR)}
            >
              <Download className="h-3.5 w-3.5" />
              {t("downloadCV")}
            </button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
