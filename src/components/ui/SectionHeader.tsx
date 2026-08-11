import { HOVER_OPACITY, TEXT_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { RevealText } from "./RevealText";

type TSectionHeaderProps = {
  title: string;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({ title, description, link, as: Tag = "h2" }: TSectionHeaderProps) {
  const titleClasses = cn(
    "font-semibold tracking-tight text-balance",
    Tag === "h1" ? TEXT_SIZE.title : TEXT_SIZE.heading
  );

  return (
    <div className={link ? "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1" : undefined}>
      <div>
        <RevealText as={Tag} text={title} className={titleClasses} />
        {description && (
          <p className={cn("text-muted-foreground mt-2 text-pretty", TEXT_SIZE.body)}>{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn(
            "-my-1.5 inline-block py-1.5 text-accent-foreground hover:text-accent",
            TEXT_SIZE.body,
            HOVER_OPACITY
          )}
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
