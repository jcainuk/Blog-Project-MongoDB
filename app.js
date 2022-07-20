// Initial set- up
const express = require('express');

// Get the path tool
const path = require('path');

// Use the dotenv module to hide passwords etc
const dotenv = require('dotenv').config();

// Require routes here
const blogRoutes = require('./routes/blog');

// Import db file
const db = require('./data/database');

// Initiate app
const app = express();

// Activate EJS View Engines
app.set('view engine', 'ejs');

// Direct Express app to the views folder from root
app.set('views', path.join(__dirname, 'views'));

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Serve static files (e.g. CSS files)
app.use(express.static('public'));

// Middleware app.use()
app.use(blogRoutes);

// 500 Errors
app.use((error, req, res, next) => {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

db.connectToDatabase().then(() => {
  const { PORT } = process.env || 3000;
  // Listen
  app.listen(PORT);
});
