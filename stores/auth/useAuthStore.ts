"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AUTH_TOKEN_STORAGE_KEY } from "@/lib/auth";
import { authService } from "@/services/auth";
import type { AuthLoginData, LoginPayload, RegisterPayload } from "@/types";

type AuthState = {
  token: string | null;
  permissions: string[];
  role: string[];
  emailVerified: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setAuthData: (authData: AuthLoginData) => void;
  clearAuth: () => void;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

function writeTokenToStorage(token: string | null) {
  if (typeof window === "undefined") return;

  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

const initialState = {
  token: null,
  permissions: [],
  role: [],
  emailVerified: false,
  isAuthenticated: false,
  loading: false,
  error: null as string | null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuthData: (authData) => {
        writeTokenToStorage(authData.token);
        set({
          token: authData.token,
          permissions: authData.permissions ?? [],
          role: authData.role ?? [],
          emailVerified: authData.email_verified ?? false,
          isAuthenticated: Boolean(authData.token),
          error: null,
        });
      },
      clearAuth: () => {
        writeTokenToStorage(null);
        set({ ...initialState });
      },
      login: async (payload) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(payload);
          if (!response.success) {
            throw new Error(response.message || "Unable to login.");
          }

          writeTokenToStorage(response.data.token);
          set({
            token: response.data.token,
            permissions: response.data.permissions ?? [],
            role: response.data.role ?? [],
            emailVerified: response.data.email_verified ?? false,
            isAuthenticated: Boolean(response.data.token),
            loading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login request failed.";
          set({ loading: false, error: message });
          throw error;
        }
      },
      register: async (payload) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.register(payload);
          if (!response.success) {
            throw new Error(response.message || "Unable to register.");
          }

          const data = response.data as AuthLoginData;
          if (data?.token) {
            writeTokenToStorage(data.token);
            set({
              token: data.token,
              permissions: data.permissions ?? [],
              role: data.role ?? [],
              emailVerified: data.email_verified ?? false,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return;
          }

          set({ loading: false, error: null });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Register request failed.";
          set({ loading: false, error: message });
          throw error;
        }
      },
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await authService.logout();
        } finally {
          writeTokenToStorage(null);
          set({ ...initialState });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        permissions: state.permissions,
        role: state.role,
        emailVerified: state.emailVerified,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          writeTokenToStorage(state.token);
        }
      },
    },
  ),
);
