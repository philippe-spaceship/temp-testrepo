const KNOWN_PROMOS = {
  WELCOME10: { type: "percent", value: 10 },
  VIP25: { type: "percent", value: 25 },
  SHIPFREE: { type: "shipping", value: 7.5 }
};

export function getPromo(code) {
  if (!code) {
    return null;
  }
  return KNOWN_PROMOS[code.toUpperCase()] ?? null;
}

export function describePromo(code) {
  const promo = getPromo(code);
  if (!promo) {
    return "No promo applied";
  }
  if (promo.type === "percent") {
    return `${promo.value}% off order subtotal`;
  }
  return "Free shipping";
}
