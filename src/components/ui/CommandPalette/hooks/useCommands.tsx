import { useMemo } from "react";

import {
  BookOpen,
  Briefcase,
  FileText,
  FolderKanban,
  Home,
  Languages,
  Library,
  Moon,
  Sun,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { ICON_SIZE } from "@/constants";
import { defaultLocale, isLocale, TLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";

import { TCommand, TCommandPalettePost } from "../types";

export function useCommands(blogPosts: TCommandPalettePost[]) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const localeRaw = useLocale();
  const locale: TLocale = isLocale(localeRaw) ? localeRaw : defaultLocale;
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const otherLocale = locale === "en" ? "de" : "en";

  const commands = useMemo<TCommand[]>(() => {
    const navCommands: TCommand[] = [
      {
        id: "home",
        label: t("nav.home"),
        icon: <Home className={ICON_SIZE.sm} />,
        action: () => router.push("/"),
        group: "navigation",
      },
      {
        id: "experience",
        label: t("nav.experience"),
        icon: <Briefcase className={ICON_SIZE.sm} />,
        action: () => router.push("/experience"),
        group: "navigation",
      },
      {
        id: "projects",
        label: t("nav.projects"),
        icon: <FolderKanban className={ICON_SIZE.sm} />,
        action: () => router.push("/projects"),
        group: "navigation",
      },
      {
        id: "blog",
        label: t("nav.blog"),
        icon: <BookOpen className={ICON_SIZE.sm} />,
        action: () => router.push("/blog"),
        group: "navigation",
      },
      {
        id: "readings",
        label: t("nav.readings"),
        icon: <Library className={ICON_SIZE.sm} />,
        action: () => router.push("/readings"),
        group: "navigation",
      },
    ];

    const actionCommands: TCommand[] = [
      {
        id: "theme",
        label: isDark ? t("theme.switchToLight") : t("theme.switchToDark"),
        icon: isDark ? <Sun className={ICON_SIZE.sm} /> : <Moon className={ICON_SIZE.sm} />,
        shortcut: "T",
        shortcutHint: t("commandPalette.shortcutTheme"),
        action: () => setTheme(isDark ? "light" : "dark"),
        group: "actions",
      },
      {
        id: "language",
        label: t("language.switchTo", { language: t(`language.${otherLocale}`) }),
        icon: <Languages className={ICON_SIZE.sm} />,
        shortcut: "L",
        shortcutHint: t("commandPalette.shortcutLanguage"),
        action: () => router.replace(pathname, { locale: otherLocale }),
        group: "actions",
      },
    ];

    const blogCommands: TCommand[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      icon: <FileText className={ICON_SIZE.sm} />,
      action: () => router.push(`/blog/${post.slug}`),
      group: "blog",
    }));

    return [...navCommands, ...actionCommands, ...blogCommands];
  }, [t, router, pathname, otherLocale, isDark, setTheme, blogPosts]);

  return commands;
}
