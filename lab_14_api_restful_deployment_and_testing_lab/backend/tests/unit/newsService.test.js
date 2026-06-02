const {
  normalizeLimit,
  parseNewsFeed,
  splitTitleAndSource,
  validateCountryCode,
} = require("../../src/services/newsService");
const { mockNewsXml } = require("../helpers");

describe("Task 8.2 news service unit tests", () => {
  test("validates country codes and normalizes them to uppercase", () => {
    expect(validateCountryCode("pk")).toBe("PK");
    expect(validateCountryCode("US")).toBe("US");
    expect(() => validateCountryCode("pak")).toThrow("two-letter ISO code");
    expect(() => validateCountryCode("1x")).toThrow("two-letter ISO code");
  });

  test("accepts article limits only in the required 5 to 10 range", () => {
    expect(normalizeLimit(undefined)).toBe(6);
    expect(normalizeLimit("5")).toBe(5);
    expect(normalizeLimit("10")).toBe(10);
    expect(() => normalizeLimit("4")).toThrow("Limit must be an integer");
    expect(() => normalizeLimit("11")).toThrow("Limit must be an integer");
  });

  test("splits Google News titles into title and source fallback", () => {
    expect(splitTitleAndSource("Policy update announced - Reuters")).toEqual({
      title: "Policy update announced",
      sourceName: "Reuters",
    });
  });

  test("parses RSS into the required structured headline JSON", () => {
    const payload = parseNewsFeed(mockNewsXml, "PK", 5);

    expect(payload).toMatchObject({
      countryCode: "PK",
      count: 5,
      provider: "Google News RSS",
    });
    expect(payload.articles).toHaveLength(5);
    expect(payload.articles[0]).toMatchObject({
      newsTitle: "Markets rally after tech results",
      title: "Markets rally after tech results",
      sourceName: "Dawn",
      newsUrl: "https://news.google.com/articles/one",
      url: "https://news.google.com/articles/one",
      publicationDate: "2026-06-02T09:00:00.000Z",
      publishedAt: "2026-06-02T09:00:00.000Z",
    });
  });
});
