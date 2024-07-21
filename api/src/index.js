//  Loading env values
require('dotenv').config({ path: '.env' });

const app = require('express')();
// Middlewares
app.use(require('cors')());
app.use(require('body-parser').json());

// Middleware for building platform
app.use(require('./middlewares/StoragePlatform'));

// Import all routes
require('./routes')(app);

// Root route
app.get('/', (req, res) => {
  res.send('One API');
});

// Start server
app.listen(process.env.API_PORT || 10001);
