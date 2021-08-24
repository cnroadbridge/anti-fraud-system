const { v4: uuidv4 } = require('uuid');

function generateUUID() {
  return uuidv4().replace(/-/g, '');
}

function getNo(num) {
  const numStr = `000${(num % 1000).toString()}`;
  return numStr.slice(-3);
}

module.exports = {
  generateUUID,
  getNo,
};
