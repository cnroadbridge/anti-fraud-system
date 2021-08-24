'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);
  router.post('/user/info', controller.user.getUserInfo);
  router.post('/file/upload', controller.file.upload);
  router.post('/file/getall', controller.file.getAllByIds);
  router.post('/organization/by-type', controller.organization.getAllByType);
  router.post('/statistics/calculate', controller.statistics.calculate);

  function resource(path) {
    const pathArr = path.split('/');

    // 删掉第一个空白的
    pathArr.shift();

    let controllers = controller;
    for (const val of pathArr) {
      controllers = controllers[val];
    }

    router.resources(path, path, controllers);
  }

  resource('/alarm');
  resource('/bank');
  resource('/bankcard');
  resource('/mobile');
  resource('/organization');
  resource('/user');
  resource('/virtual');
  resource('/website');
  resource('/file');
  resource('/alarmCategory');
};
