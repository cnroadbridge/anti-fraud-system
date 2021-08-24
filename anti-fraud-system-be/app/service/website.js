'use strict';

const { Service } = require('egg');

class WebsiteService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Website = this.ctx.model.Website;
  }

  async add(
    website,
    alarmId,
    alarmNo,
    crimeTime,
    stopPaymentAmount,
    operate,
    remark,
    status,
    affix = ''
  ) {
    const { ctx, Website } = this;
    const result = await Website.add(
      website,
      alarmId,
      alarmNo,
      crimeTime,
      stopPaymentAmount,
      operate,
      remark,
      status,
      affix
    );
    if (!result) {
      ctx.throw('添加网站查控失败');
    }
    return result;
  }

  async set(
    id,
    website,
    stopPaymentAmount,
    operate,
    remark,
    status,
    isDelete,
    alarmId,
    alarmNo,
    affix,
    crimeTime
  ) {
    const { ctx, Website } = this;
    const result = await Website.set(
      id,
      website,
      stopPaymentAmount,
      operate,
      remark,
      status,
      alarmId,
      alarmNo,
      isDelete,
      affix,
      crimeTime
    );
    if (!result) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async getAllLimit(alarmNo, page, limit) {
    const { ctx, Website } = this;
    const result = await Website.getAllLimit(alarmNo, { page, limit });
    if (result === null) {
      ctx.throw('暂无数据');
    }
    return result;
  }
}

module.exports = WebsiteService;
