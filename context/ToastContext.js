"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AlertCircle, Check, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let toastCounter = 0;

const variantStyles = {
  success: {
    icon: Check,
    iconClass: "bg-accent text-foreground",
  },
  error: {
    icon: AlertCircle,
    iconClass: "bg-error text-white",
  },
  info: {
    icon: Info,
    iconClass: "bg-white/10 text-white",
  },
};

function ToastItem({ toast, onDismiss }) {
  const { icon: Icon, iconClass } = variantStyles[toast.variant] ?? variantStyles.info;

  useEffect(() => {
    const timeout = window.setTimeout(
      () => onDismiss(toast.id),
      toast.duration ?? 4500
    );
    return () => window.clearTimeout(timeout);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className="pointer-events-auto flex w-full items-start gap-3 rounded-sm border border-white/10 bg-foreground p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)] motion-safe:animate-toast-in">
      <span
        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${iconClass}`}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug">{toast.title}</p>
        {toast.description ? (
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            {toast.description}
          </p>
        ) : null}
        {toast.action?.href ? (
          <Link
            href={toast.action.href}
            onClick={() => onDismiss(toast.id)}
            className="mt-2 inline-block text-xs font-semibold text-accent underline-offset-4 hover:underline"
          >
            {toast.action.label}
          </Link>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="grid size-7 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    toastCounter += 1;
    counterRef.current += 1;
    const id = `toast-${toastCounter}`;
    const nextToast = { id, variant: "success", ...toast };

    setToasts((current) => {
      const trimmed = current.slice(-2);
      return [...trimmed, nextToast];
    });

    return id;
  }, []);

  const value = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[130] flex flex-col items-end gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
