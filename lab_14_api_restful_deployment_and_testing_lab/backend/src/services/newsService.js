const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const ApiError = require("../utils/ApiError");

const NEWS_RSS_URL = "https://news.google.com/rss";
const DEFAULT_LIMIT = 6;
const MIN_LIMIT = 5;
const MAX_LIMIT = 10;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  textNodeName: "text",
});

const validateCountryCode = (countryCode) => {
  const normalized = String(countryCode || "").trim().toUpperCase();

  if (!normalized) {
    throw new ApiError(400, "COUNTRY_REQUIRED", "Country code is required.");
  }

  if (!/^[A-Z]{2}$/.test(normalized)) {
    throw new ApiError(400, "COUNTRY_FORMAT_INVALID", "Country code must be a two-letter ISO code such as PK, US, GB, or IN.");
  }

  return normalized;
};

const normalizeLimit = (limit) => {
  if (limit === undefined || limit === null || limit === "") {
    return DEFAULT_LIMIT;
  }

  const parsed = Number(limit);

  if (!Number.isInteger(parsed) || parsed < MIN_LIMIT || parsed > MAX_LIMIT) {
    throw new ApiError(400, "LIMIT_INVALID", "Limit must be an integer from 5 to 10.");
  }

  return parsed;
};

const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const decodeEntities = (value) =>
  String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const splitTitleAndSource = (title) => {
  const cleanTitle = decodeEntities(title).trim();
  const separatorIndex = cleanTitle.lastIndexOf(" - ");

  if (separatorIndex === -1) {
    return {
      title: cleanTitle,
      sourceName: "Google News",
    };
  }

  return {
    title: cleanTitle.slice(0, separatorIndex).trim(),
    sourceName: cleanTitle.slice(separatorIndex + 3).trim(),
  };
};

const parseNewsFeed = (xml, countryCode, limit = DEFAULT_LIMIT) => {
  const parsed = parser.parse(xml);
  const items = toArray(parsed?.rss?.channel?.item);

  if (!items.length) {
    throw new ApiError(404, "NEWS_NOT_FOUND", `No headlines found for ${countryCode}.`);
  }

  const articles = items.slice(0, limit).map((item) => {
    const titleData = splitTitleAndSource(item.title);
    const sourceName = item.source?.text || titleData.sourceName;
    const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : null;

    return {
      newsTitle: titleData.title,
      title: titleData.title,
      sourceName,
      newsUrl: item.link,
      url: item.link,
      publicationDate: publishedAt,
      publishedAt,
    };
  });

  return {
    countryCode,
    count: articles.length,
    articles,
    fetchedAt: new Date().toISOString(),
    provider: "Google News RSS",
  };
};

const fetchNewsHeadlines = async (countryCode, limitValue) => {
  const normalizedCountry = validateCountryCode(countryCode);
  const limit = normalizeLimit(limitValue);

  try {
    const response = await axios.get(NEWS_RSS_URL, {
      params: {
        hl: `en-${normalizedCountry}`,
        gl: normalizedCountry,
        ceid: `${normalizedCountry}:en`,
      },
      responseType: "text",
      timeout: 8000,
    });

    return parseNewsFeed(response.data, normalizedCountry, limit);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(502, "NEWS_PROVIDER_ERROR", "Unable to fetch news headlines.", error.message);
  }
};

module.exports = {
  fetchNewsHeadlines,
  normalizeLimit,
  parseNewsFeed,
  splitTitleAndSource,
  validateCountryCode,
};
