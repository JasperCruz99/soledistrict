"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { isValidEmail } from "@/lib/utils";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    []
  );

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      setMessage("Enter your email address to subscribe.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address, like you@example.com.");
      return;
    }

    setStatus("loading");
    setMessage("");
    timeoutRef.current = window.setTimeout(() => {
      setStatus("success");
      setMessage(
        "Demo submission received. No email was stored or added to a mailing list."
      );
      setEmail("");
    }, 700);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="max-w-lg">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error" || status === "success") {
                setStatus("idle");
                setMessage("");
              }
            }}
            aria-invalid={status === "error"}
            aria-describedby="newsletter-feedback newsletter-note"
            className="field min-h-[46px] flex-1 border-foreground/20 bg-surface"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary shrink-0"
          >
            {status === "loading" ? (
              <>
                Joining
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        <div
          id="newsletter-feedback"
          aria-live="polite"
          className="min-h-[24px]"
        >
          {message ? (
            <p
              className={`mt-2 flex items-start gap-1.5 text-xs font-medium ${
                status === "error" ? "text-error" : "text-foreground"
              }`}
            >
              {status === "success" ? (
                <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              ) : null}
              {message}
            </p>
          ) : null}
        </div>

        <p id="newsletter-note" className="mt-1 text-[10px] leading-relaxed text-foreground/55">
          Demo form only. No stored data, no recurring emails. Read the{" "}
          <Link
            href="/policies/privacy"
            className="font-medium text-foreground underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
