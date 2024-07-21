const REPO_PREFIX = 'habits';
const REPO_FILE = 'habits.json';

const pathBuilder = () => `${REPO_PREFIX}/${REPO_FILE}`;

const HabitsController = {
  routesPrefix: '/habits',

  async create(req) {
    const rq = await req.storagePlatform.create({
      message: '[ONE] Creating new habits file.',
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
      message: '[ONE] Updating habits file.',
      filePath: pathBuilder(),
      content: JSON.stringify(req.body),
    });

    // Successful creation
    return rq.id ? req.body : rq;
  },

  async delete(req) {
    const rq = await req.storagePlatform.delete({
      message: '[ONE] Removing habits file.',
      filePath: pathBuilder(),
    });

    // Successful deletion
    return rq.id ?? rq;
  },
};

module.exports = HabitsController;
