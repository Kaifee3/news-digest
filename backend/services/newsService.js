const express = require("express");
const fetchNews = require("../services/newsService");
const summarize = require("../services/aiService");
const User = require("../models/User");

const router = express.Router();

router.get("/digest/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  const articles = await fetchNews();
  const digest = await summarize(articles, user.interests);
  res.json({ digest });
});

module.exports = router;
