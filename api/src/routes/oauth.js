const OAuthContoller = require('../controllers/oauth');

module.exports = function (app) {

  // Gitlab
  app.post(`${OAuthContoller.routesPrefix}/gitlab/exchange-code`, async (req, res) => {
    res.send(await OAuthContoller.exchangeCode(req));
  });
}
