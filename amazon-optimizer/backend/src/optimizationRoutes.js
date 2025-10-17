const express = require('express');
const router = express.Router();
const { Optimization } = require('./db');
const { fetchProductDetails } = require('./scraperService');
const { optimizeListing } = require('./aiService');

// POST /api/optimize
// Fetches product details, optimizes them with AI, stores history, and returns the result.
router.post('/optimize', async (req, res) => {
  const { asin } = req.body;

  if (!asin) {
    return res.status(400).json({ error: 'ASIN is required.' });
  }

  try {
    // 1. Fetch Original Product Details (Mocked)
    const originalData = await fetchProductDetails(asin);

    // 2. AI Optimization (Mocked)
    const optimizedData = await optimizeListing(originalData);

    // Combine original and optimized data for storage
    const fullData = {
      asin: originalData.asin,
      original_title: originalData.original_title,
      original_bullets: JSON.stringify(originalData.original_bullets),
      original_description: originalData.original_description,
      optimized_title: optimizedData.optimized_title,
      optimized_bullets: JSON.stringify(optimizedData.optimized_bullets),
      optimized_description: optimizedData.optimized_description,
      optimized_keywords: optimizedData.optimized_keywords,
    };

    // 3. Store Optimization History
    const newOptimization = await Optimization.create(fullData);

    // 4. Return the result to the frontend
    res.json({
      success: true,
      original: {
        title: originalData.original_title,
        bullets: originalData.original_bullets,
        description: originalData.original_description,
      },
      optimized: {
        title: optimizedData.optimized_title,
        bullets: optimizedData.optimized_bullets,
        description: optimizedData.optimized_description,
        keywords: optimizedData.optimized_keywords,
      },
      history_id: newOptimization.id,
    });

  } catch (error) {
    console.error('Optimization failed:', error.message);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during optimization.' });
  }
});

// GET /api/history/:asin
// Retrieves the optimization history for a given ASIN.
router.get('/history/:asin', async (req, res) => {
  const { asin } = req.params;

  try {
    const history = await Optimization.findAll({
      where: { asin: asin.toUpperCase() },
      order: [['optimization_date', 'DESC']],
    });
     
       if (!history || history.length === 0) {
      // Return empty array gracefully if no records found
      return res.json({ success: true, history: [] });
    }

    // Parse JSON strings back to arrays for bullets
    const formattedHistory = history.map(record => ({
      id: record.id,
      asin: record.asin,
      optimization_date: record.optimization_date,
      original: {
        title: record.original_title,
        bullets: JSON.parse(record.original_bullets || '[]'),
        description: record.original_description,
      },
      optimized: {
        title: record.optimized_title,
        bullets: JSON.parse(record.optimized_bullets || '[]'),
        description: record.optimized_description,
        keywords: record.optimized_keywords ? record.optimized_keywords.split(',') : [],
      },
    }));

    res.json({ success: true, history: formattedHistory });

  } catch (error) {
    console.error('History retrieval failed:', error.message);
    res.status(500).json({ error: 'Failed to retrieve optimization history.' });
  }
});
function safeJsonParse(str) {
  try {
    return JSON.parse(str) || [];
  } catch {
    return [];
  }
}
module.exports = router;

