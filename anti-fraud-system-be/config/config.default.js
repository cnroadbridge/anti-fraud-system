/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   * */
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_ataola`;

  // add your middleware config here
  config.middleware = ['cost', 'errorHandler'];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  config.security = {
    xframe: {
      enable: true,
    },
    csrf: {
      enable: true,
      ignore: '/user/login',
      // queryName: '_csrf',
      // bodyName: '_csrf',
      headerName: 'x-csrf-token',
    },
    domainWhiteList: [
      'http://localhost:7001',
      'http://127.0.0.1:7001',
      'http://localhost:9528',
      'http://localhost',
      'http://127.0.0.1',
    ],
  };

  // https://github.com/eggjs/egg-sequelize
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'anti-fraud',
    host: 'hzga-mysql',
    port: 3306,
    username: 'root',
    password: 'ataola',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
    define: {
      timestamps: false,
      underscored: false,
    },
  };

  exports.multipart = {
    mode: 'file',
    fileSize: '100mb',
    whitelist: [
      // images
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.less',
      '.html',
      '.htm',
      '.xml',
      '.xlsx',
      '.xls',
      '.doc',
      '.docx',
      '.ppt',
      '.pptx',
      '.pdf',
      // tar
      '.zip',
      '.rar',
      '.gz',
      '.tgz',
      '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ],
  };

  config.session = {
    key: 'SESSION_ID', // 设置session key,cookie里面的key
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true, // 是否允许js访问session,默认为true,表示不允许js访问
    encrypt: true, // 是否加密
    renew: true, // 重置session的过期时间，延长session过期时间
  };

  config.logger = {
    level: 'NONE',
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false,
  };

  config.errorHandler = {
    match: '/',
  };

  config.customLoader = {
    enum: {
      directory: 'app/enum',
      inject: 'app',
      loadunit: true,
    },
    utils: {
      directory: 'app/utils',
      inject: 'app',
      loadunit: true,
    },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
