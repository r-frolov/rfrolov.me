"use client";

import { TRANSITION } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

import { TCommand } from "../types";

type TCommandItemProps = {
  command: TCommand;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
  index: number;
};

export function CommandItem({
  command,
  isSelected,
  onSelect,
  onHover,
  index,
}: TCommandItemProps) {
  const { icon, label } = command;
  const isTactile = useTactileSurface("command-palette");

  return (
    <li
      id={`command-option-${index}`}
      role="option"
      aria-selected={isSelected}
      data-selected={isSelected}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={
        isTactile
          ? "tactile-surface tactile-surface--ghost tactile-surface--md w-full justify-start px-3"
          : cn(
              "flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer",
              TRANSITION.normal,
              isSelected ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"
            )
      }
    >
      {isTactile ? (
        <span>
          {icon}
          <span className="text-sm">{label}</span>
        </span>
      ) : (
        <>
          {icon}
          <span className="text-sm">{label}</span>
        </>
      )}
    </li>
  );
}
