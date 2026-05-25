import { AUTH_TOKEN_STORAGE_KEY } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;
  const authToken = getAuthToken();
  const headers = new Headers(options.headers);

  const hasFormDataBody =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!headers.has("Content-Type") && !hasFormDataBody) {
    headers.set("Content-Type", "application/json");
  }

  if (authToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;

    try {
      const errorData = (await response.json()) as { message?: string };
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // No-op fallback to status text.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
