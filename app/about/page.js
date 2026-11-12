import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  RefreshCcw,
  Ruler,
  Truck,
} from "lucide-react";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export const metadata = {
  title: "About",
  description:
    "The story, values, shipping terms, size guide, and frequently asked questions behind SoleDistrict — an independent sneaker concept storefront.",
};

const stats = [
  { value: "18", label: "Curated pairs" },
  { value: "06", label: "Independent labels" },
  { value: "01", label: "Standard: considered" },
];

const values = [
  {
    number: "01",
    title: "Curated, not crowded",
    description:
      "A tight edit of lifestyle, running, and street pairs. If a shoe does not earn its place in the rotation, it does not make the shelf.",
  },
  {
    number: "02",
    title: "Independent by design",
    description:
      "We champion labels with a point of view. Names you may not know yet, chosen for the way they think — not for the size of the logo.",
  },
  {
    number: "03",
    title: "Comfort is not optional",
    description:
      "Every pair is considered for hour eight, not just the first five minutes. Good lines should still feel good when the day gets long.",
  },
  {
    number: "04",
    title: "Fewer, better pairs",
    description:
      "We would rather help you find one pair you keep wearing than sell you three you forget. That is the whole point of a considered rotation.",
  },
];

const sizeRows = [
  { us: "7", uk: "6", eu: "40", cm: "25.0" },
  { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.4" },
  { us: "8", uk: "7", eu: "41", cm: "26.0" },
  { us: "8.5", uk: "7.5", eu: "42", cm: "26.7" },
  { us: "9", uk: "8", eu: "42.5", cm: "27.3" },
  { us: "9.5", uk: "8.5", eu: "43", cm: "27.9" },
  { us: "10", uk: "9", eu: "44", cm: "28.6" },
  { us: "10.5", uk: "9.5", eu: "44.5", cm: "29.2" },
  { us: "11", uk: "10", eu: "45", cm: "29.8" },
  { us: "12", uk: "11", eu: "46", cm: "30.5" },
];

const faqs = [
  {
    question: "Are the brands and products real?",
    answer:
      "No. SoleDistrict is a fictional storefront built as a frontend portfolio demonstration. The labels, product names, ratings, reviews, and policies on this site are invented sample content, not real commercial offerings or brand endorsements.",
  },
  {
    question: "How should I choose my size?",
    answer:
      "Start with the size guide above and measure your foot from heel to longest toe. Our sample catalog uses US sizing as the base. If you are between sizes, the product pages note whether the pair runs true to size or suggests sizing up.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "This demo does not ship anything. The shipping estimates at checkout are illustrative only. In a real store, delivery windows, duties, and international rates would be calculated at checkout before payment.",
  },
  {
    question: "What is the return policy?",
    answer:
      "The demo policy is 30 days from delivery, in original and unworn condition with the original packaging. This is sample copy for the storefront experience; no real return, refund, or shipment can be initiated from this site.",
  },
  {
    question: "Is my payment information collected?",
    answer:
      "No. The checkout is a frontend demonstration. It does not render card number fields, collect card details, contact a payment provider, or submit a real order. Customer details entered during the demo stay in the browser tab and are not sent anywhere.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Use the contact page for sample support hours, response expectations, and the demo message form. For a real store, this is also where you would find order support, returns help, and wholesale enquiries.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="SoleDistrict / Est. 2026"
        title="For the next step."
        breadcrumbs={[{ label: "About" }]}
        description="SoleDistrict is an independent sneaker concept built around considered design, everyday comfort, and the feeling of finding the right pair. This is its story, values, and practical store information."
      >
        <dl className="grid w-full max-w-sm grid-cols-3 gap-4 border border-border bg-surface p-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-semibold tracking-[-0.03em]">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      <section className="shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:pt-4">
            <p className="eyebrow text-muted">
              <span
                className="inline-block size-1.5 bg-foreground"
                aria-hidden="true"
              />
              Our story
            </p>
            <h2 className="headline mt-5 text-[clamp(2.2rem,5vw,3.6rem)] uppercase">
              A district
              <br />
              state of mind.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
              <p>
                SoleDistrict started with a simple frustration: too many shoes,
                too little point of view. We wanted a place where the edit felt
                as considered as the pairs themselves — where every shelf had a
                reason to exist.
              </p>
              <p>
                So we built a store around independent labels, clean
                silhouettes, and the kind of comfort that holds up after the
                commute, the meeting, and the walk home. Not a sneaker wall.
                A rotation with intent.
              </p>
              <p>
                The district is a mindset: curious, unhurried, and always
                looking one step ahead. The pairs change. The standard stays
                the same.
              </p>
            </div>

            <Link
              href="/shop"
              className="group mt-7 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent"
            >
              Explore the collection
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden bg-[#EFEEE9]">
              <ImageWithFallback
                src="/images/brand-story.jpg"
                alt="Person sitting on a city ledge wearing street sneakers"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-surface/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur sm:bottom-4 sm:left-4">
                District notes / Vol. 01
              </span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEEE9]">
              <ImageWithFallback
                src="/images/hero-street.jpg"
                alt="Editorial street-style sneaker scene"
                fill
                sizes="(max-width: 1024px) 50vw, 27vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEEE9]">
              <ImageWithFallback
                src="/images/campaign-color.jpg"
                alt="Colorful sneaker campaign still life"
                fill
                sizes="(max-width: 1024px) 50vw, 27vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-surface text-white">
        <div className="shell py-14 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr] lg:items-end lg:gap-16">
            <p className="eyebrow text-white/45">
              <span
                className="inline-block size-1.5 bg-accent"
                aria-hidden="true"
              />
              Our standard
            </p>
            <blockquote className="headline text-[clamp(1.9rem,4.5vw,3.4rem)] uppercase">
              Fewer, better pairs.
              <br />
              <span className="text-accent">Chosen with intent.</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="values" className="shell scroll-mt-28 py-16 sm:py-20 lg:scroll-mt-32">
        <SectionHeading
          eyebrow="What we stand for"
          title="Our values."
          description="A short list, deliberately. These are the filters every pair passes through before it reaches the district."
        />
        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {values.map((value) => (
            <article key={value.number} className="bg-surface p-6 sm:p-8">
              <span className="font-display text-xs font-semibold tracking-[0.12em] text-muted">
                Nº {value.number}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">
                {value.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="shipping-returns"
        className="scroll-mt-28 border-y border-border bg-surface lg:scroll-mt-32"
      >
        <div className="shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="The practical part"
            title="Shipping & returns."
            description="Sample terms for this demo storefront. They are written to show how the store would communicate, not to form a real commercial offer."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-6">
            <article className="border border-border p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center bg-background">
                  <Truck className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  Shipping
                </h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    <strong className="font-medium text-foreground">
                      Free standard shipping
                    </strong>{" "}
                    on sample orders over $100.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    Orders under $100 use a flat{" "}
                    <strong className="font-medium text-foreground">$8 estimate</strong>{" "}
                    at checkout.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    In a real store, orders would be prepared in 1–2 business
                    days and arrive within 3–7 business days.
                  </span>
                </li>
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-[10px] leading-relaxed text-muted">
                This demo does not fulfill, ship, or track orders. Shipping
                figures are illustrative estimates only.
              </p>
            </article>

            <article className="border border-border p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center bg-background">
                  <RefreshCcw className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  Returns
                </h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    <strong className="font-medium text-foreground">
                      30-day window
                    </strong>{" "}
                    from delivery for a return or exchange.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    Pairs must be unworn, in original condition, and returned
                    with their packaging.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 bg-foreground" aria-hidden="true" />
                  <span>
                    Start a return by emailing{" "}
                    <a
                      href="mailto:hello@soledistrict.com?subject=Demo%20return%20enquiry"
                      className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
                    >
                      hello@soledistrict.com
                    </a>
                    .
                  </span>
                </li>
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-[10px] leading-relaxed text-muted">
                This is sample policy copy. No real returns, refunds, or
                exchanges can be processed through this demonstration.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="size-guide" className="shell scroll-mt-28 py-16 sm:py-20 lg:scroll-mt-32">
        <SectionHeading
          eyebrow="Find your fit"
          title="Size guide."
          description="Our sample catalog uses US sizing. Use the chart as a starting point, then check the product page fit note for pair-specific guidance."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <Ruler className="size-5 text-muted" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                How to measure
              </h3>
            </div>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <li className="flex gap-4">
                <span className="font-display text-xs font-semibold text-foreground">
                  01
                </span>
                <span>
                  Stand on a piece of paper with your heel against a wall. Wear
                  the socks you plan to use with the pair.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-xs font-semibold text-foreground">
                  02
                </span>
                <span>
                  Mark the longest toe and measure from the wall to the mark in
                  centimetres. Repeat for both feet and use the longer one.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-xs font-semibold text-foreground">
                  03
                </span>
                <span>
                  Match the measurement to the chart. If you are between sizes,
                  choose the larger size for an easier fit.
                </span>
              </li>
            </ol>
            <p className="mt-6 border-t border-border pt-4 text-[10px] leading-relaxed text-muted">
              Measurements are approximate. Sizing can vary by label and
              silhouette; product pages note when a pair runs small or large.
            </p>
          </div>

          <div className="overflow-x-auto border border-border bg-surface">
            <table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">
                Sneaker size conversions for US, UK, EU, and foot length
              </caption>
              <thead>
                <tr className="border-b border-border bg-background">
                  {["US", "UK", "EU", "Foot length (cm)"].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((row) => (
                  <tr
                    key={row.us}
                    className="border-b border-border last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-sm font-semibold"
                    >
                      {row.us}
                    </th>
                    <td className="px-4 py-3 text-muted">{row.uk}</td>
                    <td className="px-4 py-3 text-muted">{row.eu}</td>
                    <td className="px-4 py-3 text-muted">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-28 border-t border-border bg-surface lg:scroll-mt-32"
      >
        <div className="shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="Good questions"
            title="FAQ."
            description="The short answers to the things people usually want to know before they browse."
          />

          <div className="mt-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-border py-5 [&[open]_summary_svg]:rotate-180"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden sm:text-[15px]">
                  {faq.question}
                  <ChevronDown
                    className="size-4 shrink-0 text-muted transition-transform duration-300"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-border bg-background p-5 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Still have a question?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Visit the contact page for sample support hours, response
                  expectations, and the demo message form.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="btn btn-outline w-full shrink-0 sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <div className="relative overflow-hidden bg-accent px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-foreground/60">
                <span
                  className="inline-block size-1.5 bg-foreground"
                  aria-hidden="true"
                />
                Next step
              </p>
              <h2 className="headline mt-4 text-[clamp(2rem,5vw,3.4rem)] uppercase">
                Find your pair.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
                Browse the full edit and take your time. The right pair is
                usually the one you keep coming back to.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:pb-1">
              <Link href="/shop" className="btn btn-primary">
                Shop all sneakers
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/new-arrivals" className="btn btn-outline border-foreground/40">
                New arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
