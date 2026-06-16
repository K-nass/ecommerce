import type { PriceInfo } from "./types";

export function getDisplayPrice(product: PriceInfo): number {
  if (product.has_flash_sale && product.price_after_flash_sale != null) {
    return product.price_after_flash_sale;
  }
  if (product.has_discount && product.price_after_discount != null) {
    return product.price_after_discount;
  }
  return product.current_price;
}

export function getOriginalPrice(product: PriceInfo): number {
  return product.price;
}

export function getDiscountPercent(product: PriceInfo): number | null {
  const display = getDisplayPrice(product);
  const original = getOriginalPrice(product);
  if (original <= 0 || display >= original) return null;
  return Math.round(((original - display) / original) * 100);
}

export function getSortedImages(product: { images: { original: Record<string, string> } }): string[] {
  const keys = Object.keys(product.images.original).sort(
    (a, b) => Number(a) - Number(b),
  );
  return keys.map((k) => product.images.original[k]);
}

export function getAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getStockStatus(product: { in_stock: number; quantity: number; sold_quantity: number }): {
  inStock: boolean;
  remaining: number;
} {
  const remaining = product.quantity - product.sold_quantity;
  return {
    inStock: product.in_stock === 1 && remaining > 0,
    remaining: Math.max(0, remaining),
  };
}