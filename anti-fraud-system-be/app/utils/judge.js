function isObject(obj) {
  const objType = Object.prototype.toString.call(obj);
  return (
    objType === '[object Object]' ||
    objType === '[object Array]' ||
    objType === '[object Null]'
  );
}

module.exports = {
  isObject,
};
