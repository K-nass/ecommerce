import { apiFetch } from "@/shared/lib/api";

export interface FastShippingStatus {
  enabled: boolean;
  available: boolean;
  fee: number;
  duration_minutes: number;
  opens_at: string | null;
  closes_at: string | null;
  available_again_at: string | null;
}

export const fastShippingService = {
  getStatus: async (lang?: string): Promise<FastShippingStatus> => {
    return apiFetch<FastShippingStatus>(
      "/general/fast-shipping/status",
      { channel: false, lang },
    );
  },
};
