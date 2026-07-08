import { apiFetch } from "@/shared/lib/api";
import type { NavbarMenu } from "../types";

export const navbarService = {
  getAll: async (lang: string): Promise<NavbarMenu[]> => {
    return apiFetch<NavbarMenu[]>(
      "/general/navbar",
      { lang, next: { revalidate: 300 } },
    );
  },
};
