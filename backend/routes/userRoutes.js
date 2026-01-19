const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    
    const { name, email, interests } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }
    
    const user = await User.create({ name, email, interests: interests || [] });
    console.log('User created successfully:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ 
      error: 'Failed to register user', 
      message: error.message 
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    console.log('Get user request for email:', req.params.email);
    
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Email parameter is required' 
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error in /:email:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user', 
      message: error.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error in /users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users', 
      message: error.message 
    });
  }
});

module.exports = router;
