"use client";

import { useTranslations } from "next-intl";

import { Container, SocialLink, TactileModeToggle } from "@/components/ui";
import { socialLinks } from "@/data/social-links";
import { Link } from "@/i18n/routing";

type TFooterProps = {
  /**
   * Resolved by the server layout. Reading the clock during a client render
   * disagrees with the year frozen into the static export, which React treats
   * as a hydration mismatch once the year rolls over.
   */
  year: number;
};

export function Footer({ year }: TFooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link
              href="/"
              // -m-3/p-3 grows the hit area past the 24x24 floor without moving the mark.
              className="-m-3 inline-block cursor-pointer p-3 font-semibold text-foreground transition-opacity hover:opacity-80"
            >
              RF
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("copyright", { year })}
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
