"use client";

import { useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "./storage";

const emptySubscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function createStoredStore(key, fallback, sanitize = (value) => value) {
  let cache = fallback;
  let initialized = false;
  const listeners = new Set();

  function read() {
    return sanitize(readStorage(key, fallback));
  }

  function getSnapshot() {
    if (!initialized) {
      cache = read();
      initialized = true;
    }
    return cache;
  }

  function getServerSnapshot() {
    return fallback;
  }

  function subscribe(listener) {
    listeners.add(listener);

    function onStorage(event) {
      if (event.key !== key) return;
      cache = read();
      listener();
    }

    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function set(value) {
    const next =
      typeof value === "function" ? value(cache) : value;
    cache = sanitize(next);
    writeStorage(key, cache);
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, set };
}
