const BaseStoragePlatform = require('./BaseStoragePlatform');

module.exports = class GithubStoragePlatform extends BaseStoragePlatform {
  // TODO : to implement
  constructor() {
    super();
    this.type = 'github';
    this.baseURL = process.env.GITHUB_API_URL;
  }
};
