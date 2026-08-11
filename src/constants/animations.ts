export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.5,
} as const;

export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;

export const ICON_SWAP = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};

export const ICON_SWAP_TRANSITION = {
  type: "spring",
  duration: ANIMATION_DURATION.normal,
  bounce: 0,
} as const;

export const TOAST_DURATION_MS = 2000;

export const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_TRANSITION = {
  duration: ANIMATION_DURATION.slower,
};

export const PAGE_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const PAGE_TRANSITION_DURATION = ANIMATION_DURATION.normal;

type TStaggerOptions = {
  y?: number;
  delayMultiplier?: number;
  duration?: number;
};

export function getStaggeredAnimation(index: number, options: TStaggerOptions = {}) {
  const { y = 24, delayMultiplier = 0.08, duration = ANIMATION_DURATION.slower } = options;

  return {
    initial: { opacity: 0, y, scale: 0.96, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    transition: {
      delay: index * delayMultiplier,
      duration,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}

type TEase = "easeIn" | "easeOut" | "easeInOut" | "linear";

type TStaggerContainerOptions = {
  staggerChildren?: number;
  direction?: "x" | "y";
  offset?: number;
  duration?: number;
  ease?: TEase;
};

export function createStaggerAnimation(options: TStaggerContainerOptions = {}) {
  const {
    staggerChildren = 0.1,
    direction = "y",
    offset = 20,
    duration = ANIMATION_DURATION.normal,
    ease = "easeOut",
  } = options;

  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren },
      },
    },
    item: {
      hidden: { opacity: 0, x: direction === "x" ? offset : 0, y: direction === "y" ? offset : 0 },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, ease },
      },
    },
  };
}
