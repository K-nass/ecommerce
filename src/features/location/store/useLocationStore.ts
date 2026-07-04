"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LocationCoords = {
  lat: number;
  lng: number;
};

type LocationState = {
  coords: LocationCoords | null;
  city: string | null;
  region: string | null;
  loading: boolean;
  permissionDenied: boolean;
  setLocation: (coords: LocationCoords, city: string, region: string) => void;
  setLoading: (loading: boolean) => void;
  setPermissionDenied: (denied: boolean) => void;
  clearLocation: () => void;
};

const initialState = {
  coords: null as LocationCoords | null,
  city: null as string | null,
  region: null as string | null,
  loading: false,
  permissionDenied: false,
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      ...initialState,
      setLocation: (coords, city, region) =>
        set({ coords, city, region, loading: false, permissionDenied: false }),
      setLoading: (loading) => set({ loading }),
      setPermissionDenied: (denied) => set({ permissionDenied: denied, loading: false }),
      clearLocation: () => set({ ...initialState }),
    }),
    {
      name: "location-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        coords: state.coords,
        city: state.city,
        region: state.region,
      }),
    },
  ),
);
