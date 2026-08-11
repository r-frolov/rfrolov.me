"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {
      // Ignore errors (SSR, localStorage unavailable, invalid JSON)
    }

    setIsHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Ignore errors (quota exceeded, etc.)
    }
  }, [key, state, isHydrated]);

  // Return default value before hydration to avoid flash
  return [isHydrated ? state : defaultValue, setState];
}
