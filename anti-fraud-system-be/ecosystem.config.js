module.exports = {
  apps: [
    {
      name: 'server',
      script: './server.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production',
        PORT: 7001,
      },
    },
  ],
};
