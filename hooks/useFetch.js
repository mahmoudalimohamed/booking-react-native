const DEFAULT_RETRIES = 3;

const API_KEY = "reqres-free-v1";

const fetchWithRetry = async (url, options = {}, retries = DEFAULT_RETRIES) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const message = `HTTP ${response.status} : ${response.statusText}`;
      const errorBoby = await response.text().catch(() => "");
      throw new Error(`${message}\n${errorBoby}`);
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    return isJson ? await response.json() : await response.text();
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `Retrying... ${url} (${
          DEFAULT_RETRIES - retries + 1
        } /${DEFAULT_RETRIES})`
      );
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const useFetch = {
  get: (url, options = {}) =>
    fetchWithRetry(url, {
      method: "GET",
      ...options,
      headers: {
        "X-API-KEY": API_KEY,
        ...(options.headers || {}),
      },
    }),

  post: (url, data, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
    }),

  put: (url, data, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
    }),

  delete: (url, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      method: "DELETE",
    }),
};
