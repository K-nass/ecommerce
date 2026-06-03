import { AUTH_TOKEN_STORAGE_KEY } from "@/shared/constants/storageKeys";

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

  const enableLogs = process.env.NEXT_PUBLIC_XHR_LOGS === "true";
  const method = (options.method ?? "GET").toUpperCase();
  const start = Date.now();

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    if (enableLogs) {
      console.error(`❌ ${method} ${url} - network error`, err?.message ?? err);
    }
    throw err;
  }

  const duration = Date.now() - start;

  let parsedBody: any = null;
  try {
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      parsedBody = await response.clone().json();
    } else {
      parsedBody = await response.clone().text();
    }
  } catch {
    parsedBody = "<unreadable>";
  }

  if (response.ok) {
    if (enableLogs) {
      console.log(`✅ ${method} ${url} ${response.status} ${duration}ms`, parsedBody);
    }
    return parsedBody as T;
  } else {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;

    if (parsedBody && typeof parsedBody === "object" && parsedBody.message) {
      errorMessage = parsedBody.message;
    } else if (typeof parsedBody === "string" && parsedBody.length) {
      errorMessage = parsedBody;
    }

    if (enableLogs) {
      console.error(`❌ ${method} ${url} ${response.status} ${duration}ms`, {
        errorMessage,
        response: parsedBody,
      });
    }

    throw new Error(errorMessage);
  }
}
