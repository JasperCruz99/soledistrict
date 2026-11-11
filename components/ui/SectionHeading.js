import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  className,
  titleClassName,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="eyebrow mb-4 text-muted">
            <span
              className="inline-block size-1.5 bg-foreground"
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "headline text-[clamp(1.85rem,4vw,2.75rem)] uppercase",
            titleClassName
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {link ? (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-muted"
        >
          {link.label}
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
