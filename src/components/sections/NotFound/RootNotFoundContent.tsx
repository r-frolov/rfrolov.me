"use client";

import { NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/providers";
import { ThemeToggle } from "@/components/ui";
import { SITE_TIME_ZONE } from "@/constants";
import messages from "@/messages/en.json";

import { NotFoundTerminal } from "./NotFoundTerminal";

export function RootNotFoundContent() {
  return (
    <NextIntlClientProvider locale="en" timeZone={SITE_TIME_ZONE} messages={messages}>
      <ThemeProvider>
        <div className="w-full max-w-2xl flex flex-col items-end gap-2">
          <ThemeToggle />
          <NotFoundTerminal />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
