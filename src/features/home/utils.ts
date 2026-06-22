import type { ApiProduct, ProductItem } from "./types";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toProductItem(p: ApiProduct): ProductItem {
  const originalImage =
    Object.values(p.image.original)[0] || p.image.thumbnail;

  return {
    id: p.id,
    slug: p.slug ?? `${slugify(p.name)}-${p.id}`,
    image: originalImage,
    title: p.name,
    price: p.current_price ?? p.price_after_discount ?? p.price,
    originalPrice: p.price,
    inStock: p.quantity > 0 ? p.quantity : 0,
    stockQuantity: p.quantity,
    hasVariants: p.has_variants,
  };
}
