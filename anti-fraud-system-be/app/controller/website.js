'use strict';

const { Controller } = require('egg');

class WebsiteController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { alarmNo, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.website.getAllLimit(
      alarmNo,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      const { status } = item;
      let btnList = [];
      if (role === 'operator3') {
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
      website,
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
    const result = await service.website.set(
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
    );
    ctx.success(result);
  }
}

module.exports = WebsiteController;
