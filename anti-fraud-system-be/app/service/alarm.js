'use strict';

const { Service } = require('egg');

class AlarmService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Alarm = this.ctx.model.Alarm;
  }

  async add(
    alarmNo,
    alarmCategory,
    alarmProp,
    crimeCity,
    crimeAddress,
    informantName,
    informantIdCard,
    informantGender,
    informantAge,
    informantMobile,
    informantJob,
    informantBankAccount,
    informantAddress,
    informantOtherConcact,
    suspectsAccountOrganization,
    suspectsAccount,
    suspectsMobile,
    suspectsWebSite,
    suspectsOtherConcact,
    fraudAmount,
    alarmDescribe,
    inputer,
    reviewer,
    affix,
    alarmAuditOption,
    rejectReason,
    crimeTime,
    alarmStatus,
    orgId,
    yiGeId
  ) {
    const { ctx, Alarm } = this;
    const result = await Alarm.add(
      alarmNo,
      alarmCategory,
      alarmProp,
      crimeCity,
      crimeAddress,
      informantName,
      informantIdCard,
      informantGender,
      informantAge,
      informantMobile,
      informantJob,
      informantBankAccount,
      informantAddress,
      informantOtherConcact,
      suspectsAccountOrganization,
      suspectsAccount,
      suspectsMobile,
      suspectsWebSite,
      suspectsOtherConcact,
      fraudAmount,
      alarmDescribe,
      inputer,
      reviewer,
      alarmStatus,
      affix,
      alarmAuditOption,
      rejectReason,
      crimeTime,
      orgId,
      yiGeId
    );
    if (!result) {
      ctx.throw('添加警情失败');
    }
    return result;
  }

  async getAllLimit(
    alarmNo,
    informantName,
    informantBankAccount,
    informantMobile,
    suspectsMobile,
    suspectsBankAccount,
    orgId,
    page,
    limit
  ) {
    const { ctx, Alarm } = this;
    const result = await Alarm.getAllLimit(
      alarmNo,
      informantName,
      informantBankAccount,
      informantMobile,
      suspectsMobile,
      suspectsBankAccount,
      orgId,
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
    alarmNo,
    alarmCategory,
    alarmProp,
    crimeCity,
    crimeAddress,
    informantName,
    informantIdCard,
    informantGender,
    informantAge,
    informantMobile,
    informantJob,
    informantBankAccount,
    informantAddress,
    informantOtherConcact,
    suspectsAccountOrganization,
    suspectsAccount,
    suspectsMobile,
    suspectsWebSite,
    suspectsOtherConcact,
    fraudAmount,
    alarmDescribe,
    inputer,
    reviewer,
    alarmStatus,
    affix,
    alarmAuditOption,
    rejectReason,
    crimeTime,
    isDelete,
    orgId,
    yiGeId
  ) {
    const { ctx, Alarm } = this;
    const result = await Alarm.set(
      id,
      alarmNo,
      alarmCategory,
      alarmProp,
      crimeCity,
      crimeAddress,
      informantName,
      informantIdCard,
      informantGender,
      informantAge,
      informantMobile,
      informantJob,
      informantBankAccount,
      informantAddress,
      informantOtherConcact,
      suspectsAccountOrganization,
      suspectsAccount,
      suspectsMobile,
      suspectsWebSite,
      suspectsOtherConcact,
      fraudAmount,
      alarmDescribe,
      inputer,
      reviewer,
      alarmStatus,
      affix,
      alarmAuditOption,
      rejectReason,
      crimeTime,
      isDelete,
      orgId,
      yiGeId
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async getByYiGeId(yiGeId) {
    const { Alarm } = this;
    const result = await Alarm.getByYiGeId(yiGeId);
    return result;
  }

  async hasYiGeId(yiGeId) {
    const { Alarm } = this;
    const result = await Alarm.hasYiGeId(yiGeId);
    return result;
  }
}

module.exports = AlarmService;
