import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type {
  CartListResponse,
  CartApiCart,
  CartItem,
  AddBulkPayload,
} from "../types";

export const cartService = {
  getCart: async (): Promise<CartApiCart | null> => {
    const response = await apiFetch<CartListResponse>("/cart");
    return response.data?.[0] ?? null;
  },

  addItem: async (payload: {
    product_id: number;
    quantity: number;
    product_variant_id?: number | null;
  }): Promise<CartItem> => {
    const response = await apiFetch<ApiResponse<CartItem>>("/cart", {
      method: "POST",
      body: JSON.stringify({ item: payload }),
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
    await apiFetch<ApiResponse<{ message: string }>>("/cart/delete-items", {
      method: "DELETE",
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
