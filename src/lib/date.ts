import { SITE_TIME_ZONE } from "@/constants/site";

type TDateFormatOptions = {
  locale: string;
  month?: "short" | "long";
};

// Frontmatter dates are calendar dates and parse as UTC midnight, so formatting
// them in the visitor's zone shifts them a day back west of Greenwich.
export function formatDate(date: string | Date, options: TDateFormatOptions): string {
  const { locale, month = "short" } = options;

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: SITE_TIME_ZONE,
  });
}

export function formatMonthYear(date: string | Date, options: TDateFormatOptions): string {
  const { locale, month = "short" } = options;

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month,
    timeZone: SITE_TIME_ZONE,
  });
}
