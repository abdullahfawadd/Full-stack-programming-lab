const nock = require("nock");
const request = require("supertest");
const app = require("../../src/app");
const { mockForecast, mockLocation } = require("../helpers");

describe("Task 8.1 weather API integration tests", () => {
  test("GET /api/weather/:city returns live-style weather JSON for a valid city", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query(true)
      .reply(200, { results: [mockLocation] });

    nock("https://api.open-meteo.com")
      .get("/v1/forecast")
      .query(true)
      .reply(200, mockForecast);

    const response = await request(app).get("/api/weather/Karachi").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.task).toBe("8.1");
    expect(response.body.data).toMatchObject({
      city: "Karachi",
      temperatureCelsius: 33,
      condition: "Thunderstorm",
      humidity: 64,
      provider: "Open-Meteo",
    });
  });

  test("returns 404 when the city is not found", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query(true)
      .reply(200, { results: [] });

    const response = await request(app).get("/api/weather/Imaginaryville").expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("CITY_NOT_FOUND");
  });

  test("returns 502 when the weather provider fails", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query(true)
      .reply(200, { results: [mockLocation] });

    nock("https://api.open-meteo.com")
      .get("/v1/forecast")
      .query(true)
      .reply(503, { message: "Service unavailable" });

    const response = await request(app).get("/api/weather/Karachi").expect(502);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("WEATHER_PROVIDER_ERROR");
  });
});
