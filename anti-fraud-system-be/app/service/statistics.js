'use strict';

const { Service } = require('egg');

class StatisticsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Bank = this.ctx.model.Bank;
    this.Mobile = this.ctx.model.Mobile;
    this.Virtual = this.ctx.model.Virtual;
    this.Website = this.ctx.model.Website;
  }

  async calculateCount(start, end) {
    const { Bank, Mobile, Virtual, Website } = this;
    const bankCount = await Bank.getTotal(start, end + 2592000);
    const mobileCount = await Mobile.getTotal(start, end + 2592000);
    const virtualCount = await Virtual.getTotal(start, end + 2592000);
    const websiteCount = await Website.getTotal(start, end + 2592000);
    return [
      { name: '银行查控', count: bankCount || 0 },
      { name: '电话查控', count: mobileCount || 0 },
      { name: '虚拟账号查控', count: virtualCount || 0 },
      { name: '网站查控', count: websiteCount || 0 },
    ];
  }

  async calculateAmount(start) {
    const { Bank, Mobile, Virtual, Website } = this;
    const bankArr = await Bank.getAllByCrimeTime(start, start + 2592000);
    const bankAmount = bankArr
      .map(item => item.stopPaymentAmount)
      .filter(item => item && Number(item).toString() !== 'NaN')
      .reduce((pre, next) => pre + next, 0);
    const mobileArr = await Mobile.getAllByCrimeTime(start, start + 2592000);
    const mobileAmount = mobileArr
      .map(item => item.stopPaymentAmount)
      .filter(item => item && Number(item).toString() !== 'NaN')
      .reduce((pre, next) => pre + next, 0);
    const virtualArr = await Virtual.getAllByCrimeTime(start, start + 2592000);
    const virtualAmount = virtualArr
      .map(item => item.stopPaymentAmount)
      .filter(item => item && Number(item).toString() !== 'NaN')
      .reduce((pre, next) => pre + next, 0);
    const websiteArr = await Website.getAllByCrimeTime(start, start + 2592000);
    const websiteAmount = websiteArr
      .map(item => item.stopPaymentAmount)
      .filter(item => item && Number(item).toString() !== 'NaN')
      .reduce((pre, next) => pre + next, 0);
    return bankAmount + mobileAmount + virtualAmount + websiteAmount;
  }
}

module.exports = StatisticsService;
