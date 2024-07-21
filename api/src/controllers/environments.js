const REPO_PREFIX = 'environments';
const REPO_FILE = 'environments.json';

const pathBuilder = () => `${REPO_PREFIX}/${REPO_FILE}`;

const EnvironmentsController = {
  routesPrefix: '/environments',

  async create(req) {
    const rq = await req.storagePlatform.create({
      message: '[ONE] Creating new environments file.',
      filePath: pathBuilder(),
      content: JSON.stringify(req.body),
    });

    // Successful creation
    return rq.id ? req.body : rq;
  },

  async read(req) {
    return req.storagePlatform.read({
      filePath: pathBuilder(),
    });
  },

  async update(req) {
    const rq = await req.storagePlatform.update({
      message: '[ONE] Updating environments file.',
      filePath: pathBuilder(),
      content: JSON.stringify(req.body),
    });

    // Successful creation
    return rq.id ? req.body : rq;
  },

  async delete(req) {
    const rq = await req.storagePlatform.delete({
      message: '[ONE] Removing environments file.',
      filePath: pathBuilder(),
    });

    // Successful deletion
    return rq.id ?? rq;
  },
};

module.exports = EnvironmentsController;
