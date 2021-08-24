'use strict';

const { Controller } = require('egg');

class AlarmController extends Controller {
  async index() {
    const { ctx, service } = this;
    const {
      alarmNo,
      informantName,
      informantBankAccount,
      informantMobile,
      suspectsMobile,
      suspectsBankAccount,
      orgId,
      page,
      pageSize,
    } = ctx.request.query;
    const { list, ...rest } = await service.alarm.getAllLimit(
      alarmNo,
      informantName,
      informantBankAccount,
      informantMobile,
      suspectsMobile,
      suspectsBankAccount,
      orgId,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      const { alarmStatus } = item;
      let btnList = [];
      if (alarmStatus === 0) {
        if (role === 'receiver2') {
          btnList = ['detail'];
        } else if (['receiver', 'admin'].includes(role)) {
          btnList = ['detail', 'modify', 'audit', 'delete'];
        }
      } else if (alarmStatus === 1) {
        if (role === 'receiver2') {
          btnList = ['detail'];
        } else if (['receiver', 'admin'].includes(role)) {
          btnList = ['detail', 'modify', 'delete'];
        }
      } else if (alarmStatus === 2) {
        if (role === 'receiver2') {
          btnList = ['detail', 'modify'];
        } else if (['receiver', 'admin'].includes(role)) {
          btnList = ['detail', 'modify', 'delete'];
        }
      }
      return {
        btnList,
        ...item,
      };
    });
    ctx.success({ list: data, ...rest });
  }

  async create() {
    const { ctx, service } = this;
    const {
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
      crimeTime,
      orgId,
    } = ctx.request.body;
    const defaultInformantAge = informantAge || 0;
    const defaultFraudAmount = fraudAmount || 0;
    const yiGeId = null;
    if (ctx.session.userinfo) {
      const { role: userRole } = ctx.session.userinfo;
      if (['admin', 'receiver'].includes(userRole)) {
        const alarmStatus = 1;
        const alarmAuditOption = '通过';
        const rejectReason = '';
        const result = await service.alarm.add(
          alarmNo,
          alarmCategory,
          alarmProp,
          crimeCity,
          crimeAddress,
          informantName,
          informantIdCard,
          informantGender,
          defaultInformantAge,
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
          defaultFraudAmount,
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
        );
        const { id: alarmId } = result;
        const { type } = await service.organization.get(
          suspectsAccountOrganization
        );
        if ([4, 5, 6].includes(type)) {
          const arr = suspectsAccount.split(',');
          arr.forEach(item => {
            service.virtual.add(
              item,
              suspectsAccountOrganization,
              alarmId,
              alarmNo,
              crimeTime
            );
          });
        } else if (type === 1) {
          const arr = suspectsAccount.split(',');
          arr.forEach(item => {
            service.bank.add(
              item,
              suspectsAccountOrganization,
              alarmId,
              alarmNo,
              crimeTime
            );
          });
        }

        if (suspectsMobile) {
          const arr = suspectsMobile.split(',');
          arr.forEach(item => {
            service.mobile.add(
              item,
              informantMobile,
              crimeTime,
              alarmId,
              alarmNo,
              alarmDescribe
            );
          });
        }

        if (suspectsWebSite) {
          const arr = suspectsWebSite.split(',');
          arr.forEach(item => {
            service.website.add(item, alarmId, alarmNo, crimeTime);
          });
        }

        ctx.success(result);
      } else if (userRole === 'receiver2') {
        const alarmStatus = 0;
        const alarmAuditOption = '';
        const rejectReason = '';
        const result = await service.alarm.add(
          alarmNo,
          alarmCategory,
          alarmProp,
          crimeCity,
          crimeAddress,
          informantName,
          informantIdCard,
          informantGender,
          defaultInformantAge,
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
          defaultFraudAmount,
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
        );
        ctx.success(result);
      } else {
        ctx.throw('无权限操作');
      }
    } else {
      ctx.throw('无权限操作');
    }
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {
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
      affix,
      alarmAuditOption,
      rejectReason,
      crimeTime,
      isDelete,
      orgId,
    } = ctx.request.body;
    if (ctx.session.userinfo) {
      const { role: userRole, username: reviewer } = ctx.session.userinfo;
      if (['admin', 'receiver'].includes(userRole)) {
        let alarmStatus = 1;
        if (inputer !== reviewer) {
          alarmStatus = alarmAuditOption === '通过' ? 1 : 2;
          if (alarmAuditOption === '通过') {
            const { type } = await service.organization.get(
              suspectsAccountOrganization
            );
            if ([4, 5, 6].includes(type)) {
              const arr = suspectsAccount.split(',');
              arr.forEach(item => {
                service.virtual.add(
                  item,
                  suspectsAccountOrganization,
                  id,
                  alarmNo,
                  crimeTime
                );
              });
            } else if (type === 1) {
              const arr = suspectsAccount.split(',');
              arr.forEach(item => {
                service.bank.add(
                  item,
                  suspectsAccountOrganization,
                  id,
                  alarmNo,
                  crimeTime
                );
              });
            }

            if (suspectsMobile) {
              const arr = suspectsMobile.split(',');
              arr.forEach(item => {
                service.mobile.add(
                  item,
                  informantMobile,
                  crimeTime,
                  id,
                  alarmNo,
                  alarmDescribe
                );
              });
            }

            if (suspectsWebSite) {
              const arr = suspectsWebSite.split(',');
              arr.forEach(item => {
                service.website.add(item, id, alarmNo, crimeTime);
              });
            }
          }
        }
        const result = await service.alarm.set(
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
          orgId
        );
        ctx.success(result);
      } else if (userRole === 'receiver2') {
        const alarmStatus = 0;
        const result = await service.alarm.set(
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
          orgId
        );
        ctx.success(result);
      } else {
        ctx.throw('无权限操作');
      }
    } else {
      ctx.throw('无权限操作');
    }
  }
}

module.exports = AlarmController;
