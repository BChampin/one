const BaseStoragePlatform = require('./BaseStoragePlatform');

module.exports = class GitlabStoragePlatform extends BaseStoragePlatform {
  constructor() {
    super();
    this.type = 'gitlab';
    this.baseURL = process.env.GITLAB_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': process.env.GITLAB_PAT,
    };
    this.baseURI = `projects/${process.env.GITLAB_PROJECT_ID}/repository/`;
  }

  // Methods
  async create({ message, filePath, content }) {
    return this.request({
      method: 'POST',
      url: 'commits',
      data: {
        branch: 'main',
        commit_message: message,
        actions: [{
          action: 'create',
          file_path: filePath,
          content,
        }],
      },
    });
  }

  async read({ filePath }) {
    return this.request({
      method: 'GET',
      url: `files/${encodeURIComponent(filePath)}/raw?ref=main`,
    });
  }

  async list({ filePath, getAll = false }) {
    const tree = await this.request({
      method: 'GET',
      url: `tree?path=${encodeURIComponent(filePath)}&ref=main`,
    });
    if (!getAll) return tree;
    const list = [];
    for (const leave of tree) list.push({ slug: leave.name.split('.')[0], content: await this.read({ filePath: leave.path }) });
    return list;
  }

  async update({ message, filePath, content }) {
    return this.request({
      method: 'POST',
      url: 'commits',
      data: {
        branch: 'main',
        commit_message: message,
        actions: [{
          action: 'update',
          file_path: filePath,
          content,
        }],
      },
    });
  }

  async delete({ message, filePath }) {
    return this.request({
      method: 'POST',
      url: 'commits',
      data: {
        branch: 'main',
        commit_message: message,
        actions: [{
          action: 'delete',
          file_path: filePath,
        }],
      },
    });
  }
};
