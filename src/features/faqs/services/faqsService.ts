import { apiFetch } from "@/shared/lib/api";
import type { FaqResource } from "../types";

export const faqsService = {
  getAll: async (lang?: string): Promise<FaqResource[]> => {
    return apiFetch<FaqResource[]>(
      "/general/faqs",
      { channel: false, lang, next: { revalidate: 60 } },
    );
  },
};
