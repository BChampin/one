const REPO_PREFIX = 'wikis';
const REPO_EXTENSION = '.md';

const pathBuilder = (slug) => `${REPO_PREFIX}/${slug}${REPO_EXTENSION}`;

const WikisController = {
  routesPrefix: '/wikis',

  async create(req) {
    const rq = await req.storagePlatform.create({
      message: '[ONE] Creating new wiki file.',
      filePath: pathBuilder(req.body.slug),
      content: `# ${req.body.slug}`,
    });

    // Successful creation
    return rq.id ? req.body : rq;
  },

  async list(req) {
    return req.storagePlatform.list({
      filePath: `${REPO_PREFIX}/`,
      getAll: true,
    });
  },

  async read(req) {
    return req.storagePlatform.read({
      filePath: pathBuilder(req.params.slug),
    });
  },

  async update(req) {
    const rq = await req.storagePlatform.update({
      message: '[ONE] Updating wiki file.',
      filePath: pathBuilder(req.params.slug),
      content: req.body.content,
    });

    // Successful creation
    return rq.id ? req.body : rq;
  },

  async delete(req) {
    const rq = await req.storagePlatform.delete({
      message: '[ONE] Removing wiki file.',
      filePath: pathBuilder(req.params.slug),
    });

    // Successful deletion
    return rq.id ?? rq;
  },
};

module.exports = WikisController;
