/**
 * Filters the list of movies by director
 * @param {Array} list 
 * @param {string} searchDirector
 * @returns {Array} Movies array filtered by director
 */
export function filterFilmsByDirector(list, searchDirector){
    return list.filter(movie => movie.director == searchDirector);
}

/**
 * 
 * @param {Array} list 
 * @param {string} prop 
 * @returns {Array} Unique values from the list, based on a property
 */
export function getUniqueListOf(list, prop){
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
    list.forEach((item)=>{
        if (!prevSeenValues.includes(item[prop])){
            prevSeenValues.push(item[prop]);
        }
    });

    return prevSeenValues;
}