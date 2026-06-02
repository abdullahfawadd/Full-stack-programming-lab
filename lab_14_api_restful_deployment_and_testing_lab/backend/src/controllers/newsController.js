const { fetchNewsHeadlines } = require("../services/newsService");

const getNews = async (req, res, next) => {
  try {
    const data = await fetchNewsHeadlines(req.params.countryCode, req.query.limit);
    res.status(200).json({
      success: true,
      task: "8.2",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
};
