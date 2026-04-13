import { getPromo } from "./promo.js";

function round(amount) {
  return Math.round(amount * 100) / 100;
}

export function calculateOrderTotal(order) {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    throw new Error("Order must include at least one item");
  }

  const subtotal = order.items.reduce((sum, item) => {
    if (item.quantity <= 0 || item.unitPrice < 0) {
      throw new Error(`Invalid item: ${item.sku}`);
    }
    return sum + item.quantity * item.unitPrice;
  }, 0);

  const promo = getPromo(order.promoCode);
  let discount = 0;
  let shipping = subtotal >= 50 ? 0 : 7.5;

  if (promo?.type === "percent") {
    discount = subtotal * (promo.value / 100);
  }
  if (promo?.type === "shipping") {
    shipping = 0;
  }

  const taxBase = Math.max(0, subtotal - discount);
  const tax = taxBase * 0.25;
  const total = taxBase + tax + shipping;

  return {
    subtotal: round(subtotal),
    discount: round(discount),
    shipping: round(shipping),
    tax: round(tax),
    total: round(total)
  };
}

export function flagForManualReview(order, totals) {
  const hasLargeQuantity = order.items.some((item) => item.quantity >= 20);
  const hasHugeDiscount = totals.discount >= totals.subtotal * 0.4;
  return hasLargeQuantity || hasHugeDiscount || totals.total > 1000;
}
