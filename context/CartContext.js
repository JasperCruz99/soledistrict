"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  MAX_QUANTITY,
  SAMPLE_DISCOUNT,
  calculateTotals,
  makeCartKey,
} from "@/lib/cart";
import { createStoredStore, useHydrated } from "@/lib/usePersistentStore";

const EMPTY_ITEMS = [];
const CART_STORAGE_KEY = "soledistrict:cart";
const DISCOUNT_STORAGE_KEY = "soledistrict:discount";

function sanitizeItems(value) {
  if (!Array.isArray(value)) return EMPTY_ITEMS;
  return value.filter(
    (item) =>
      item &&
      typeof item.productId === "number" &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      item.quantity > 0
  );
}

function sanitizeDiscount(value) {
  return value && value.code === SAMPLE_DISCOUNT.code ? SAMPLE_DISCOUNT : null;
}

const cartStore = createStoredStore(CART_STORAGE_KEY, EMPTY_ITEMS, sanitizeItems);
const discountStore = createStoredStore(
  DISCOUNT_STORAGE_KEY,
  null,
  sanitizeDiscount
);

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const discount = useSyncExternalStore(
    discountStore.subscribe,
    discountStore.getSnapshot,
    discountStore.getServerSnapshot
  );
  const hydrated = useHydrated();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((entry, quantity) => {
    const requested = quantity ?? entry.quantity ?? 1;
    const amount = Math.max(1, Math.min(MAX_QUANTITY, Number(requested) || 1));
    const key = makeCartKey(entry.productId, entry.size, entry.color);

    cartStore.set((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Math.min(MAX_QUANTITY, item.quantity + amount),
              }
            : item
        );
      }
      return [...current, { ...entry, key, quantity: amount }];
    });

    return key;
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    const amount = Math.max(1, Math.min(MAX_QUANTITY, Number(quantity) || 1));
    cartStore.set((current) =>
      current.map((item) =>
        item.key === key ? { ...item, quantity: amount } : item
      )
    );
  }, []);

  const removeItem = useCallback((key) => {
    cartStore.set((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    cartStore.set(EMPTY_ITEMS);
    discountStore.set(null);
  }, []);

  const applyDiscount = useCallback((code) => {
    const normalized = String(code ?? "").trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: "Enter a discount code to continue." };
    }
    if (normalized !== SAMPLE_DISCOUNT.code) {
      return {
        success: false,
        message: "That code is not valid. Try the sample code SOLE10.",
      };
    }
    discountStore.set(SAMPLE_DISCOUNT);
    return {
      success: true,
      message: `Sample code applied — ${SAMPLE_DISCOUNT.percent}% off.`,
    };
  }, []);

  const removeDiscount = useCallback(() => discountStore.set(null), []);
  const openCart = useCallback(() => setDrawerOpen(true), []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);

  const totals = useMemo(() => calculateTotals(items, discount), [items, discount]);

  const value = useMemo(
    () => ({
      items,
      count: totals.itemCount,
      totals,
      discount,
      hydrated,
      drawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyDiscount,
      removeDiscount,
      openCart,
      closeCart,
    }),
    [
      items,
      totals,
      discount,
      hydrated,
      drawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyDiscount,
      removeDiscount,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
