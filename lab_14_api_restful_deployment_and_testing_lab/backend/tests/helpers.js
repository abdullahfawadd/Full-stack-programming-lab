const mockLocation = {
  id: 1174872,
  name: "Karachi",
  latitude: 24.8608,
  longitude: 67.0104,
  country_code: "PK",
  country: "Pakistan",
  timezone: "Asia/Karachi",
};

const mockForecast = {
  current_units: {
    time: "iso8601",
    temperature_2m: "C",
    relative_humidity_2m: "%",
    weather_code: "wmo code",
  },
  current: {
    time: "2026-06-02T15:15",
    temperature_2m: 33,
    relative_humidity_2m: 64,
    weather_code: 95,
  },
};

const mockNewsXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Top stories - Google News</title>
    <item>
      <title>Markets rally after tech results - Dawn</title>
      <link>https://news.google.com/articles/one</link>
      <pubDate>Tue, 02 Jun 2026 09:00:00 GMT</pubDate>
      <source url="https://www.dawn.com">Dawn</source>
    </item>
    <item>
      <title>City launches new transit corridor - BBC</title>
      <link>https://news.google.com/articles/two</link>
      <pubDate>Tue, 02 Jun 2026 08:30:00 GMT</pubDate>
      <source url="https://www.bbc.com">BBC</source>
    </item>
    <item>
      <title>Universities publish admission schedule - The News</title>
      <link>https://news.google.com/articles/three</link>
      <pubDate>Tue, 02 Jun 2026 08:00:00 GMT</pubDate>
      <source url="https://www.thenews.com.pk">The News</source>
    </item>
    <item>
      <title>Energy demand climbs during summer - Reuters</title>
      <link>https://news.google.com/articles/four</link>
      <pubDate>Tue, 02 Jun 2026 07:00:00 GMT</pubDate>
      <source url="https://www.reuters.com">Reuters</source>
    </item>
    <item>
      <title>Cricket board announces fixtures - ESPN</title>
      <link>https://news.google.com/articles/five</link>
      <pubDate>Tue, 02 Jun 2026 06:00:00 GMT</pubDate>
      <source url="https://www.espn.com">ESPN</source>
    </item>
    <item>
      <title>Researchers unveil clean water project - Nature</title>
      <link>https://news.google.com/articles/six</link>
      <pubDate>Tue, 02 Jun 2026 05:00:00 GMT</pubDate>
      <source url="https://www.nature.com">Nature</source>
    </item>
  </channel>
</rss>`;

module.exports = {
  mockForecast,
  mockLocation,
  mockNewsXml,
};
