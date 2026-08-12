"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";

import { TOAST_DURATION_MS } from "@/constants";

import { TToast, TToastContext } from "./types";

export const ToastContext = createContext<TToastContext | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <m.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 shadow-lg"
            >
              <Check className="h-4 w-4 text-green-700 dark:text-green-400" />
              <span className="text-sm">{toast.message}</span>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
