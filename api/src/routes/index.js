const environmentsRoutes = require('./environments');
const habitsRoutes = require('./habits');
const recordsRoutes = require('./records');
const wikisRoutes = require('./wikis');

module.exports = function (app) {
  environmentsRoutes(app);
  habitsRoutes(app);
  recordsRoutes(app);
  wikisRoutes(app);
};
