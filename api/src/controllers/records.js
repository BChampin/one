const { recordsStats } = require('../utils/misc');

const REPO_PREFIX = 'records';
const REPO_EXTENSION = '.json';

const pathBuilder = (slug) => `${REPO_PREFIX}/${slug}${REPO_EXTENSION}`;

const RecordsController = {
  routesPrefix: '/records',

  async create(req) {
    return req.body;
    // TODO : implement this
    // const rq = await req.storagePlatform.create({
    //   message: '[ONE] Creating new record.',
    //   filePath: pathBuilder(req.body.slug),
    //   content: `# ${req.body.slug}`
    // })

    // // Successful creation
    // return rq.id ? req.body : rq
  },

  async list(req) {
    // If no parameter, return everything (warning big payload)
    const {
      year, month, day, withStats,
    } = req.query;
    let records = [];
    if (!year) {
      const allRecordsByFileSlug = await req.storagePlatform.list({
        filePath: `${REPO_PREFIX}/`,
        getAll: true,
      });
      records = allRecordsByFileSlug.flatMap((file) => file.content);
    } else {
      // Setting year allow to only grab specified file
      records = await req.storagePlatform.read({
        filePath: pathBuilder(year),
      });
      if (month) {
        records = records.filter((r) => r.date.match(`^${year}-${month}`));
        if (day) {
          records = records.filter((r) => r.date.match(`^${year}-${month}-${day}`));
        }
      }
    }

    // Return an object
    if (!records) records = []
    return {
      nbResults: records.length,
      stats: withStats === 'true' ? recordsStats(records) : undefined, // Allow stats computation
      results: records,
    };
  },

  async read(req) {
    return req.storagePlatform.read({
      filePath: pathBuilder(req.params.date),
    });
  },

  async update(req) {
    const recordDate = req.params.date || req.body.date;
    const year = recordDate.split('-')[0];

    // Fetch existing
    const yearRecords = await req.storagePlatform.read({
      filePath: pathBuilder(year),
    });

    const recordIndex = yearRecords.findIndex((yr) => yr.date === recordDate);
    if (recordIndex !== -1) {
      yearRecords[recordIndex] = { ...yearRecords[recordIndex], ...req.body };
    } else {
      yearRecords.push(req.body);
    }

    const rq = await req.storagePlatform.update({
      message: '[ONE] Updating record.',
      filePath: pathBuilder(year),
      content: JSON.stringify(yearRecords),
    });

    // Successful update
    return rq.id ? req.body : rq;
  },

  async delete(req) {
    const recordDate = req.params.date || req.body.date;
    const year = recordDate.split('-')[0];

    // Fetch existing
    const yearRecords = await req.storagePlatform.read({
      filePath: pathBuilder(year),
    });

    const recordIndex = yearRecords.findIndex((yr) => yr.date === recordDate);
    if (recordIndex) {
      delete yearRecords[recordIndex];
    } else {
      return recordDate;
    }

    const rq = await req.storagePlatform.update({
      message: '[ONE] Removing record.',
      filePath: pathBuilder(year),
      content: JSON.stringify(yearRecords),
    });

    // Successful deletion
    return rq.id ?? rq;
  },
};

module.exports = RecordsController;
