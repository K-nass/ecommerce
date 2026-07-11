import { apiFetch } from "@/shared/lib/api";
import type { SettingResource } from "../types";

export const settingsService = {
  getSettings: async (lang?: string): Promise<SettingResource> => {
    return apiFetch<SettingResource>(
      "/general/settings",
      { channel: false, lang, next: { revalidate: 300 } },
    );
  },
};
