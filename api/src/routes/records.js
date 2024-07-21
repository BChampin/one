const RecordsController = require('../controllers/records');

module.exports = function (app) {
  app.post(RecordsController.routesPrefix, async (req, res) => {
    res.send(await RecordsController.create(req));
  });

  app.get(`${RecordsController.routesPrefix}`, async (req, res) => {
    res.send(await RecordsController.list(req));
  });

  app.get(`${RecordsController.routesPrefix}/:date`, async (req, res) => {
    res.send(await RecordsController.read(req));
  });

  app.put(`${RecordsController.routesPrefix}/:date`, async (req, res) => {
    res.send(await RecordsController.update(req));
  });

  app.delete(`${RecordsController.routesPrefix}/:date`, async (req, res) => {
    res.send(await RecordsController.delete(req));
  });
};
