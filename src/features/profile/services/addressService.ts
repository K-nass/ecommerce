import { apiFetch } from "@/shared/lib/api";
import type { Address, CreateAddressPayload, UpdateAddressPayload } from "../types";

export const addressService = {
  getAll: async (lang?: string): Promise<Address[]> => {
    return apiFetch<Address[]>("/address", { lang });
  },

  create: async (payload: CreateAddressPayload, lang?: string): Promise<Address> => {
    return apiFetch<Address>("/address", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  update: async (id: number, payload: UpdateAddressPayload, lang?: string): Promise<Address> => {
    return apiFetch<Address>(`/address/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      lang,
    });
  },

  delete: async (id: number, lang?: string): Promise<void> => {
    await apiFetch<null>(`/address/${id}`, {
      method: "DELETE",
      lang,
    });
  },
};
