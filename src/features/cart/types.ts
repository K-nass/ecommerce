export interface CartItemProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  current_price: number;
  price_after_discount: number | null;
  price_after_flash_sale: number | null;
  has_flash_sale: boolean;
  has_discount: boolean;
  discount_type: string | null;
  discount_amount: number | null;
  image: {
    thumbnail: string;
    original: Record<string, string>;
  };
  sku: string;
  in_stock: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  product: CartItemProduct;
  quantity: number;
  price: number;
  total: number;
}

export type DeliveryType = "scheduled" | "fast";

export interface GuestCartItem {
  product_id: number;
  product_variant_id?: number | null;
  quantity: number;
  deliveryType: DeliveryType;
}

export interface HydratedCartItem extends GuestCartItem {
  cartItemId?: number;
  name: string;
  image: string;
  price: number;
  current_price: number;
  slug: string;
  sku: string;
  in_stock: number;
  stock_quantity: number;
}

export interface AddBulkPayload {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

// --- API response types matching the actual /cart endpoint ---

export interface CartApiProduct {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
}

export interface CartApiItem {
  id: number;
  product_variant_id?: number | null;
  quantity: number;
  price: string;
  total_price: string;
  attributes: string | null;
  product: CartApiProduct;
}

export interface CartApiCart {
  id: number;
  user_id: number;
  status: string;
  reserved_at: string;
  expires_at: string;
  total_items: number;
  total_quantity: number;
  total_price: number;
  items: CartApiItem[];
}
