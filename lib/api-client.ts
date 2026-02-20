import { ApiResponse } from "@/types";

/**
 * Validated wrapper around fetch that returns a typed ApiResponse.
 * @param url Request URL
 * @param options Fetch options
 */
export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    const response = await fetch(url, { ...options, headers });

    // Handle 204 No Content
    if (response.status === 204) {
      return { ok: true };
    }

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error: {
          code: json.error?.code || 'UNKNOWN_ERROR',
          message: json.error?.message || response.statusText,
          details: json.error?.details,
        },
      };
    }

    return { ok: true, data: json.data || json };
  } catch (err: any) {
    return {
      ok: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err.message || "Network request failed",
      },
    };
  }
}

/**
 * Helper to simulate delay in mock APIs
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
