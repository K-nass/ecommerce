import { apiFetch } from "@/shared/lib/api";
import type { Profile } from "../types";

export const profileService = {
  getProfile: async (lang?: string): Promise<Profile> => {
    return apiFetch<Profile>("/me", { lang });
  },
};
