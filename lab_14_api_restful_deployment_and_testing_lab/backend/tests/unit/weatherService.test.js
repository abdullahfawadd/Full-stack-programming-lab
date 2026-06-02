const {
  buildWeatherPayload,
  mapWeatherCode,
  validateCity,
} = require("../../src/services/weatherService");
const { mockForecast, mockLocation } = require("../helpers");

describe("Task 8.1 weather service unit tests", () => {
  test("maps Open-Meteo WMO weather codes into readable conditions", () => {
    expect(mapWeatherCode(0)).toBe("Clear sky");
    expect(mapWeatherCode(95)).toBe("Thunderstorm");
    expect(mapWeatherCode(999)).toBe("Unclassified weather");
  });

  test("validates city input and keeps real city names intact", () => {
    expect(validateCity("  Karachi  ")).toBe("Karachi");
    expect(validateCity("St. John's")).toBe("St. John's");
    expect(() => validateCity("")).toThrow("City name is required");
    expect(() => validateCity("L@hore")).toThrow("City name can only contain");
  });

  test("builds the required weather JSON response shape", () => {
    const payload = buildWeatherPayload(mockLocation, mockForecast);

    expect(payload).toMatchObject({
      city: "Karachi",
      country: "Pakistan",
      countryCode: "PK",
      temperatureCelsius: 33,
      condition: "Thunderstorm",
      humidity: 64,
      observedAt: "2026-06-02T15:15",
      provider: "Open-Meteo",
    });
    expect(payload.coordinates).toEqual({
      latitude: 24.8608,
      longitude: 67.0104,
    });
    expect(new Date(payload.fetchedAt).toString()).not.toBe("Invalid Date");
  });
});
