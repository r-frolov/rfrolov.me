"use client";

import { memo } from "react";

import { AnimatedCard, BlurImage, Tag } from "@/components/ui";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
  index: number;
};

export const BookCard = memo(function BookCard({ book, index }: TProps) {
  const date = new Date(book.dateRead + "-01");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <AnimatedCard index={index} href={`/readings/${book.slug}`} internal linkLabel={book.title}>
      <div className="flex gap-3">
        <BlurImage
          wrapperClassName="relative h-[72px] w-[48px] flex-shrink-0 rounded-sm"
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          className="object-cover"
          sizes="48px"
        />
        <div className="flex flex-1 flex-col gap-1.5">
          <div>
            <h3 className="font-medium text-sm">{book.title}</h3>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
          <div className="mt-auto flex items-center justify-between pt-1">
            {book.tags[0] && <Tag size="sm">{book.tags[0]}</Tag>}
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
});
