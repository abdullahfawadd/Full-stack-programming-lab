const nock = require("nock");
const request = require("supertest");
const app = require("../../src/app");
const { mockNewsXml } = require("../helpers");

describe("Task 8.2 news API integration tests", () => {
  test("GET /api/news/:countryCode returns structured top headlines", async () => {
    nock("https://news.google.com")
      .get("/rss")
      .query(true)
      .reply(200, mockNewsXml, { "Content-Type": "application/rss+xml" });

    const response = await request(app).get("/api/news/pk?limit=5").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.task).toBe("8.2");
    expect(response.body.data).toMatchObject({
      countryCode: "PK",
      count: 5,
      provider: "Google News RSS",
    });
    expect(response.body.data.articles[0]).toMatchObject({
      title: "Markets rally after tech results",
      sourceName: "Dawn",
    });
  });

  test("returns 400 for invalid country codes", async () => {
    const response = await request(app).get("/api/news/pak").expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("COUNTRY_FORMAT_INVALID");
  });

  test("returns 400 for article limits outside the lab range", async () => {
    const response = await request(app).get("/api/news/us?limit=3").expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("LIMIT_INVALID");
  });

  test("returns 502 when the news provider fails", async () => {
    nock("https://news.google.com")
      .get("/rss")
      .query(true)
      .reply(503, "Service unavailable");

    const response = await request(app).get("/api/news/us?limit=5").expect(502);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("NEWS_PROVIDER_ERROR");
  });
});
