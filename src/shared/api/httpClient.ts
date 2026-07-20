const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type HttpClientOptions = RequestInit & {
  skipJsonContentType?: boolean;
  skipAuth?: boolean;
};

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  fieldErrors?: ApiFieldError[];
};

export class ApiError extends Error {
  status: number;
  data: ApiErrorResponse | null;

  constructor(message: string, status: number, data: ApiErrorResponse | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
};

const buildUrl = (endpoint: string) => {
  if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined.");
  }

  return `${BASE_URL}${endpoint}`;
};

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    return null;
  }

  return response.json();
};

export const httpClient = async <T>(
  endpoint: string,
  options: HttpClientOptions = {},
): Promise<T> => {
  const { skipJsonContentType, skipAuth, headers, body, ...rest } = options;

  const isFormData = body instanceof FormData;

  const token = localStorage.getItem("accessToken");
  const tokenType = localStorage.getItem("tokenType") || "Bearer";

  const requestHeaders: HeadersInit = {
    ...(!isFormData && !skipJsonContentType
      ? { "Content-Type": "application/json" }
      : {}),

    ...(token && !skipAuth
      ? { Authorization: `${tokenType} ${token}` }
      : {}),

    ...headers,
  };

  const response = await fetch(buildUrl(endpoint), {
    ...rest,
    headers: requestHeaders,
    body,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    const message =
      errorData?.message ?? `HTTP error: ${response.status}`;

    throw new ApiError(message, response.status, errorData);
  }

  return data as T;
};