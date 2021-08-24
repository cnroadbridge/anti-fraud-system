'use strict';

const { Service } = require('egg');

class VirtualService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Virtual = this.ctx.model.Virtual;
  }

  async add(
    account,
    organization,
    alarmId,
    alarmNo,
    crimeTime,
    stopPaymentAmount,
    operate,
    remark,
    status,
    affix = ''
  ) {
    const { ctx, Virtual } = this;
    const result = await Virtual.add(
      account,
      organization,
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
      ctx.throw('添加虚拟账号查控失败');
    }
    return result;
  }

  async set(
    id,
    account,
    organization,
    stopPaymentAmount,
    operate,
    remark,
    status,
    isDelete,
    alarmId,
    alarmNo,
    crimeTime,
    affix
  ) {
    const { ctx, Virtual } = this;
    const result = await Virtual.set(
      id,
      account,
      organization,
      alarmId,
      alarmNo,
      stopPaymentAmount,
      operate,
      remark,
      status,
      isDelete,
      crimeTime,
      affix
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async getAllLimit(alarmNo, page, limit) {
    const { ctx, Virtual } = this;
    const result = await Virtual.getAllLimit(alarmNo, { page, limit });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }
}

module.exports = VirtualService;
