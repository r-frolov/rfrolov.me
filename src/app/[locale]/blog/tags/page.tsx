import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { TAG_CHIP } from "@/components/sections/Blog/constants";
import { BackLink, Container } from "@/components/ui";
import { HOVER_OPACITY } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { getTagsWithCounts } from "@/lib/blog";
import { getTagUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TagsPage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tagsWithCounts = getTagsWithCounts(locale);

  return (
    <main className="pt-16">
      <section className="py-12 lg:py-16">
        <Container>
          <BackLink href="/blog">{tCommon("backToBlog")}</BackLink>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">{t("allTags")}</h1>
            <p className="text-muted-foreground">{t("browseByTopic")}</p>
          </header>

          <div className="flex flex-wrap gap-3">
            {tagsWithCounts.map(({ tag, count }) => (
              <Link
                key={tag}
                href={getTagUrl(tag)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
                  TAG_CHIP,
                  HOVER_OPACITY
                )}
              >
                <span>{tag}</span>
                <span className="text-xs opacity-70">({count})</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
