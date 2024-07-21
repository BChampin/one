const EnvironmentsController = require('../controllers/environments');

module.exports = function (app) {
  app.post(EnvironmentsController.routesPrefix, async (req, res) => {
    res.send(await EnvironmentsController.create(req));
  });

  app.get(EnvironmentsController.routesPrefix, async (req, res) => {
    res.send(await EnvironmentsController.read(req));
  });

  app.put(EnvironmentsController.routesPrefix, async (req, res) => {
    res.send(await EnvironmentsController.update(req));
  });

  app.delete(EnvironmentsController.routesPrefix, async (req, res) => {
    res.send(await EnvironmentsController.delete(req));
  });
};
