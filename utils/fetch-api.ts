import { Constants } from "@/utils/constants";

type BodyInit = RequestInit["body"] | Record<string, unknown>;

type HTTPHeaders = "Content-Type" | "Authorization" | "Accept";

type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  headers?: RequestInit["headers"] | Partial<Record<HTTPHeaders, string>>;
};

type ApiResponse<T> = {
  status?: number | string;
  success?: boolean;
  message?: string;
  stackTrace?: string | T;
  data?: T;
};

export const fetchApi = (() => {
  async function _request<T>(
    url: string,
    method: RequestInit["method"],
    body?: BodyInit | null,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    try {
      const headers = new Headers(options?.headers);
      if (!headers.has("Content-Type") && !(body instanceof FormData)) {
        headers.append("Content-Type", "application/json");
      }

      const resObj = await fetch(url, {
        method,
        body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
        headers,
        ...options,
      });

      const response = await resObj.json();
      return { ...response, data: response.data || response };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message:
          (error instanceof Error && error.message) ||
          "Something went wrong, try later.",
        ...(Constants.NODE_ENV === "development" && {
          stackTrace: (error instanceof Error && error.stack) || "",
        }),
      };
    }
  }

  function request<T>(
    method: RequestInit["method"],
    url: string,
    bodyOrOptions?: BodyInit | RequestOptions,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const body =
      bodyOrOptions &&
      typeof bodyOrOptions === "object" &&
      !("headers" in bodyOrOptions)
        ? bodyOrOptions
        : undefined;

    const requestOptions =
      bodyOrOptions &&
      typeof bodyOrOptions === "object" &&
      "headers" in bodyOrOptions
        ? (bodyOrOptions as RequestOptions)
        : options;

    return _request<T>(url, method, body, requestOptions);
  }

  return {
    get: <T>(url: string, options?: RequestOptions) =>
      _request<T>(url, "GET", null, options),

    post: <T>(
      url: string,
      bodyOrOptions?: BodyInit | RequestOptions,
      options?: RequestOptions,
    ) => request<T>("POST", url, bodyOrOptions, options),

    put: <T>(
      url: string,
      bodyOrOptions?: BodyInit | RequestOptions,
      options?: RequestOptions,
    ) => request<T>("PUT", url, bodyOrOptions, options),

    patch: <T>(
      url: string,
      bodyOrOptions?: BodyInit | RequestOptions,
      options?: RequestOptions,
    ) => request<T>("PATCH", url, bodyOrOptions, options),

    delete: <T>(
      url: string,
      bodyOrOptions?: BodyInit | RequestOptions,
      options?: RequestOptions,
    ) => request<T>("DELETE", url, bodyOrOptions, options),
  };
})();
