const { fetchWeatherByCity } = require("../services/weatherService");

const getWeather = async (req, res, next) => {
  try {
    const data = await fetchWeatherByCity(req.params.city);
    res.status(200).json({
      success: true,
      task: "8.1",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeather,
};
