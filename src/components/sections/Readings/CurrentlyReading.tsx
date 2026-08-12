"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { BlurImage } from "@/components/ui";
import { CARD_BASE, CARD_BORDER, CARD_HOVER, ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
};

export function CurrentlyReading({ book }: TProps) {
  const t = useTranslations("readings");

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
        {t("currentlyReading")}
      </h2>
      <Link href={`/readings/${book.slug}`}>
        <div
          className={cn(
            "group flex items-center gap-4",
            CARD_BASE,
            CARD_HOVER,
            CARD_BORDER.featured
          )}
        >
          <BlurImage
            wrapperClassName="relative h-[86px] w-[60px] flex-shrink-0 rounded-sm"
            src={book.cover}
            alt={`${book.title} cover`}
            fill
            className="object-cover"
            sizes="60px"
          />
          <div className="min-w-0 flex-1 max-w-2xl">
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.description}</p>
          </div>
          <ArrowRight
            className={cn(
              ICON_SIZE.md,
              "ms-auto flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
            )}
          />
        </div>
      </Link>
    </div>
  );
}
