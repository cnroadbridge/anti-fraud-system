'use strict';

const { Controller } = require('egg');

class VirtualContoller extends Controller {
  async index() {
    const { ctx, service } = this;
    const { alarmNo, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.virtual.getAllLimit(
      alarmNo,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      const { status } = item;
      let btnList = [];
      if (role === 'operator4') {
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
      organization,
      stopPaymentAmount,
      operate,
      remark,
      alarmId,
      alarmNo,
      isDelete,
      crimeTime,
      affix,
    } = ctx.request.body;
    const status = 1;
    const result = await service.virtual.set(
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
    );
    ctx.success(result);
  }
}

module.exports = VirtualContoller;
