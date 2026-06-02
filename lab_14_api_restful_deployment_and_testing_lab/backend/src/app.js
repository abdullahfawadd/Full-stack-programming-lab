const cors = require("cors");
const express = require("express");
const newsRoutes = require("./routes/newsRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Lab 14 no-key API service is running",
    student: "M Abdullah",
    tasks: [
      {
        id: "8.1",
        name: "Weather Forecast API",
        endpoint: "/api/weather/:city",
        provider: "Open-Meteo",
      },
      {
        id: "8.2",
        name: "News Headlines API",
        endpoint: "/api/news/:countryCode?limit=6",
        provider: "Google News RSS",
      },
    ],
  });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
