"use client";

import { ReactNode } from "react";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { BackLink, BlurImage, Container, Tag } from "@/components/ui";
import { ANIMATION_DURATION, TEXT_SIZE } from "@/constants";
import { formatMonthYear } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
  children: ReactNode;
};

export function BookDetail({ book, children }: TProps) {
  const t = useTranslations("readings");
  const locale = useLocale();

  const formattedDate = formatMonthYear(`${book.dateRead}-01`, { month: "long", locale });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <m.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.slower }}
          className="mx-auto max-w-2xl space-y-8"
        >
          <BackLink href="/readings">{t("backToReadings")}</BackLink>

          <header className="flex gap-6">
            <BlurImage
              wrapperClassName="relative h-[220px] w-[150px] flex-shrink-0 rounded"
              src={book.cover}
              alt={`${book.title} cover`}
              fill
              className="object-cover"
              sizes="150px"
            />
            <div className="space-y-3">
              <h1 className={cn("font-semibold tracking-tight", TEXT_SIZE.title)}>{book.title}</h1>
              <p className="text-muted-foreground">{book.author}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </header>

          <p className="text-muted-foreground">{book.description}</p>

          <hr className="border-border" />

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {t("myThoughts")}
            </p>
            <div className="prose-custom">{children}</div>
          </div>
        </m.article>
      </Container>
    </section>
  );
}
