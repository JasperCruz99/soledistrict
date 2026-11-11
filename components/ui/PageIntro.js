import Breadcrumbs from "./Breadcrumbs";
import { cn } from "@/lib/utils";

export default function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
  className,
}) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="shell py-9 sm:py-12 lg:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            {eyebrow ? (
              <p className="eyebrow text-muted">
                <span
                  className="inline-block size-1.5 bg-foreground"
                  aria-hidden="true"
                />
                {eyebrow}
              </p>
            ) : null}
            <h1 className="headline mt-4 text-[clamp(2.4rem,6vw,4rem)] uppercase">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                {description}
              </p>
            ) : null}
          </div>
          {children ? (
            <div className="lg:justify-self-end">{children}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
