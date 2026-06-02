import type {
  ApiEnvelope,
  ApiErrorEnvelope,
  NewsResult,
  WeatherResult,
} from "@/types/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`);
  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | ApiErrorEnvelope
    | null;

  if (!response.ok || !payload || payload.success === false) {
    const message =
      payload && "error" in payload
        ? payload.error.message
        : "The API request failed.";
    throw new Error(message);
  }

  return payload.data;
};

export const getWeather = (city: string) =>
  request<WeatherResult>(`/weather/${encodeURIComponent(city)}`);

export const getNews = (countryCode: string, limit = 6) =>
  request<NewsResult>(
    `/news/${encodeURIComponent(countryCode)}?limit=${encodeURIComponent(
      String(limit),
    )}`,
  );

export const endpointForWeather = (city: string) =>
  `${API_URL}/weather/${encodeURIComponent(city)}`;

export const endpointForNews = (countryCode: string, limit = 6) =>
  `${API_URL}/news/${encodeURIComponent(countryCode)}?limit=${encodeURIComponent(
    String(limit),
  )}`;
