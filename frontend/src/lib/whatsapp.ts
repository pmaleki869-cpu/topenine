/**
 * WhatsApp helpers — pre-filled message links for TopEngine UAE.
 * Includes vehicle context when available.
 */

const PHONE = "971551521264";

export function whatsappProductLink(
  productName: string,
  sku?: string,
  vehicleInfo?: string
): string {
  const skuPart = sku ? ` (SKU: ${sku})` : "";
  const vehiclePart = vehicleInfo ? `\nMy vehicle: ${vehicleInfo}` : "";
  const message = encodeURIComponent(
    `Hi, I'm interested in ${productName}${skuPart}. Is this available?${vehiclePart}`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

export function whatsappBulkQuoteLink(items: string[]): string {
  const list = items.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
  const message = encodeURIComponent(
    `Hi, I'd like a quote for the following parts:\n${list}`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

export function whatsappGeneralLink(vehicleInfo?: string): string {
  const vehiclePart = vehicleInfo
    ? ` My vehicle: ${vehicleInfo}.`
    : "";
  const message = encodeURIComponent(
    `Hi, I need help finding engine parts.${vehiclePart} Can you assist?`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}

export function whatsappVehicleLink(
  makeName: string,
  modelName: string,
  engineCode?: string
): string {
  const enginePart = engineCode ? ` (${engineCode})` : "";
  const message = encodeURIComponent(
    `Hi, I'm looking for parts for a ${makeName} ${modelName}${enginePart}.`
  );
  return `https://wa.me/${PHONE}?text=${message}`;
}
