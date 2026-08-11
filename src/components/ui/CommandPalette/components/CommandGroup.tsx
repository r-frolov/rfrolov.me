import { cn } from "@/lib/utils";

import { TCommand } from "../types";
import { CommandItem } from "./CommandItem";

type TCommandGroupProps = {
  label: string;
  commands: TCommand[];
  /**
   * Absolute offset of this group's first item in the flat command list, so
   * keyboard navigation selection aligns even when the same command exists
   * in multiple groups (e.g. a recently used entry that also appears in
   * Navigation).
   */
  baseIndex: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  isFirst?: boolean;
};

export function CommandGroup({
  label,
  commands,
  baseIndex,
  selectedIndex,
  onSelect,
  onHover,
  isFirst = false,
}: TCommandGroupProps) {
  if (commands.length === 0) return null;

  return (
    <>
      <li
        role="presentation"
        className={cn(
          "px-2 py-1.5 text-xs font-medium text-muted-foreground",
          !isFirst && "mt-2"
        )}
      >
        {label}
      </li>
      {commands.map((cmd, localIndex) => {
        const globalIndex = baseIndex + localIndex;

        return (
          <CommandItem
            key={`${cmd.id}-${globalIndex}`}
            command={cmd}
            isSelected={selectedIndex === globalIndex}
            onSelect={() => onSelect(globalIndex)}
            onHover={() => onHover(globalIndex)}
            index={globalIndex}
          />
        );
      })}
    </>
  );
}
