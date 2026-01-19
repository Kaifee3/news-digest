const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const router = express.Router();

// Fetch news articles with optional category filtering
const fetchNews = async (category = null) => {
  try {
    let url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWS_API_KEY}`;
    
    if (category) {
      url += `&category=${category.toLowerCase()}`;
    }
    
    const res = await axios.get(url, { timeout: 10000 });
    return res.data.articles.slice(0, 10);
  } catch (error) {
    console.error('Error fetching news from API:', error.message);
    throw new Error('Failed to fetch news from external API');
  }
};

// Fetch news by search query for specific interests
const fetchNewsByQuery = async (query) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
    const res = await axios.get(url, { timeout: 10000 });
    return res.data.articles.slice(0, 5);
  } catch (error) {
    console.error(`Error fetching news for query "${query}":`, error.message);
    return [];
  }
};

// Map user interests to news categories and search terms
const getNewsForInterests = async (interests) => {
  const categoryMap = {
    'tech': 'technology',
    'sports': 'sports',
    'ai': 'technology',
    'business': 'business',
    'health': 'health',
    'entertainment': 'entertainment'
  };

  const searchTermMap = {
    'ai': 'artificial intelligence',
    'tech': 'technology',
    'sports': 'sports',
    'business': 'business',
    'health': 'health',
    'entertainment': 'entertainment'
  };

  let allArticles = [];

  for (const interest of interests) {
    const interestLower = interest.toLowerCase();
    
    try {
      if (categoryMap[interestLower]) {
        const categoryArticles = await fetchNews(categoryMap[interestLower]);
        allArticles.push(...categoryArticles);
      }
      
      if (searchTermMap[interestLower]) {
        const searchArticles = await fetchNewsByQuery(searchTermMap[interestLower]);
        allArticles.push(...searchArticles);
      }
    } catch (error) {
      console.error(`Error fetching news for interest "${interest}":`, error.message);
    }
  }

  const uniqueArticles = allArticles.filter((article, index, self) =>
    index === self.findIndex(a => a.title === article.title)
  ).slice(0, 5);

  return uniqueArticles;
};

router.get("/", async (req, res) => {
  try {
    console.log('News request received');
    
    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({ 
        error: 'News API key not configured' 
      });
    }
    
    const articles = await fetchNews();
    console.log(`Fetched ${articles.length} news articles`);
    res.json(articles);
  } catch (error) {
    console.error('Error in /news:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      message: error.message 
    });
  }
});

router.get("/personalized/:email", async (req, res) => {
  try {
    console.log('Personalized news request for:', req.params.email);
    
    const user = await User.findOne({ email: req.params.email });
    if (!user || !user.interests || user.interests.length === 0) {
      const articles = await fetchNews();
      return res.json(articles);
    }
    
    const articles = await getNewsForInterests(user.interests);
    res.json(articles);
  } catch (error) {
    console.error('Error in /news/personalized:', error);
    res.status(500).json({ 
      error: 'Failed to fetch personalized news', 
      message: error.message 
    });
  }
});

router.get("/digest/:email", async (req, res) => {
  try {
    console.log('News digest request for:', req.params.email);
    
    if (!req.params.email) {
      return res.status(400).json({ 
        error: 'Email parameter is required' 
      });
    }
    
    const user = await User.findOne({ email: req.params.email });
    let articles = [];
    
    if (user && user.interests && user.interests.length > 0) {
      console.log(`Found user with interests: ${user.interests.join(', ')}`);
      articles = await getNewsForInterests(user.interests);
    } else {
      console.log('User not found or no interests specified, using general news');
      articles = await fetchNews();
    }
    
    const digest = articles.map(article => 
      `• ${article.title}\n  ${article.description || 'No description available'}\n`
    ).join('\n');
    
    console.log(`Generated ${user?.interests ? 'personalized' : 'general'} digest for ${req.params.email}`);
    res.json({ 
      digest, 
      articles, 
      interests: user?.interests || [],
      personalized: !!(user?.interests && user.interests.length > 0)
    });
  } catch (error) {
    console.error('Error in /news/digest:', error);
    res.status(500).json({ 
      error: 'Failed to generate news digest', 
      message: error.message 
    });
  }
});

module.exports = router;
