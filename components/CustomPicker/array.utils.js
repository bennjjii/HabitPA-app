export function find(array, predicate) {
  return array.find(predicate);
}

export function findIndex(array, predicate) {
  return array.findIndex(predicate);
}

// merge an array of objects into a single object
export function merge(array, options) {
  return array.reduce((result, item) => {
    Object.keys(item).forEach(key => {
      result[key] = item[key];
    });
    return result;
  }, options);
}
