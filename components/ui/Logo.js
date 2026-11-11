import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ tone = "dark", className }) {
  return (
    <Link
      href="/"
      aria-label="SoleDistrict home"
      className={cn(
        "inline-flex items-baseline font-display font-bold leading-none tracking-[-0.045em] transition-opacity hover:opacity-70",
        tone === "light" ? "text-white" : "text-foreground",
        className
      )}
    >
      <span>SoleDistrict</span>
      <span className="text-accent" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
