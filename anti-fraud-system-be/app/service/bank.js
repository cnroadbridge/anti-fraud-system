'use strict';

const { Service } = require('egg');

class BankService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Bank = this.ctx.model.Bank;
  }

  async add(
    account,
    bankId,
    alarmId,
    alarmNo,
    crimeTime,
    accountType,
    stopPaymentAmount,
    operate,
    remark,
    status,
    affix = ''
  ) {
    const { ctx, Bank } = this;
    const result = await Bank.add(
      account,
      bankId,
      alarmId,
      alarmNo,
      crimeTime,
      accountType,
      stopPaymentAmount,
      operate,
      remark,
      status,
      affix
    );
    if (!result) {
      ctx.throw('添加银行查控失败');
    }
    return result;
  }

  async getAllLimit(alarmNo, account, bankId, accountType, page, limit) {
    const { ctx, Bank } = this;
    const result = await Bank.getAllLimit(
      alarmNo,
      account,
      bankId,
      accountType,
      {
        page,
        limit,
      }
    );
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(
    id,
    account,
    bankId,
    accountType,
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
    const { ctx, Bank } = this;
    const result = await Bank.set(
      id,
      account,
      bankId,
      alarmId,
      alarmNo,
      accountType,
      stopPaymentAmount,
      operate,
      remark,
      status,
      isDelete,
      affix,
      crimeTime
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }
}

module.exports = BankService;
