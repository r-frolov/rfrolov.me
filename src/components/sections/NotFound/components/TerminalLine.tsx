import { cn } from "@/lib/utils";

import { type TTerminalLineType } from "../constants";

type TProps = {
  type: TTerminalLineType;
  text: string;
};

const LINE_COLORS: Record<TTerminalLineType, string> = {
  command: "text-foreground",
  error: "text-red-700 dark:text-red-400",
  success: "text-green-700 dark:text-green-400",
  output: "text-muted-foreground",
  empty: "text-foreground",
};

export function TerminalLine({ type, text }: TProps) {
  return (
    <div className={cn(LINE_COLORS[type], "leading-relaxed whitespace-pre-wrap break-words")}>
      {text || "\u00A0"}
    </div>
  );
}
