"use client";

import { create } from "zustand";

type AuthModalMode = "login" | "register";

type AuthModalState = {
  isOpen: boolean;
  defaultMode: AuthModalMode;
  open: (mode?: AuthModalMode) => void;
  close: () => void;
};

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  defaultMode: "login",
  open: (mode = "login") => set({ isOpen: true, defaultMode: mode }),
  close: () => set({ isOpen: false }),
}));
