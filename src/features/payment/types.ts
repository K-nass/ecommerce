export interface Address {
  city: string;
  state: string;
  country: string;
  street_address: string;
}

export interface FastCheckoutRequest {
  governorate_id: number;
  name: string;
  user_phone: string;
  user_email: string;
  address: Address;
  notes?: string;
  selected_promotion_id?: number | null;
  selected_gift_product_id?: number | null;
}

export interface FastCheckoutResponse {
  id: number;
  status: string;
  shipping_method: string;
  expected_delivery_at: string;
  fast_shipping_fee: number;
  total_price: number;
  created_at: string;
}

export interface CheckoutRequest {
  name: string;
  user_phone: string;
  user_email: string;
  address: Address;
  notes?: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface CheckoutFormData {
  name: string;
  user_phone: string;
  user_email: string;
  city: string;
  state: string;
  country: string;
  street_address: string;
  notes: string;
}
