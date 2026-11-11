"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/lib/hooks";

export default function FilterDrawer({ onClose, resultCount, children }) {
  const panelRef = useRef(null);

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);
  useFocusTrap(true, panelRef);

  return (
    <div className="fixed inset-0 z-[95]">
      <div
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px] motion-safe:animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className="absolute right-0 top-0 flex h-full w-full max-w-[360px] flex-col bg-surface shadow-[-20px_0_80px_rgba(0,0,0,0.18)] motion-safe:animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        <div className="border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            Show {resultCount} product{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </aside>
    </div>
  );
}
