const BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const MAX_NETWORK_RETRIES = 2;
const NETWORK_RETRY_DELAY_MS = 1_000;

const SSR_REQUEST_TIMEOUT_MS = 3_000;

type HttpClientOptions = Omit<
  RequestInit,
  "body"
> & {
  body?: BodyInit | object | null;
  skipJsonContentType?: boolean;
  skipAuth?: boolean;
  authToken?: string | null;
};

type ApiFieldError = {
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

  constructor(
    message: string,
    status: number,
    data: ApiErrorResponse | null,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(
      this,
      ApiError.prototype,
    );
  }
}

export class SsrTimeoutError extends Error {
  timeoutMs: number;

  constructor(timeoutMs: number) {
    super(
      `SSR request timed out after ${timeoutMs}ms`,
    );

    this.name = "SsrTimeoutError";
    this.timeoutMs = timeoutMs;

    Object.setPrototypeOf(
      this,
      SsrTimeoutError.prototype,
    );
  }
}

const getAccessToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token =
    localStorage.getItem("accessToken");

  return token &&
    token !== "undefined" &&
    token !== "null"
    ? token
    : null;
};

const buildUrl = (
  endpoint: string,
) => {
  if (!BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not defined.",
    );
  }

  return `${BASE_URL}${endpoint}`;
};

const parseResponseBody = async (
  response: Response,
) => {
  const contentType =
    response.headers.get("content-type");

  if (
    !contentType?.includes(
      "application/json",
    )
  ) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

const sleep = (
  delayMs: number,
) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

const isSafeToRetry = (
  method?: string,
) => {
  const normalizedMethod =
    (method ?? "GET").toUpperCase();

  return (
    normalizedMethod === "GET" ||
    normalizedMethod === "HEAD"
  );
};

const fetchWithNetworkRetry = async (
  url: string,
  init: RequestInit,
): Promise<Response> => {
  const canRetry =
    isSafeToRetry(init.method);

  let attempt = 0;

  while (true) {
    try {
      return await fetch(
        url,
        init,
      );
    } catch (error) {

      if (init.signal?.aborted) {
        throw error;
      }

      if (
        !canRetry ||
        attempt >=
          MAX_NETWORK_RETRIES
      ) {
        throw error;
      }

      attempt += 1;

      await sleep(
        NETWORK_RETRY_DELAY_MS *
          attempt,
      );
    }
  }
};

const fetchWithSsrTimeout = async (
  url: string,
  init: RequestInit,
): Promise<Response> => {
  const isServer =
    typeof window === "undefined";

  const shouldUseTimeout =
    isServer &&
    isSafeToRetry(init.method);

  if (!shouldUseTimeout) {
    return fetchWithNetworkRetry(
      url,
      init,
    );
  }

  const timeoutController =
    new AbortController();

  const originalSignal =
    init.signal;

  const handleOriginalAbort =
    () => {
      timeoutController.abort(
        originalSignal?.reason,
      );
    };

  if (originalSignal) {
    if (originalSignal.aborted) {
      handleOriginalAbort();
    } else {
      originalSignal.addEventListener(
        "abort",
        handleOriginalAbort,
        {
          once: true,
        },
      );
    }
  }

  const timeoutId =
  setTimeout(() => {
    timeoutController.abort(
      new SsrTimeoutError(
        SSR_REQUEST_TIMEOUT_MS,
      ),
    );
  }, SSR_REQUEST_TIMEOUT_MS);

  try {
    return await fetchWithNetworkRetry(
      url,
      {
        ...init,
        signal:
          timeoutController.signal,
      },
    );
  } finally {
    clearTimeout(timeoutId);

    originalSignal?.removeEventListener(
      "abort",
      handleOriginalAbort,
    );
  }
};

export const httpClient =
  async <T>(
    endpoint: string,
    options: HttpClientOptions = {},
  ): Promise<T> => {
    const {
      skipJsonContentType,
      skipAuth,
      authToken,
      headers,
      body,
      ...rest
    } = options;

    const isFormData =
      body instanceof FormData;

    const token =
      authToken ??
      getAccessToken();

    const requestHeaders: HeadersInit = {
      ...(!isFormData &&
      !skipJsonContentType
        ? {
            "Content-Type":
              "application/json",
          }
        : {}),

      ...(token && !skipAuth
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {}),

      ...headers,
    };

    const preparedBody:
      | BodyInit
      | null
      | undefined =
      body &&
      !isFormData &&
      typeof body === "object"
        ? JSON.stringify(body)
        : (body as
            | BodyInit
            | null
            | undefined);

    const response =
      await fetchWithSsrTimeout(
        buildUrl(endpoint),
        {
          ...rest,
          headers:
            requestHeaders,
          body:
            preparedBody,
        },
      );

    const data =
      await parseResponseBody(
        response,
      );

    if (!response.ok) {
      const errorData =
        data as
          | ApiErrorResponse
          | null;

      const message =
        errorData?.message ??
        `HTTP error: ${response.status}`;

      throw new ApiError(
        message,
        response.status,
        errorData,
      );
    }

    return data as T;
  };