"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";

import { ANIMATION_DURATION } from "@/constants";
import { useCommandPalette, useFocusTrap, useHydrated, useReducedMotion } from "@/hooks";

import { CommandFooter, CommandGroup, CommandSearchInput, CommandShortcutHints } from "./components";
import {
  useCommandFilter,
  useCommands,
  useKeyboardNavigation,
  useRecentCommands,
} from "./hooks";
import { TCommandPaletteProps } from "./types";

export function CommandPalette({ blogPosts = [] }: TCommandPaletteProps) {
  const t = useTranslations();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const { isOpen, close } = useCommandPalette();

  const commands = useCommands(blogPosts);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, dialogRef);

  const { recentIds, recordCommand } = useRecentCommands();
  const shortcutCommands = commands.filter((cmd) => cmd.shortcut);
  const { groupedCommands, flatCommands } = useCommandFilter(commands, query, { recentIds });

  const { selectedIndex, setSelectedIndex, executeCommand } = useKeyboardNavigation({
    isOpen,
    flatCommands,
    commands,
    listRef,
    query,
    close,
  });

  // Wrap executeCommand so that running a command also bumps it in the
  // recent-commands list. Shortcut-triggered commands from the input flow
  // still run through the palette's executeCommand here.
  const executeAndRecord = useCallback(
    (index: number) => {
      const command = flatCommands[index];
      if (command) recordCommand(command.id);
      executeCommand(index);
    },
    [flatCommands, executeCommand, recordCommand]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  const groupConfig = useMemo(() => {
    const order: Array<{ key: keyof typeof groupedCommands; label: string }> = [
      { key: "recent", label: t("commandPalette.recent") },
      { key: "navigation", label: t("commandPalette.navigation") },
      { key: "actions", label: t("commandPalette.actions") },
      { key: "blog", label: t("commandPalette.blog") },
    ];

    let offset = 0;
    let firstRenderedKey: string | null = null;

    return order.map(({ key, label }) => {
      const group = groupedCommands[key];
      const baseIndex = offset;
      offset += group.length;

      if (group.length > 0 && firstRenderedKey === null) {
        firstRenderedKey = key;
      }

      return { key, label, group, baseIndex, isFirst: firstRenderedKey === key };
    });
  }, [groupedCommands, t]);

  if (!hydrated) return null;

  const animationDuration = prefersReducedMotion ? 0 : ANIMATION_DURATION.fast;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-background/80 backdrop-blur-sm"
            onClick={close}
          />

          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("commandPalette.title")}
            initial={{ opacity: 0, scale: 0.92, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 350, damping: 28, mass: 0.6 }
            }
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
              <CommandSearchInput
                inputRef={inputRef}
                query={query}
                onQueryChange={setQuery}
                onClose={close}
              />

              <ul ref={listRef} role="menu" className="max-h-80 overflow-y-auto p-2">
                {flatCommands.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {t("commandPalette.noResults")}
                  </li>
                ) : (
                  groupConfig.map(({ key, label, group, baseIndex, isFirst }) => (
                    <CommandGroup
                      key={key}
                      label={label}
                      commands={group}
                      baseIndex={baseIndex}
                      selectedIndex={selectedIndex}
                      onSelect={executeAndRecord}
                      onHover={setSelectedIndex}
                      isFirst={isFirst}
                    />
                  ))
                )}
              </ul>

              <CommandFooter onClose={close} />
            </div>

            <CommandShortcutHints shortcuts={shortcutCommands} />
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
