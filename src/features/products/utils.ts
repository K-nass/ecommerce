import type { ProductDetail } from "./types";

export function extractIdFromSlug(slug: string): number | null {
  const parts = slug.split("-");
  const last = parts[parts.length - 1];
  const id = Number(last);
  return Number.isNaN(id) ? null : id;
}

export function getDisplayPrice(product: ProductDetail): number {
  if (product.has_flash_sale && product.price_after_flash_sale != null) {
    return product.price_after_flash_sale;
  }
  if (product.has_discount && product.price_after_discount != null) {
    return product.price_after_discount;
  }
  return product.current_price;
}

export function getOriginalPrice(product: ProductDetail): number {
  return product.price;
}

export function getDiscountPercent(product: ProductDetail): number | null {
  const display = getDisplayPrice(product);
  const original = getOriginalPrice(product);
  if (original <= 0 || display >= original) return null;
  return Math.round(((original - display) / original) * 100);
}

export function getSortedImages(product: ProductDetail): string[] {
  const keys = Object.keys(product.images.original).sort(
    (a, b) => Number(a) - Number(b),
  );
  return keys.map((k) => product.images.original[k]);
}

export function getAverageRating(reviews: ProductDetail["reviews"]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getStockStatus(product: ProductDetail): {
  inStock: boolean;
  remaining: number;
} {
  const remaining = product.quantity - product.sold_quantity;
  return {
    inStock: product.in_stock === 1 && remaining > 0,
    remaining: Math.max(0, remaining),
  };
}
