const WikisController = require('../controllers/wikis');

module.exports = function (app) {
  app.post(WikisController.routesPrefix, async (req, res) => {
    res.send(await WikisController.create(req));
  });

  app.get(`${WikisController.routesPrefix}`, async (req, res) => {
    res.send(await WikisController.list(req));
  });

  app.get(`${WikisController.routesPrefix}/:slug`, async (req, res) => {
    res.send(await WikisController.read(req));
  });

  app.put(`${WikisController.routesPrefix}/:slug`, async (req, res) => {
    res.send(await WikisController.update(req));
  });

  app.delete(`${WikisController.routesPrefix}/:slug`, async (req, res) => {
    res.send(await WikisController.delete(req));
  });
};
