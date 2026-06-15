import type { ApiProduct, ProductItem } from "./types";

export function toProductItem(p: ApiProduct): ProductItem {
  const originalImage =
    Object.values(p.image.original)[0] || p.image.thumbnail;

  return {
    id: p.id,
    image: originalImage,
    title: p.name,
    price: p.current_price ?? p.price_after_discount ?? p.price,
    originalPrice: p.price,
    inStock: p.quantity > 0 ? p.quantity : 0,
    stockQuantity: p.quantity,
  };
}
