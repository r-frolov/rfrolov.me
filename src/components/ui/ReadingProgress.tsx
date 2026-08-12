"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";
import { cn } from "@/lib/utils";

type TReadingProgressProps = {
  showPercentage?: boolean;
};

export function ReadingProgress({ showPercentage = false }: TReadingProgressProps) {
  const progress = useReadingProgress();
  const roundedProgress = Math.round(progress);
  const isComplete = roundedProgress >= 100;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 group">
      {/* Progress bar track */}
      <div className="h-0.5 bg-border">
        <div
          className={cn(
            "h-full transition-[width,background-color] duration-150 ease-out",
            isComplete ? "bg-accent" : "bg-foreground"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage indicator */}
      {showPercentage && roundedProgress > 0 && (
        <div
          className={cn(
            "absolute top-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
            "bg-foreground text-background",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            "pointer-events-none"
          )}
          style={{
            left: `clamp(0px, calc(${progress}% - 16px), calc(100% - 32px))`,
          }}
        >
          {roundedProgress}%
        </div>
      )}
    </div>
  );
}
