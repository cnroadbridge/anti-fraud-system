// server.js
const egg = require('egg');

// eslint-disable-next-line global-require
const workers = Number(process.argv[2] || require('os').cpus().length);

egg.startCluster({
  workers,
  baseDir: __dirname,
  port: 7001,
});
