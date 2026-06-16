import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type { ProductDetail } from "../types";

export const productService = {
  getProduct: async (id: number): Promise<ProductDetail> => {
    const response = await apiFetch<ApiResponse<ProductDetail>>(`/general/products/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<ProductDetail> => {
    const response = await apiFetch<ApiResponse<ProductDetail>>(
      `/general/products/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );
    return response.data;
  },
};
