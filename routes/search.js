// routes/search.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Serve the search results page
router.get('/', (req, res) => {
    const query = req.query.query || ''; // Default to empty string if no query
    if (!query) {
        return res.render('search', { results: [], query });
    }

    // Read queries from file
    const filePath = path.join(__dirname, '../data/query.json');
    let queries = [];
    if (fs.existsSync(filePath)) {
        queries = JSON.parse(fs.readFileSync(filePath));
    }

    // Filter queries based on search query
    const results = queries.filter(q =>
        q.name.toLowerCase().includes(query.toLowerCase())
    );

    // Render the search page with dynamic title
    res.render('search', { results, query });
});

module.exports = router;
