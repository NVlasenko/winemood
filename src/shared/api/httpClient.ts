const BASE_URL = 'https://wine-mood-backend.onrender.com';

export const httpClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },

    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
};