const HabitsController = require('../controllers/habits');

module.exports = function (app) {
  app.post(HabitsController.routesPrefix, async (req, res) => {
    res.send(await HabitsController.create(req));
  });

  app.get(HabitsController.routesPrefix, async (req, res) => {
    res.send(await HabitsController.read(req));
  });

  app.put(HabitsController.routesPrefix, async (req, res) => {
    res.send(await HabitsController.update(req));
  });

  app.delete(HabitsController.routesPrefix, async (req, res) => {
    res.send(await HabitsController.delete(req));
  });
};
