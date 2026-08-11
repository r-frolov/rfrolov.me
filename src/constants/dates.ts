export const CAREER_START = new Date("2018-12-01");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// Reads the clock, so it must only be called from a server component — the
// value is then baked into the static export at build time. Calling it during
// a client render violates React's purity rule (react-hooks/purity).
export function getCareerYears(now: Date = new Date()): number {
  return Math.floor((now.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
}
