export const SAMPLE_DISCOUNT = { code: "SOLE10", percent: 10 };
export const FREE_SHIPPING_THRESHOLD = 100;
export const FLAT_SHIPPING = 8;
export const MAX_QUANTITY = 10;

export function makeCartKey(productId, size, color) {
  return [productId, size ?? "one-size", color ?? "default"].join("::");
}

export function buildCartItem(product, { size = null, color, quantity = 1 } = {}) {
  const colorName = color ?? product.colors?.[0]?.name ?? "Default";
  const colorOption = product.colors?.find((option) => option.name === colorName);

  return {
    productId: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    price: product.price,
    image: product.images?.[0] ?? "",
    size: size == null || size === "" ? null : String(size),
    color: colorName,
    colorHex: colorOption?.hex ?? null,
    quantity: Math.max(1, Math.min(MAX_QUANTITY, Number(quantity) || 1)),
  };
}

export function calculateTotals(items, discount) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const discountAmount = discount
    ? Math.round(subtotal * (discount.percent / 100) * 100) / 100
    : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return { subtotal, itemCount, shipping, discountAmount, total };
}
