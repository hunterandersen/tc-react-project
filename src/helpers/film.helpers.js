/**
 * Filters the list of movies by director
 * @param {Array} list
 * @param {string} searchDirector
 * @returns {Array} Movies array filtered by director
 */
export function filterFilmsByDirector(list, searchDirector) {
  return list.filter((movie) => movie.director == searchDirector);
}

/**
 *
 * @param {Array} list
 * @param {string} prop
 * @returns {Array} Unique values from the list, based on a property
 */
export function getUniqueListOf(list, prop) {
  // const seenValues = {};
  // list.forEach(item => {
  //     if (!seenValues[item[prop]]){
  //         seenValues[item[prop]] = 1;
  //     }
  // });
  // console.log(Object.keys(seenValues));
  // return Object.keys(seenValues);

  const prevSeenValues = [];
  //We're storing the things we've seen, which is actually what we want
  list.forEach((item) => {
    if (!prevSeenValues.includes(item[prop])) {
      prevSeenValues.push(item[prop]);
    }
  });

  return prevSeenValues;
}

/**
 *
 * @param {Array} list
 * @returns {Object} Average and accumulated Rotten Tomato scores, and latest movie
 */
export const getFilmStats = (list) => {
    const array = [...list];
  if (array.length <= 0) {
    return {
      sum: 0,
      avg_score: 0,
      total: 0,
      latest: 1600,
    };
  }

  //Reduce!
  const acc_score = array.reduce((a, c) => {
    return a + Number(c.rt_score);
  }, 0);

  const total = array.length;
  const avg_score = acc_score / total;

  //const latest = Math.max(...array.map(item => item.release_date));
  const latest = array.sort((a, b) => {
    return b.release_date - a.release_date;
  })[0];

  return {
    acc_score,
    avg_score,
    total,
    latest: latest.release_date,
  };
};
