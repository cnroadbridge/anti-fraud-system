'use strict';

const { Controller } = require('egg');

class MobileController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { alarmNo, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.mobile.getAllLimit(
      alarmNo,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      const { status } = item;
      let btnList = [];
      if (role === 'operator2') {
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
      suspectsMobile,
      informantMobile,
      stopPaymentAmount,
      crimeTime,
      alarmDescribe,
      operate,
      remark,
      alarmId,
      alarmNo,
      isDelete,
      affix,
    } = ctx.request.body;
    const status = 1;
    const result = await service.mobile.set(
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
    );
    ctx.success(result);
  }
}

module.exports = MobileController;
