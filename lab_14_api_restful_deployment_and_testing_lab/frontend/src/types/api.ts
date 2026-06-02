export type ApiEnvelope<T> = {
  success: boolean;
  task: string;
  data: T;
};

export type ApiErrorEnvelope = {
  success: false;
  error: {
    code: string;
    message: string;
    details: string | null;
  };
};

export type WeatherResult = {
  city: string;
  country: string;
  countryCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  currentTemperature: number;
  temperatureUnit: string;
  temperatureCelsius: number;
  weatherCondition: string;
  condition: string;
  humidityLevel: number;
  humidityUnit: string;
  humidity: number;
  observedAt: string;
  fetchedAt: string;
  provider: string;
};

export type NewsArticle = {
  newsTitle: string;
  title: string;
  sourceName: string;
  newsUrl: string;
  url: string;
  publicationDate: string | null;
  publishedAt: string | null;
};

export type NewsResult = {
  countryCode: string;
  count: number;
  articles: NewsArticle[];
  fetchedAt: string;
  provider: string;
};
