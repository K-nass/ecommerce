export interface PriceInfo {
  has_flash_sale: boolean;
  price_after_flash_sale: number | null;
  has_discount: boolean;
  price_after_discount: number | null;
  current_price: number;
  price: number;
}

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