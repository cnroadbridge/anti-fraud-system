'use strict';

const { Service } = require('egg');

class MobileService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Mobile = this.ctx.model.Mobile;
  }

  async add(
    suspectsMobile,
    informantMobile,
    crimeTime,
    alarmId,
    alarmNo,
    alarmDescribe,
    stopPaymentAmount,
    status,
    operate,
    remark,
    affix = ''
  ) {
    const { ctx, Mobile } = this;
    const result = await Mobile.add(
      suspectsMobile,
      informantMobile,
      crimeTime,
      alarmId,
      alarmNo,
      alarmDescribe,
      stopPaymentAmount,
      status,
      operate,
      remark,
      affix
    );
    if (!result) {
      ctx.throw('添加电话查控失败');
    }
  }

  async getAllLimit(alarmNo, page, limit) {
    const { ctx, Mobile } = this;
    const result = await Mobile.getAllLimit(alarmNo, { page, limit });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(
    id,
    suspectsMobile,
    informantMobile,
    crimeTime,
    alarmDescribe,
    stopPaymentAmount,
    status,
    operate,
    remark,
    isDelete,
    alarmId,
    alarmNo,
    affix
  ) {
    const { ctx, Mobile } = this;
    const result = await Mobile.set(
      id,
      suspectsMobile,
      informantMobile,
      crimeTime,
      alarmId,
      alarmNo,
      alarmDescribe,
      stopPaymentAmount,
      status,
      operate,
      remark,
      isDelete,
      affix
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }
}

module.exports = MobileService;
