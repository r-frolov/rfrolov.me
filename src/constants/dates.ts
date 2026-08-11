export const CAREER_START = new Date("2018-12-01");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// Server components only — reading the clock during a client render is impure.
export function getCareerYears(now: Date = new Date()): number {
  return Math.floor((now.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
}
