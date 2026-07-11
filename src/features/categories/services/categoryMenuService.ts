import { apiFetch } from "@/shared/lib/api";

import type { CategoryMenuItem } from "../types";

export const categoryMenuService = {
  getMenu: async (lang: string, level: number = 3): Promise<CategoryMenuItem[]> => {
    return apiFetch<CategoryMenuItem[]>(
      `/general/categories-with-children?level=${level}`,
      { lang, next: { revalidate: 300 } },
    );
  },
};

