"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Info,
  Lock,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import DemoConfirmation from "./DemoConfirmation";
import { useCart } from "@/context/CartContext";
import { cn, isValidEmail } from "@/lib/utils";

const EMPTY_DETAILS = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "France",
  "Germany",
  "Netherlands",
  "Japan",
  "Singapore",
];

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / debit card",
    description: "Demo UI only — no card details collected.",
    icon: CreditCard,
  },
  {
    id: "cod",
    label: "Cash on delivery",
    description: "Demo option — nothing is scheduled or charged.",
    icon: Banknote,
  },
];

const FIELD_IDS = {
  fullName: "checkout-full-name",
  email: "checkout-email",
  phone: "checkout-phone",
  address: "checkout-address",
  city: "checkout-city",
  state: "checkout-state",
  postalCode: "checkout-postal-code",
  country: "checkout-country",
};

function validateDetails(values) {
  const nextErrors = {};
  const digits = values.phone.replace(/\D/g, "");

  if (values.fullName.trim().length < 2) {
    nextErrors.fullName = "Enter your full name.";
  }
  if (!values.email.trim()) {
    nextErrors.email = "Enter your email address.";
  } else if (!isValidEmail(values.email)) {
    nextErrors.email = "Enter a valid email, like you@example.com.";
  }
  if (!values.phone.trim()) {
    nextErrors.phone = "Enter your phone number.";
  } else if (digits.length < 7 || digits.length > 15) {
    nextErrors.phone = "Enter a phone number with 7 to 15 digits.";
  }
  if (values.address.trim().length < 5) {
    nextErrors.address = "Enter your street address.";
  }
  if (values.city.trim().length < 2) {
    nextErrors.city = "Enter your city.";
  }
  if (values.state.trim().length < 2) {
    nextErrors.state = "Enter your state or province.";
  }
  if (values.postalCode.trim().length < 3) {
    nextErrors.postalCode = "Enter your ZIP or postal code.";
  }
  if (!values.country) {
    nextErrors.country = "Select your country.";
  }

  return nextErrors;
}

function scrollToTop() {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function TextField({ id, label, error, hint, className = "", ...inputProps }) {
  const hintId = hint ? `${id}-hint` : null;
  const errorId = error ? `${id}-error` : null;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[10px] font-semibold uppercase tracking-[0.12em]"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn("field mt-1.5", error && "border-error")}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[11px] font-medium text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[10px] leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({ id, label, error, children, className = "", ...selectProps }) {
  const errorId = error ? `${id}-error` : null;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[10px] font-semibold uppercase tracking-[0.12em]"
      >
        {label}
      </label>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId || undefined}
        className={cn("field mt-1.5", error && "border-error")}
        {...selectProps}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[11px] font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StepIndicator({ current }) {
  const steps = ["Details", "Review", "Confirm"];

  return (
    <ol
      className="grid grid-cols-3 gap-2 border-b border-border pb-5"
      aria-label="Checkout progress"
    >
      {steps.map((label, index) => {
        const isComplete = index < current;
        const isCurrent = index === current;
        return (
          <li
            key={label}
            aria-current={isCurrent ? "step" : undefined}
            className="flex items-center gap-2.5"
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full border text-[10px] font-semibold",
                isComplete && "border-accent bg-accent text-foreground",
                isCurrent && "border-foreground bg-foreground text-white",
                !isComplete && !isCurrent && "border-border text-muted"
              )}
              aria-hidden="true"
            >
              {isComplete ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.12em]",
                isCurrent ? "text-foreground" : "text-muted"
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutClient() {
  const { items, totals, discount, hydrated, clearCart } = useCart();
  const [step, setStep] = useState("details");
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("card");
  const [acknowledged, setAcknowledged] = useState(false);
  const [ackError, setAckError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const selectedPayment = PAYMENT_METHODS.find((method) => method.id === payment);

  function updateDetail(field, value) {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function focusFirstInvalid(nextErrors) {
    const firstInvalid = Object.keys(nextErrors)[0];
    if (!firstInvalid) return;
    requestAnimationFrame(() => {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
    });
  }

  function handleReview(event) {
    event.preventDefault();
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors);
      return;
    }

    setAckError("");
    setStep("review");
    scrollToTop();
  }

  function handlePlaceOrder() {
    if (!acknowledged) {
      setAckError("Please confirm that you understand this is a demo.");
      return;
    }

    const snapshot = {
      reference: `SD-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      items: items.map((item) => ({ ...item })),
      totals: { ...totals },
      discount: discount ? { ...discount } : null,
      details: { ...details },
      paymentLabel: selectedPayment?.label ?? "Demo payment",
    };

    setConfirmation(snapshot);
    setStep("confirmation");
    clearCart();
    scrollToTop();
  }

  function handleEditDetails() {
    setStep("details");
    setAckError("");
    scrollToTop();
  }

  if (step === "confirmation" && confirmation) {
    return <DemoConfirmation confirmation={confirmation} />;
  }

  if (!hydrated) {
    return (
      <div className="shell py-10 sm:py-12">
        <div className="h-10 w-full max-w-md animate-pulse bg-[#EAE9E4]" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="h-[620px] animate-pulse border border-border bg-surface" />
          <div className="h-[420px] animate-pulse border border-border bg-surface" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-col items-center border border-border bg-surface px-6 py-16 text-center sm:py-24">
          <span className="grid size-16 place-items-center rounded-full bg-background">
            <ShoppingBag className="size-7 text-muted" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
            Your bag is empty.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Add a pair to your bag before starting the demo checkout. No
            account, payment, or real order is needed.
          </p>
          <Link href="/shop" className="btn btn-primary mt-6">
            Shop all sneakers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <StepIndicator current={step === "details" ? 0 : 1} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10">
          <div>
            {step === "details" ? (
              <form onSubmit={handleReview} noValidate>
                <div className="border border-border bg-surface p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                        Customer information
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        All fields are required. This demo does not save or send
                        your information.
                      </p>
                    </div>
                    <span className="border border-border bg-background px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Demo form
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <TextField
                      id={FIELD_IDS.fullName}
                      label="Full name"
                      value={details.fullName}
                      onChange={(event) => updateDetail("fullName", event.target.value)}
                      error={errors.fullName}
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      className="sm:col-span-2"
                      required
                    />
                    <TextField
                      id={FIELD_IDS.email}
                      label="Email"
                      type="email"
                      inputMode="email"
                      value={details.email}
                      onChange={(event) => updateDetail("email", event.target.value)}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                    />
                    <TextField
                      id={FIELD_IDS.phone}
                      label="Phone"
                      type="tel"
                      inputMode="tel"
                      value={details.phone}
                      onChange={(event) => updateDetail("phone", event.target.value)}
                      error={errors.phone}
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      required
                    />
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Shipping information
                    </h3>
                    <span className="h-px flex-1 bg-border" aria-hidden="true" />
                  </div>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <TextField
                      id={FIELD_IDS.address}
                      label="Street address"
                      value={details.address}
                      onChange={(event) => updateDetail("address", event.target.value)}
                      error={errors.address}
                      autoComplete="address-line1"
                      placeholder="123 District Street"
                      className="sm:col-span-2"
                      required
                    />
                    <TextField
                      id={FIELD_IDS.city}
                      label="City"
                      value={details.city}
                      onChange={(event) => updateDetail("city", event.target.value)}
                      error={errors.city}
                      autoComplete="address-level2"
                      placeholder="Portland"
                      required
                    />
                    <TextField
                      id={FIELD_IDS.state}
                      label="State / Province"
                      value={details.state}
                      onChange={(event) => updateDetail("state", event.target.value)}
                      error={errors.state}
                      autoComplete="address-level1"
                      placeholder="Oregon"
                      required
                    />
                    <TextField
                      id={FIELD_IDS.postalCode}
                      label="ZIP / Postal code"
                      value={details.postalCode}
                      onChange={(event) => updateDetail("postalCode", event.target.value)}
                      error={errors.postalCode}
                      autoComplete="postal-code"
                      placeholder="97205"
                      required
                    />
                    <SelectField
                      id={FIELD_IDS.country}
                      label="Country"
                      value={details.country}
                      onChange={(event) => updateDetail("country", event.target.value)}
                      error={errors.country}
                      autoComplete="country-name"
                      required
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                </div>

                <fieldset className="mt-5 border border-border bg-surface p-5 sm:p-7">
                  <legend className="sr-only">Payment method</legend>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                        Payment method
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        Choose how a real checkout would be paid. Every option is
                        simulated.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                      <Lock className="size-3" aria-hidden="true" />
                      No payment
                    </span>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon;
                      const selected = payment === method.id;
                      return (
                        <label
                          key={method.id}
                          className={cn(
                            "relative flex cursor-pointer gap-3 border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-foreground focus-within:ring-offset-2",
                            selected
                              ? "border-foreground bg-background"
                              : "border-border bg-surface hover:border-foreground/45"
                          )}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selected}
                            onChange={() => setPayment(method.id)}
                            className="sr-only"
                          />
                          <span
                            className={cn(
                              "mt-0.5 grid size-8 shrink-0 place-items-center",
                              selected
                                ? "bg-foreground text-white"
                                : "bg-background text-muted"
                            )}
                            aria-hidden="true"
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="text-xs font-semibold uppercase tracking-[0.08em]">
                                {method.label}
                              </span>
                              <span
                                className={cn(
                                  "grid size-4 shrink-0 place-items-center rounded-full border",
                                  selected
                                    ? "border-foreground bg-foreground text-white"
                                    : "border-border"
                                )}
                                aria-hidden="true"
                              >
                                {selected ? <Check className="size-2.5" /> : null}
                              </span>
                            </span>
                            <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                              {method.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex gap-3 border border-border bg-background p-4">
                    <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
                    <p className="text-[11px] leading-relaxed text-muted">
                      {payment === "card"
                        ? "Card fields are intentionally disabled. This build never collects card numbers, expiry dates, or security codes, and does not contact a payment provider."
                        : "Cash on delivery is simulated. Nothing will be scheduled, shipped, or charged after this demo."}
                    </p>
                  </div>
                </fieldset>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="/cart" className="btn btn-outline w-full sm:w-auto">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Back to bag
                  </Link>
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Review demo order
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="border border-border bg-surface">
                  <div className="border-b border-border px-5 py-5 sm:px-7">
                    <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                      Review your demo order
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Check the details below. Nothing will be submitted when you
                      place this demo order.
                    </p>
                  </div>

                  <div className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-7">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                          Contact
                        </h3>
                        <button
                          type="button"
                          onClick={handleEditDetails}
                          className="text-[10px] font-semibold uppercase tracking-[0.1em] underline-offset-4 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="mt-2.5 text-sm leading-relaxed">
                        <p className="font-medium">{details.fullName}</p>
                        <p className="text-muted">{details.email}</p>
                        <p className="text-muted">{details.phone}</p>
                      </div>
                    </div>

                    <div className="sm:border-l sm:border-border sm:pl-6">
                      <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Ship to
                      </h3>
                      <address className="mt-2.5 text-sm not-italic leading-relaxed">
                        <span className="block text-muted">{details.address}</span>
                        <span className="block text-muted">
                          {details.city}, {details.state} {details.postalCode}
                        </span>
                        <span className="block text-muted">{details.country}</span>
                      </address>
                    </div>
                  </div>

                  <div className="mx-5 border-t border-border py-5 sm:mx-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                          Payment
                        </h3>
                        <p className="mt-2 text-sm font-medium">
                          {selectedPayment?.label}
                        </p>
                      </div>
                      <span className="border border-border bg-background px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                        Demo only
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border border-border bg-surface p-5">
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      checked={acknowledged}
                      onChange={(event) => {
                        setAcknowledged(event.target.checked);
                        if (event.target.checked) setAckError("");
                      }}
                      className="mt-0.5 size-4 shrink-0 accent-[#171717]"
                    />
                    <span className="text-xs leading-relaxed text-muted">
                      I understand this is a frontend demonstration. Placing the
                      demo order will not create a real order, collect payment, or
                      trigger shipping.
                    </span>
                  </label>
                  {ackError ? (
                    <p role="alert" className="mt-3 text-[11px] font-medium text-error">
                      {ackError}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleEditDetails}
                    className="btn btn-outline w-full sm:w-auto"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Edit details
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Place demo order
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <CheckoutOrderSummary
              items={items}
              totals={totals}
              discount={discount}
            />
            <div className="mt-3 flex items-start gap-2.5 border border-border bg-surface px-4 py-3.5">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
              <p className="text-[10px] leading-relaxed text-muted">
                Secure-feeling, not secure checkout: this is a frontend-only
                demonstration with no backend, payment processor, or stored
                customer data.
              </p>
            </div>
            <Link
              href="/cart"
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              <ArrowLeft className="size-3" aria-hidden="true" />
              Edit bag
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
