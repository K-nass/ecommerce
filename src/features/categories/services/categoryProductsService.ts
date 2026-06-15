import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type {
  CategoryFilters,
  CategoryProduct,
  CategoryProductsResponse,
  SubCategory,
} from "../types";

export async function getCategoryPageData(
  slug: string,
  locale: string,
  searchParams?: Record<string, string | string[] | undefined>,
): Promise<{ products: CategoryProduct[]; filters: CategoryFilters }> {
  const params = new URLSearchParams();
  params.append("category", slug);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          params.append(key, value.join(","));
        } else {
          params.append(key, value);
        }
      }
    });
  }

  const response = await apiFetch<ApiResponse<CategoryProductsResponse>>(
    `/general/products?${params.toString()}`,
    {
      headers: {
        "lang": locale,
      },
    },
  );
  return {
    products: response.data.data,
    filters: response.data.filters,
  };
}
