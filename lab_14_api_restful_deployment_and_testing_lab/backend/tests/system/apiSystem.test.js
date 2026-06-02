const nock = require("nock");
const app = require("../../src/app");
const { mockForecast, mockLocation, mockNewsXml } = require("../helpers");

describe("Lab 14 system tests over HTTP", () => {
  let server;
  let baseUrl;

  beforeAll((done) => {
    server = app.listen(0, () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test("Task 8.1 weather endpoint works through the running HTTP server", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query(true)
      .reply(200, { results: [mockLocation] });

    nock("https://api.open-meteo.com")
      .get("/v1/forecast")
      .query(true)
      .reply(200, mockForecast);

    const response = await fetch(`${baseUrl}/api/weather/Karachi`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.city).toBe("Karachi");
    expect(body.data.condition).toBe("Thunderstorm");
  });

  test("Task 8.2 news endpoint works through the running HTTP server", async () => {
    nock("https://news.google.com")
      .get("/rss")
      .query(true)
      .reply(200, mockNewsXml, { "Content-Type": "application/rss+xml" });

    const response = await fetch(`${baseUrl}/api/news/PK?limit=5`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.countryCode).toBe("PK");
    expect(body.data.articles).toHaveLength(5);
  });
});
