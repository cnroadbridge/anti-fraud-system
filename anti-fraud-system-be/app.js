module.exports = app => {
  app.beforeStart(async () => {
    try {
      const result = await app.curl(
        'https://registry.npm.taobao.org/egg/latest',
        {
          dataType: 'json',
        }
      );
      app.logger.info('Egg latest version: %s', result.data.version);
    } catch(e) {
      app.logger.error(e);
    }
  });
};
