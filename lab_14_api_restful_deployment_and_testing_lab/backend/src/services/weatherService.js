const axios = require("axios");
const ApiError = require("../utils/ApiError");
const { mapWeatherCode } = require("../utils/weatherCodes");

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const validateCity = (city) => {
  const normalized = String(city || "").trim();

  if (!normalized) {
    throw new ApiError(400, "CITY_REQUIRED", "City name is required.");
  }

  if (normalized.length < 2 || normalized.length > 80) {
    throw new ApiError(400, "CITY_LENGTH_INVALID", "City name must be between 2 and 80 characters.");
  }

  if (!/^[\p{L}\p{M}\s.'-]+$/u.test(normalized)) {
    throw new ApiError(400, "CITY_FORMAT_INVALID", "City name can only contain letters, spaces, apostrophes, periods, or hyphens.");
  }

  return normalized;
};

const buildWeatherPayload = (location, forecast) => {
  const current = forecast.current || {};

  if (
    typeof current.temperature_2m !== "number" ||
    typeof current.relative_humidity_2m !== "number" ||
    typeof current.weather_code !== "number"
  ) {
    throw new ApiError(502, "WEATHER_RESPONSE_INVALID", "Weather provider returned an incomplete response.");
  }

  return {
    city: location.name,
    country: location.country,
    countryCode: location.country_code,
    coordinates: {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
    },
    currentTemperature: current.temperature_2m,
    temperatureUnit: "Celsius",
    temperatureCelsius: current.temperature_2m,
    weatherCondition: mapWeatherCode(current.weather_code),
    condition: mapWeatherCode(current.weather_code),
    humidityLevel: current.relative_humidity_2m,
    humidityUnit: "%",
    humidity: current.relative_humidity_2m,
    observedAt: current.time,
    fetchedAt: new Date().toISOString(),
    provider: "Open-Meteo",
  };
};

const getLocation = async (city) => {
  const normalizedCity = validateCity(city);

  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        name: normalizedCity,
        count: 1,
        language: "en",
        format: "json",
      },
      timeout: 8000,
    });

    const location = response.data?.results?.[0];

    if (!location) {
      throw new ApiError(404, "CITY_NOT_FOUND", `No weather location found for "${normalizedCity}".`);
    }

    return location;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(502, "GEOCODING_PROVIDER_ERROR", "Unable to reach the city lookup provider.", error.message);
  }
};

const getForecast = async (location) => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: "temperature_2m,relative_humidity_2m,weather_code",
        timezone: "auto",
      },
      timeout: 8000,
    });

    return response.data;
  } catch (error) {
    throw new ApiError(502, "WEATHER_PROVIDER_ERROR", "Unable to fetch current weather data.", error.message);
  }
};

const fetchWeatherByCity = async (city) => {
  const location = await getLocation(city);
  const forecast = await getForecast(location);
  return buildWeatherPayload(location, forecast);
};

module.exports = {
  buildWeatherPayload,
  fetchWeatherByCity,
  getForecast,
  getLocation,
  mapWeatherCode,
  validateCity,
};
