'use strict';

const { Service } = require('egg');

class BankcardService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Bankcard = this.ctx.model.Bankcard;
  }

  async add(name, prefix, bankId) {
    const { ctx, Bankcard } = this;
    let result = await Bankcard.hasPrefix(prefix);
    if (result) {
      ctx.throw('卡号前缀已存在');
    }
    result = await Bankcard.add(name, prefix, bankId);
    if (!result) {
      ctx.throw('添加卡号失败');
    }
    return result;
  }

  async getAllLimit(name, prefix, bankId, page, limit) {
    const { ctx, Bankcard } = this;
    const result = await Bankcard.getAllLimit(name, prefix, bankId, {
      page,
      limit,
    });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(id, name, prefix, bankId, isDelete) {
    const { ctx, Bankcard } = this;
    const result = await Bankcard.set(id, name, prefix, bankId, isDelete);
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }
}

module.exports = BankcardService;
