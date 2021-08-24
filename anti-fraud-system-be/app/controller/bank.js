'use strict';

const { Controller } = require('egg');

class BankController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { alarmNo, account, bankId, accountType, page, pageSize } =
      ctx.request.query;
    const { list, ...rest } = await service.bank.getAllLimit(
      alarmNo,
      account,
      bankId,
      accountType,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      const { status } = item;
      let btnList = [];
      if (role === 'operator') {
        if (status === 0) {
          btnList = ['check', 'detail'];
        } else if (status === 1) {
          btnList = ['detail'];
        }
      } else {
        btnList = ['detail'];
      }
      return {
        btnList,
        ...item,
      };
    });
    ctx.success({ list: data, ...rest });
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {
      account,
      bankId,
      accountType,
      stopPaymentAmount,
      operate,
      remark,
      alarmId,
      alarmNo,
      isDelete,
      affix,
      crimeTime,
    } = ctx.request.body;
    const status = 1;
    const result = await service.bank.set(
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
    );
    ctx.success(result);
  }
}

module.exports = BankController;
