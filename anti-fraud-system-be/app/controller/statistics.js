/* eslint-disable no-await-in-loop */

'use strict';

const { Controller } = require('egg');

class StatisticsController extends Controller {
  async calculate() {
    const { ctx, service } = this;
    const { start, end } = ctx.request.body;
    const startUinx = this.ctx.app.utils.date.transformDate(start);
    const endUnix = this.ctx.app.utils.date.transformDate(end);
    const pieData = await service.statistics.calculateCount(startUinx, endUnix);
    const monthArr = this.ctx.app.utils.date.getMonthArr(start, end);
    const barData = [];
    let totalAmount = 0;
    for (const month of monthArr) {
      const { name, value } = month;
      const unix = this.ctx.app.utils.date.transformDate(value);
      const amount = await service.statistics.calculateAmount(unix);
      totalAmount += amount;
      barData.push({ name, amount });
    }

    ctx.success({ pieData, barData, totalAmount });
  }
}

module.exports = StatisticsController;
