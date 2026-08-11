import { useTranslations } from "next-intl";

import { Tag } from "@/components/ui/Tag";
import { TProjectCategory } from "@/types";

type TCategoryWithYearProps = {
  category: TProjectCategory;
  year: number;
  size?: "sm" | "md";
};

export function CategoryWithYear({ category, year, size = "md" }: TCategoryWithYearProps) {
  const t = useTranslations("projects.categories");

  return (
    <div className="flex items-center gap-2">
      <Tag size={size}>{t(category)}</Tag>
      <span className="text-xs text-muted-foreground">{year}</span>
    </div>
  );
}
