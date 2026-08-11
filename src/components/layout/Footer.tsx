"use client";

import { useTranslations } from "next-intl";

import { Container, SocialLink, TactileModeToggle } from "@/components/ui";
import { socialLinks } from "@/data/social-links";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link
              href="/"
              className="cursor-pointer font-semibold text-foreground hover:opacity-80 transition-opacity"
            >
              RF
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
            <TactileModeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
