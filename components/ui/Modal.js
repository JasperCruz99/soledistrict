"use client";

import { useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/lib/hooks";

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  className,
  ariaLabel,
}) {
  const panelRef = useRef(null);
  const titleId = useId();

  useBodyScrollLock(open);
  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-[2px] motion-safe:animate-fade-in"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        className={cn(
          "relative max-h-[92dvh] w-full overflow-y-auto rounded-t-lg border border-border bg-surface shadow-[0_30px_90px_rgba(0,0,0,0.24)] motion-safe:animate-slide-up sm:max-w-lg sm:rounded-sm",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            {eyebrow ? (
              <p className="eyebrow text-muted">{eyebrow}</p>
            ) : null}
            <h2
              id={titleId}
              className="font-display text-xl font-semibold tracking-[-0.02em]"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  );
}
