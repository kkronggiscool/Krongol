// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 47359;

// Import routes
const createRouter = require('./routes/create');
const searchRouter = require('./routes/search'); // Add this line

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use('/', require('./routes/index'));
app.use('/create-a-query', createRouter);
app.use('/search', searchRouter); // Add this line

// Listen on localhost
app.listen(port, 'localhost', () => {
    console.log(`Server running at ${port}`);
});
