import type { Metadata, Viewport } from "next";

import { JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { Footer, Navbar } from "@/components/layout";
import { CronitorProvider, LanguageProvider, MotionProvider, TactileProvider, ThemeProvider } from "@/components/providers";
import { CommandPalette, KeyboardShortcuts, ScrollToTop, TactileFirstVisitHint, ToastProvider } from "@/components/ui";
import { SITE_NAME, SITE_URL } from "@/constants";
import { CommandPaletteProvider } from "@/contexts";
import { isLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

import "../globals.css";
import "@/styles/tactile.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

type TProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: ["software engineer", "React", "TypeScript", "web development"],
    authors: [{ name: SITE_NAME }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: TProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });
  const blogPosts = getAllPosts(locale);

  return (
    <html lang={locale} className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        {/* No-flash: set the tactile attribute before React hydrates so the
            focus-ring CSS gate is correct on first paint. Component branching
            happens after hydration; brief flash is documented in the spec. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("rf-tactile");if(s==="on")document.documentElement.setAttribute("data-tactile","on");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-mono antialiased" suppressHydrationWarning>
        <CronitorProvider />
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <ThemeProvider>
              <MotionProvider>
                <TactileProvider>
                  <ToastProvider>
                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                    >
                      {t("skipToContent")}
                    </a>
                    <CommandPaletteProvider>
                      <Navbar />
                      <CommandPalette blogPosts={blogPosts} />
                    </CommandPaletteProvider>
                    <KeyboardShortcuts />
                    <TactileFirstVisitHint />
                    <div id="main-content">{children}</div>
                    <Footer />
                    <ScrollToTop />
                  </ToastProvider>
                </TactileProvider>
              </MotionProvider>
            </ThemeProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
