const GithubStoragePlatform = require('./GithubStoragePlatform');
const GitlabStoragePlatform = require('./GitlabStoragePlatform');

module.exports = (req, res, next) => {
  // Here will be the platform decider
  if (req.headers.IS_GITHUB_PLATFORM) {
    req.storagePlatform = new GithubStoragePlatform();
  } else if (req.headers.IS_GITLAB_PLATFORM) {
    req.storagePlatform = new GitlabStoragePlatform();
  } else {
    // For dev, defaults to GITLAB
    req.storagePlatform = new GitlabStoragePlatform();
  }

  next();
};
