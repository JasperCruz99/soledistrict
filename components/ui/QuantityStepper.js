"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  label = "Quantity",
  compact = false,
  className,
}) {
  const buttonClass = cn(
    "grid place-items-center text-foreground transition-colors hover:bg-foreground hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset",
    compact ? "size-8" : "size-10"
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center border border-border bg-surface",
        className
      )}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus className={compact ? "size-3" : "size-3.5"} aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-8 text-center text-sm font-medium tabular-nums",
          compact && "min-w-7 text-xs"
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus className={compact ? "size-3" : "size-3.5"} aria-hidden="true" />
      </button>
    </div>
  );
}
