'use strict';

const { Controller } = require('egg');

class AlarmCategoryController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { name, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.alarmCategory.getAllLimit(
      name,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      let btnList = [];
      if (role === 'admin') {
        btnList = ['detail', 'modify', 'delete'];
      }
      return {
        btnList,
        ...item,
      };
    });
    ctx.success({ list: data, ...rest });
  }

  async create() {
    const { ctx, service } = this;
    const { name } = ctx.request.body;
    const result = await service.alarmCategory.add(name);
    ctx.success(result);
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { name, isDelete } = ctx.request.body;
    const result = await service.alarmCategory.set(id, name, isDelete);
    ctx.success(result);
  }
}

module.exports = AlarmCategoryController;
