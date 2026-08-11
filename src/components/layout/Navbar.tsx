"use client";

import { useEffect, useRef, useState } from "react";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { Command } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container, HamburgerIcon, MagneticLink, ThemeToggle } from "@/components/ui";
import { HOVER_TEXT_COLOR, KBD_BASE, NAV_LINKS } from "@/constants";
import { useCommandPalette, useReducedMotion, useScrolled, useTactileSurface } from "@/hooks";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const scrolled = useScrolled(50);
  const { open: openCommandPalette } = useCommandPalette();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isTactileNavbar = useTactileSurface("navbar");
  const isTactileHamburger = useTactileSurface("hamburger");

  const { scrollY } = useScroll();
  const padding = useTransform(scrollY, [0, 120], [12, 0]);
  const smoothPadding = useSpring(padding, { stiffness: 200, damping: 30 });
  const headerRef = useRef<HTMLElement>(null);

  // Expose the live header height as --nav-height so MobileMenu can sit flush
  // against the navbar's bottom even while the top-of-page padding animates.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => {
      document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(header);

    return () => ro.disconnect();
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const headerStyle = prefersReducedMotion
    ? undefined
    : { paddingTop: smoothPadding, paddingBottom: smoothPadding };

  return (
    <>
      <m.header
        ref={headerRef}
        style={headerStyle}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled || isMenuOpen
            ? "bg-background/80 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-16">
            <MagneticLink strength={0.3} range={60}>
              <Link
                href="/"
                aria-label={t("home")}
                // -m-3/p-3 grows the hit area to 43x45 without moving the mark.
                className="-m-3 inline-block p-3 font-semibold text-foreground"
              >
                RF
              </Link>
            </MagneticLink>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-6">
              {isTactileNavbar ? (
                <ul className="flex items-center gap-2">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className="tactile-surface tactile-surface--ghost tactile-surface--sm"
                        >
                          <span>{t(link.key)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="flex items-center gap-2">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                    return (
                      <li key={link.href} className="relative">
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "relative z-10 inline-block px-3 py-1.5 text-sm transition-colors duration-300",
                            isActive ? "text-foreground" : HOVER_TEXT_COLOR
                          )}
                        >
                          {t(link.key)}
                        </Link>
                        {isActive && !prefersReducedMotion && (
                          <m.span
                            layoutId="navbar-active-pill"
                            className="absolute inset-0 rounded-md bg-muted"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            aria-hidden
                          />
                        )}
                        {isActive && prefersReducedMotion && (
                          <span
                            className="absolute inset-0 rounded-md bg-muted"
                            aria-hidden
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
              <LanguageSwitcher />
              <ThemeToggle />
              <MagneticLink strength={0.3} range={60}>
                <m.button
                  onClick={openCommandPalette}
                  aria-label={t("openCommandPalette")}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 0 rgba(127,127,127,0)",
                            "0 0 0 4px rgba(127,127,127,0.08)",
                            "0 0 0 0 rgba(127,127,127,0)",
                          ],
                        }
                  }
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    KBD_BASE,
                    "hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground",
                    "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </m.button>
              </MagneticLink>
            </div>

            {/* Mobile hamburger button — sm:hidden on wrapper to avoid
                .tactile-surface display:inline-flex overriding it */}
            <div className="sm:hidden">
              {isTactileHamburger ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="tactile-surface tactile-surface--ghost tactile-surface--sm tactile-surface--square"
                  aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
                  aria-expanded={isMenuOpen}
                >
                  <span>
                    <HamburgerIcon isOpen={isMenuOpen} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 cursor-pointer"
                  aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
                  aria-expanded={isMenuOpen}
                >
                  <HamburgerIcon isOpen={isMenuOpen} />
                </button>
              )}
            </div>
          </nav>
        </Container>
      </m.header>

      {/* Mobile menu - outside header to avoid fixed positioning issues */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
