"use client";

import { useEffect } from "react";

import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type TErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: TErrorProps) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">terminal — error</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-4">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <span className="font-semibold">{t("title")}</span>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed">{t("description")}</p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={reset}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs",
                  "bg-foreground text-background cursor-pointer",
                  "hover:opacity-90 transition-opacity"
                )}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t("retry")}
              </button>

              <Link
                href="/"
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs",
                  "bg-muted text-foreground cursor-pointer",
                  "hover:opacity-70 transition-opacity"
                )}
              >
                <Home className="h-3.5 w-3.5" />
                {t("goHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
