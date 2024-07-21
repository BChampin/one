const axios = require('axios');

const OAuthContoller = {
  routesPrefix: '/oauth',

  // Gitlab
  async exchangeCode(req) {
    const { code } = req.body;

    try {
      const response = await axios.post(process.env.GITLAB_OAUTH_URL, {
        client_id: process.env.GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.WEB_OAUTH_CALLBACK_URL,
      });
      return response.data;
    } catch (error) {
      console.log(error)
      return { error: 'Error exchanging code for token' };
    }
  },
};

module.exports = OAuthContoller;
