"use client";

import { useEffect, useRef } from "react";

import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/ui";
import { HOVER_TEXT_COLOR, NAV_LINKS } from "@/constants";
import { useFocusTrap, useTactileSurface } from "@/hooks";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";

type TMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuContainerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.2 },
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { duration: 0.15 },
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.15 },
  },
};

export function MobileMenu({ isOpen, onClose }: TMobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const isTactileMenu = useTactileSurface("mobile-menu");

  // Declared before the effect below so the trap records the hamburger as the
  // element to restore, rather than the first menu link that effect focuses.
  useFocusTrap(isOpen, menuRef);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;

    if (!menu) return;

    menu
      .querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])')
      ?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="mobile-menu-open fixed inset-x-0 z-40 sm:hidden"
          style={{ top: "var(--nav-height, 4rem)" }}
        >
          {/* Backdrop overlay for click-outside */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={onClose}
          />

          {/* Menu content */}
          <m.nav
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={tCommon("mobileMenu")}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainerVariants}
            className="relative overflow-hidden bg-background border-b border-border"
          >
            <ul className="flex flex-col py-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <m.li key={link.href} variants={linkVariants}>
                    {isTactileMenu ? (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className="tactile-surface tactile-surface--ghost tactile-surface--md mx-6 my-1 w-[calc(100%-3rem)] justify-start px-4"
                      >
                        <span>{t(link.key)}</span>
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "relative block px-6 py-3 text-base transition-colors duration-300",
                          // Left accent bar + filled background for the current
                          // route — a single color change was too subtle on
                          // dark backgrounds where muted text is already dim.
                          isActive
                            ? "bg-muted font-medium text-foreground before:absolute before:inset-y-1 before:left-0 before:w-1 before:rounded-r-full before:bg-accent-foreground"
                            : HOVER_TEXT_COLOR
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    )}
                  </m.li>
                );
              })}

              {/* Divider */}
              <m.li variants={linkVariants} className="border-t border-border my-2 mx-6" />

              {/* Controls */}
              <m.li variants={linkVariants} className="flex items-center gap-4 px-6 py-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </m.li>
            </ul>
          </m.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
