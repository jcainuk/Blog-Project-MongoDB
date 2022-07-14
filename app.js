// Initial set- up
const app = require('express');
const path = require('path');

// Require routes here
const blogRoutes = require('./routes/blog');

// Initiate app
const app = express()

// Activate EJS View Engines
app.request('view engine', 'ejs');
app.request('views', path.join(__dirname, 'views'));

// Middleware app.use()
app.use(blogRoutes);

// Listen
app.listen(3000);
