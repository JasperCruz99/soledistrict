import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import PageIntro from "@/components/ui/PageIntro";
import { cn } from "@/lib/utils";

export const policyLinks = [
  { label: "Privacy policy", href: "/policies/privacy" },
  { label: "Terms of use", href: "/policies/terms" },
  { label: "Accessibility", href: "/policies/accessibility" },
];

export default function PolicyPage({
  current,
  title,
  description,
  updated,
  sections,
}) {
  return (
    <>
      <PageIntro
        eyebrow="Policies / Demo store"
        title={title}
        breadcrumbs={[
          { label: "Policies", href: "/policies" },
          { label: title },
        ]}
        description={description}
      >
        <div className="w-full max-w-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center bg-background">
              <FileText className="size-4 text-muted" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                Sample policy
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Last updated {updated}
              </p>
            </div>
          </div>
          <p className="mt-4 border-t border-border pt-4 text-[10px] leading-relaxed text-muted">
            Written for a fictional storefront demonstration. This is not legal
            advice or a live commercial policy.
          </p>
        </div>
      </PageIntro>

      <section className="shell py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              All policies
            </p>
            <nav
              aria-label="Store policies"
              className="mt-3 border-y border-border"
            >
              {policyLinks.map((policy) => {
                const active = current === policy.href;
                return (
                  <Link
                    key={policy.href}
                    href={policy.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-3 border-b border-border py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors last:border-b-0",
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {policy.label}
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        active ? "bg-foreground" : "bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border border-border bg-surface p-5">
              <Mail className="size-4 text-muted" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium">
                Questions about this policy?
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                The contact form is also a demo, but it shows where support
                content would live in a live storefront.
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
              >
                Contact support
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </aside>

          <div>
            <div className="space-y-10">
              {sections.map((section, index) => {
                const headingId = `policy-section-${index + 1}`;
                return (
                  <section key={section.heading} aria-labelledby={headingId}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={headingId}
                        className="font-display text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="space-y-2.5 border-l border-border pl-5">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="relative before:absolute before:-left-5 before:top-[0.62em] before:size-1 before:bg-foreground/40"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-4 border border-border bg-surface p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium">Need help elsewhere?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Return to the policy centre or ask the demo support team.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/policies" className="btn btn-outline btn-sm">
                  All policies
                </Link>
                <Link href="/contact" className="btn btn-primary btn-sm">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
