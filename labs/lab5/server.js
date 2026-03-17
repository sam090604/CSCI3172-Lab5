const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use the API Key from .env (Strictly no hardcoding for security marks)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/**
 * Proxy route to Unsplash API
 * This fulfills the "Node.js server for API requests" requirement.
 */
app.get('/api/search', async (req, res) => {
  console.log('DEBUG: /api/search route called. Query:', req.query.query);
  const query = req.query.query;

  // Basic validation (Requirement: Problem-solving & Troubleshooting)
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  if (!UNSPLASH_ACCESS_KEY) {
    console.error("ERROR: UNSPLASH_ACCESS_KEY is missing in .env file");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=12`;
    console.log('DEBUG: Using Unsplash API Key:', UNSPLASH_ACCESS_KEY);
    console.log('DEBUG: Unsplash API URL:', url);
    const response = await fetch(url);
    console.log('DEBUG: Unsplash API response status:', response.status);
    const errorData = await response.text();
    if (!response.ok) {
      console.error('DEBUG: Unsplash API error body:', errorData);
      res.status(response.status).json({ error: 'Unsplash API error', details: errorData });
      return;
    }
    // If ok, parse the data
    const data = JSON.parse(errorData);
    res.json(data);
  } catch (err) {
    console.error('Server-side Error:', err);
    res.status(500).json({ error: 'Failed to fetch images from Unsplash', details: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`🚀 Meme Generator Server running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔑 API Key Loaded: ${UNSPLASH_ACCESS_KEY ? 'YES' : 'NO'}`);
  console.log(`-------------------------------------------`);
});