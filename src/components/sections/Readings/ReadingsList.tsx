"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { TBook } from "@/types";

import { BookCard } from "./BookCard";
import { CurrentlyReading } from "./CurrentlyReading";

type TProps = {
  booksByYear: [number, TBook[]][];
  currentlyReading: TBook | undefined;
};

export function ReadingsList({ booksByYear, currentlyReading }: TProps) {
  const t = useTranslations("readings");

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-12">
          <SectionHeader title={t("title")} description={t("description")} as="h1" />

          {currentlyReading && <CurrentlyReading book={currentlyReading} />}

          {booksByYear.map(([year, books]) => (
            <div key={year} className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                {year} · {t("books", { count: books.length })}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {books.map((book, index) => (
                  <BookCard key={book.slug} book={book} index={index} />
                ))}
              </div>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
