import { apiFetch } from "@/shared/lib/api";
import type { ContactFormData, ContactResponse } from "../types";

export const contactService = {
  submit: async (data: ContactFormData, lang?: string): Promise<ContactResponse> => {
    return apiFetch<ContactResponse>("/contact-us", {
      method: "POST",
      body: JSON.stringify(data),
      lang,
      channel: false,
    });
  },
};
