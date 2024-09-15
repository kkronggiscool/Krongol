const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Serve the Create a Query page
router.get('/', (req, res) => {
    res.render('create-query');
});

// Handle form submission
router.post('/', (req, res) => {
    const { queryName, queryURL, queryDescription } = req.body;

    // Validate URL
    try {
        new URL(queryURL); // Throws if the URL is invalid
    } catch (e) {
        return res.status(400).send('Invalid URL');
    }

    // Read existing data
    const filePath = path.join(__dirname, '../data/query.json');
    let queries = [];
    if (fs.existsSync(filePath)) {
        queries = JSON.parse(fs.readFileSync(filePath));
    }

    // Add new query
    queries.push({
        name: queryName,
        url: queryURL,
        description: queryDescription || ''
    });

    // Save to file
    fs.writeFileSync(filePath, JSON.stringify(queries, null, 2));

    // Redirect to a success page
    res.redirect('/create-a-query/success');
});

// Serve the success page
router.get('/success', (req, res) => {
    res.render('success');
});

module.exports = router;
