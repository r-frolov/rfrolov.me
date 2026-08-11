import { type ReactNode } from "react";

type TTerminalWindowProps = {
  children: ReactNode;
  title: string;
  onContentClick?: () => void;
};

export function TerminalWindow({ children, title, onContentClick }: TTerminalWindowProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
      </div>

      <div
        className="p-4 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto"
        onClick={onContentClick}
      >
        {children}
      </div>
    </div>
  );
}
