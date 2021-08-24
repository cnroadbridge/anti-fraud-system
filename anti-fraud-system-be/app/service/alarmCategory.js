'use strict';

const { Service } = require('egg');

class AlarmCategoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.AlarmCategory = this.ctx.model.AlarmCategory;
  }

  async add(name) {
    const { ctx, AlarmCategory } = this;
    let result = await AlarmCategory.hasName(name);
    if (result) {
      ctx.throw('警情类别已存在');
    }
    result = await AlarmCategory.add(name);
    if (!result) {
      ctx.throw('添加警情类别失败');
    }
    return result;
  }

  async getAllLimit(name, page, limit) {
    const { ctx, AlarmCategory } = this;
    const result = await AlarmCategory.getAllLimit(name, { page, limit });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(id, name, isDelete) {
    const { ctx, AlarmCategory } = this;
    if (id === 1 && isDelete === 1) {
      ctx.throw('反诈一哥为内部类型，不可删除');
    }
    const result = await AlarmCategory.set(id, name, isDelete);
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }
}

module.exports = AlarmCategoryService;
