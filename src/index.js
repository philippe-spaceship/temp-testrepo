import { calculateOrderTotal, flagForManualReview } from "./pricing.js";
import { describePromo } from "./promo.js";

const sampleOrders = [
  {
    id: "ord-1001",
    customerTier: "new",
    promoCode: "WELCOME2026",
    items: [
      { sku: "TSHIRT-BLK-M", quantity: 2, unitPrice: 24.99 },
      { sku: "MUG-WHT-12OZ", quantity: 1, unitPrice: 12.5 }
    ]
  },
  {
    id: "ord-1002",
    customerTier: "vip",
    promoCode: "VIP25",
    items: [
      { sku: "HOODIE-RED-L", quantity: 3, unitPrice: 54 },
      { sku: "CAP-NVY", quantity: 5, unitPrice: 18 }
    ]
  },
  {
    id: "ord-1003",
    customerTier: "standard",
    promoCode: "SHIPFREE",
    items: [{ sku: "STICKER-PACK", quantity: 4, unitPrice: 3 }]
  }
];

for (const order of sampleOrders) {
  const totals = calculateOrderTotal(order);
  const reviewNeeded = flagForManualReview(order, totals);
  console.log({
    orderId: order.id,
    promoDescription: describePromo(order.promoCode),
    totals,
    reviewNeeded
  });
}
