import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type { CartResponse, CartItem, AddBulkPayload } from "../types";

export const cartService = {
  getCart: async (): Promise<CartResponse> => {
    const response = await apiFetch<ApiResponse<CartResponse>>("/cart");
    return response.data;
  },

  addItem: async (payload: {
    product_id: number;
    quantity: number;
  }): Promise<CartItem> => {
    const response = await apiFetch<ApiResponse<CartItem>>("/cart/add", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.data;
  },

  updateItem: async (payload: {
    item_id: number;
    quantity: number;
  }): Promise<CartItem> => {
    const response = await apiFetch<ApiResponse<CartItem>>("/cart/update", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.data;
  },

  removeItem: async (itemId: number): Promise<void> => {
    await apiFetch<ApiResponse<{ message: string }>>("/cart/remove", {
      method: "POST",
      body: JSON.stringify({ item_id: itemId }),
    });
  },

  addBulkToCart: async (payload: AddBulkPayload): Promise<void> => {
    await apiFetch<ApiResponse<{ message: string }>>("/cart/bulk-items", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};