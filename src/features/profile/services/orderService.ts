import { apiFetch } from "@/shared/lib/api";
import type { PaginatedData } from "@/shared/types";
import type { Order } from "../types";

export const orderService = {
  getAll: async (lang?: string): Promise<PaginatedData<Order>> => {
    return apiFetch<PaginatedData<Order>>("/general/orders", { lang });
  },
};
