import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  FileText,
  LifeBuoy,
  Mail,
  ShieldCheck,
} from "lucide-react";
import PageIntro from "@/components/ui/PageIntro";

export const metadata = {
  title: "Store Policies",
  description:
    "Sample privacy, terms, accessibility, shipping, returns, and support information for the SoleDistrict demo storefront.",
};

const policies = [
  {
    title: "Privacy policy",
    href: "/policies/privacy",
    description:
      "What stays in your browser, what the demo forms do, and the small amount of shopping data the site keeps locally.",
    icon: ShieldCheck,
    label: "Data & storage",
  },
  {
    title: "Terms of use",
    href: "/policies/terms",
    description:
      "The rules for using a fictional storefront where no order is real, no payment is taken, and sample content is clearly labelled.",
    icon: FileText,
    label: "Using the demo",
  },
  {
    title: "Accessibility",
    href: "/policies/accessibility",
    description:
      "The accessible patterns built into the storefront, the limitations of the demo, and how to share feedback.",
    icon: Accessibility,
    label: "Inclusive by design",
  },
];

const supportLinks = [
  {
    title: "Shipping & returns",
    href: "/about#shipping-returns",
    description: "Sample delivery windows, flat-rate shipping, and the 30-day return terms.",
  },
  {
    title: "Size guide",
    href: "/about#size-guide",
    description: "US, UK, EU conversions and a simple at-home measuring method.",
  },
  {
    title: "FAQ",
    href: "/about#faq",
    description: "Straight answers about the products, sizing, payments, and demo status.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Support hours, response expectations, and the sample message form.",
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageIntro
        eyebrow="The fine print"
        title="Store policies."
        breadcrumbs={[{ label: "Policies" }]}
        description="The practical details behind the storefront: privacy, terms, accessibility, shipping, and support. Everything here is sample content for a fictional demo."
      >
        <dl className="grid w-full max-w-sm grid-cols-2 divide-x divide-border border border-border bg-surface">
          <div className="px-5 py-4">
            <dt className="text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
              Policy pages
            </dt>
            <dd className="mt-1 font-display text-3xl font-semibold tracking-[-0.04em]">
              03
            </dd>
          </div>
          <div className="px-5 py-4">
            <dt className="text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
              Store status
            </dt>
            <dd className="mt-1 font-display text-xl font-semibold uppercase tracking-[-0.03em]">
              Demo
            </dd>
          </div>
        </dl>
      </PageIntro>

      <section className="shell py-12 sm:py-16 lg:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link
                key={policy.href}
                href={policy.href}
                className="group flex flex-col border border-border bg-surface p-6 transition-colors hover:border-foreground sm:p-7"
              >
                <span className="grid size-10 place-items-center bg-background">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {policy.label}
                </span>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em]">
                  {policy.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {policy.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:border-foreground">
                  Read policy
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 border border-border bg-surface">
          <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="eyebrow text-muted">
                <span
                  className="inline-block size-1.5 bg-foreground"
                  aria-hidden="true"
                />
                Helpful next stops
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Practical support.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              The everyday questions are covered on the About page. The contact
              page shows where a real support conversation would begin.
            </p>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            {supportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start justify-between gap-5 bg-surface p-6 transition-colors hover:bg-background sm:p-7"
              >
                <span>
                  <span className="font-display text-base font-semibold tracking-[-0.02em]">
                    {link.title}
                  </span>
                  <span className="mt-1.5 block max-w-sm text-xs leading-relaxed text-muted">
                    {link.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 bg-dark-surface p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center bg-white/10">
              <LifeBuoy className="size-5 text-accent" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-[-0.02em]">
                Still need a human answer?
              </p>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/60">
                The contact form is a demo, but the page shows the support
                hours, response expectations, and message fields a real store
                would use.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="btn btn-accent w-full shrink-0 sm:w-auto"
          >
            <Mail className="size-4" aria-hidden="true" />
            Contact support
          </Link>
        </div>
      </section>
    </>
  );
}
