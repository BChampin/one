const union = (arr, ...args) => [...new Set(arr.concat(...args))];
const uniq = (arr) => [...new Set(arr)];
const set = (obj, path, value) => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key];
  }, obj);
};
const get = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj,
  );
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

function recordsStats(records = []) {
  if (!records.length) return null;

  // Extract all keys except date
  const habits = uniq(records.flatMap((r) => Object.keys(r))).filter((habit) => habit !== 'date');

  // Initial setup
  const stats = {};
  habits.forEach((habit) => {
    set(stats, habit, {
      currentStreak: 0, streakMax: 0, streakMin: 999, nb: 0, nbFound: 0,
    });
  });

  // Then the loop
  records.forEach((record) => {
    Object.entries(record).forEach((entry) => {
      const [habit, done] = entry;
      if (!habits.includes(habit)) return;

      set(stats, `${habit}.nbFound`, Number(get(stats, `${habit}.nbFound`, 0)) + Number(1));

      // Its false
      if (!done) {
        // Lower min streak
        if (get(stats, `${habit}.currentStreak`, 0) > 0 && get(stats, `${habit}.currentStreak`, 0) < get(stats, `${habit}.streakMin`, 0)) {
          set(stats, `${habit}.streakMin`, get(stats, `${habit}.currentStreak`, 0));
        }
        // Reset streak
        set(stats, `${habit}.currentStreak`, 0);
      } else {
        set(stats, `${habit}.currentStreak`, Number(get(stats, `${habit}.currentStreak`, 0)) + Number(1));
        set(stats, `${habit}.nb`, Number(get(stats, `${habit}.nb`, 0)) + Number(1));

        // Augment max streak
        if (get(stats, `${habit}.currentStreak`, 0) > get(stats, `${habit}.streakMax`, 0)) {
          set(stats, `${habit}.streakMax`, get(stats, `${habit}.currentStreak`, 0));
        }
      }
    });
  });

  // Then percentage
  habits.forEach((habit) => {
    set(stats, `${habit}.percentage`, (get(stats, `${habit}.nb`, 0) * 100) / get(stats, `${habit}.nbFound`, 0));
    if (get(stats, `${habit}.streakMin`, 999) === 999) set(stats, `${habit}.streakMin`, 0);
  });

  return stats;
}

module.exports = {
  union,
  uniq,
  set,
  get,
  recordsStats,
};
