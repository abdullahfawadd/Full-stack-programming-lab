const express = require("express");
const { getNews } = require("../controllers/newsController");

const router = express.Router();

router.get("/:countryCode", getNews);

module.exports = router;
