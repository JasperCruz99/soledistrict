"use client";

import { useEffect } from "react";

let lockCount = 0;
let originalOverflow = "";

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [locked]);
}

export function useEscapeKey(active, handler) {
  useEffect(() => {
    if (!active) return;

    function onKeyDown(event) {
      if (event.key === "Escape") handler(event);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, handler]);
}

export function useFocusTrap(active, ref, initialFocusRef) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const node = ref.current;
    const previous = document.activeElement;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(node.querySelectorAll(selector)).filter(
        (element) => element.getAttribute("aria-hidden") !== "true"
      );

    const initial = initialFocusRef?.current ?? focusables()[0];
    initial?.focus({ preventScroll: true });

    function onKeyDown(event) {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [active, ref, initialFocusRef]);
}
