"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";
import { cn, isValidEmail } from "@/lib/utils";

const EMPTY_FORM = {
  name: "",
  email: "",
  topic: "",
  orderNumber: "",
  message: "",
};

const FIELD_IDS = {
  name: "contact-name",
  email: "contact-email",
  topic: "contact-topic",
  orderNumber: "contact-order-number",
  message: "contact-message",
};

const topics = [
  "Order support",
  "Product question",
  "Returns or exchanges",
  "Size help",
  "Wholesale or press",
  "Website feedback",
];

function validateForm(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email, like you@example.com.";
  }
  if (!values.topic) {
    errors.topic = "Choose the subject of your message.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Include a little more detail — at least 20 characters.";
  }

  return errors;
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[11px] font-medium text-error">
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    []
  );

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Check the highlighted fields before sending your message.");
      const firstError = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => {
        document.getElementById(FIELD_IDS[firstError])?.focus();
      });
      return;
    }

    setStatus("loading");
    setMessage("");
    timeoutRef.current = window.setTimeout(() => {
      setStatus("success");
      setMessage(
        "Demo message received. No message was sent, stored, or added to a support queue."
      );
      setValues(EMPTY_FORM);
      setErrors({});
    }, 800);
  }

  return (
    <div className="border border-border bg-surface">
      <div className="border-b border-border p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
              Send a message.
            </h2>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">
              Tell us what you need help with. The form is part of the demo and
              does not send anything.
            </p>
          </div>
          <span className="border border-border bg-background px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Demo form
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-7">
        {message ? (
          <div
            role={status === "error" ? "alert" : "status"}
            className={cn(
              "mb-6 flex gap-3 border p-4 text-xs leading-relaxed",
              status === "error"
                ? "border-error/30 bg-error/5 text-error"
                : "border-success/30 bg-success/5 text-foreground"
            )}
          >
            {status === "success" ? (
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            ) : null}
            <p>{message}</p>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={FIELD_IDS.name}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              Your name
            </label>
            <input
              id={FIELD_IDS.name}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              placeholder="Alex Morgan"
              className={cn("field mt-1.5", errors.name && "border-error")}
              required
            />
            <FieldError id="contact-name-error">{errors.name}</FieldError>
          </div>

          <div>
            <label
              htmlFor={FIELD_IDS.email}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              Email
            </label>
            <input
              id={FIELD_IDS.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              placeholder="you@example.com"
              className={cn("field mt-1.5", errors.email && "border-error")}
              required
            />
            <FieldError id="contact-email-error">{errors.email}</FieldError>
          </div>

          <div>
            <label
              htmlFor={FIELD_IDS.topic}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              What is this about?
            </label>
            <select
              id={FIELD_IDS.topic}
              name="topic"
              value={values.topic}
              onChange={(event) => updateField("topic", event.target.value)}
              aria-invalid={errors.topic ? "true" : undefined}
              aria-describedby={errors.topic ? "contact-topic-error" : undefined}
              className={cn("field mt-1.5", errors.topic && "border-error")}
              required
            >
              <option value="">Choose a subject</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <FieldError id="contact-topic-error">{errors.topic}</FieldError>
          </div>

          <div>
            <label
              htmlFor={FIELD_IDS.orderNumber}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              Order number{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                (optional)
              </span>
            </label>
            <input
              id={FIELD_IDS.orderNumber}
              name="orderNumber"
              type="text"
              value={values.orderNumber}
              onChange={(event) => updateField("orderNumber", event.target.value)}
              placeholder="SD-00000"
              className="field mt-1.5"
              autoComplete="off"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={FIELD_IDS.message}
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              Message
            </label>
            <textarea
              id={FIELD_IDS.message}
              name="message"
              rows={6}
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : "contact-message-hint"
              }
              maxLength={800}
              placeholder="Share the product, page, or question you need help with."
              className={cn(
                "field mt-1.5 min-h-[150px] resize-y",
                errors.message && "border-error"
              )}
              required
            />
            <div className="flex items-center justify-between gap-3">
              <FieldError id="contact-message-error">{errors.message}</FieldError>
              <p
                id="contact-message-hint"
                className="ml-auto mt-1.5 text-[10px] text-muted"
              >
                {values.message.length}/800
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[10px] leading-relaxed text-muted">
            Demo form only. Nothing is sent or stored. Read the{" "}
            <Link
              href="/policies/privacy"
              className="font-medium text-foreground underline underline-offset-4"
            >
              privacy policy
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary shrink-0"
          >
            {status === "loading" ? (
              <>
                Sending
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              </>
            ) : (
              <>
                Send message
                <Send className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
