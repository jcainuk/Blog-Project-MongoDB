// Initial set- up
const express = require('express');
const path = require('path');

// Require routes here
const blogRoutes = require('./routes/blog');

// Initiate app
const app = express();

// Activate EJS View Engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Access CSS files
app.use(express.static('public')); // Serve static files (e.g. CSS files)

// Middleware app.use()
app.use(blogRoutes);

// Listen
app.listen(3000);
