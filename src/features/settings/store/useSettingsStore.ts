"use client";

import { create } from "zustand";
import { settingsService } from "../services/settingsService";
import type { SettingResource } from "../types";

const CACHE_TTL = 5 * 60 * 1000;

type SettingsState = {
  settings: SettingResource | null;
  lastFetched: number;
  loading: boolean;
  error: string | null;
  fetchSettings: (lang?: string) => Promise<void>;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: null,
  lastFetched: 0,
  loading: false,
  error: null,
  fetchSettings: async (lang?: string) => {
    const { lastFetched } = get();
    if (Date.now() - lastFetched < CACHE_TTL && get().settings) return;
    set({ loading: true, error: null });
    try {
      const settings = await settingsService.getSettings(lang);
      set({ settings, lastFetched: Date.now(), loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch settings";
      set({ error: msg, loading: false });
    }
  },
}));
