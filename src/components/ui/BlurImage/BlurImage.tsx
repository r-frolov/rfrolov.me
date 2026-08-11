"use client";

import { useState } from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type TBlurImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function BlurImage({ className, wrapperClassName, ...props }: TBlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("image-edge relative overflow-hidden bg-muted/50", wrapperClassName)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-muted transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
