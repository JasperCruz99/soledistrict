import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <section id="newsletter" className="shell scroll-mt-28 pb-16 sm:pb-20 lg:pb-24">
      <div className="reveal relative overflow-hidden bg-accent px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-foreground/70">
              <span className="inline-block size-1.5 bg-foreground" aria-hidden="true" />
              Newsletter
            </p>
            <h2 className="headline mt-4 text-[clamp(2.1rem,5vw,3.75rem)] uppercase">
              Get first
              <br />
              access.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
              Be the first to discover new releases, exclusive drops, and
              special offers.
            </p>
          </div>
          <NewsletterForm />
        </div>
        <span
          className="pointer-events-none absolute -right-10 -top-14 font-display text-[180px] font-bold leading-none text-foreground/[0.05] sm:text-[240px]"
          aria-hidden="true"
        >
          ✳
        </span>
      </div>
    </section>
  );
}
