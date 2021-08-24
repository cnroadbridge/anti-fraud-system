const fs = require('fs');

function readFileSync(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function writeFileSync(path, data) {
  fs.writeFileSync(path, data);
}

module.exports = {
  readFileSync,
  writeFileSync,
};
