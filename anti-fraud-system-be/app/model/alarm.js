'use strict';

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class AlarmModel extends Model {
    static async getAllLimit(
      alarmNo,
      informantName,
      informantBankAccount,
      informantMobile,
      suspectsMobile,
      suspectsBankAccount,
      orgId,
      { page = 0, limit = 10 }
    ) {
      const where = {};
      if (alarmNo) {
        where.alarmNo = { [Op.like]: `%${alarmNo}%` };
      }
      if (informantName) {
        where.informantName = { [Op.like]: `%${informantName}%` };
      }
      if (informantBankAccount) {
        where.informantBankAccount = { [Op.like]: `%${informantBankAccount}%` };
      }
      if (informantMobile) {
        where.informantMobile = { [Op.like]: `%${informantMobile}%` };
      }
      if (suspectsMobile) {
        where.suspectsMobile = { [Op.like]: `%${suspectsMobile}%` };
      }
      if (suspectsBankAccount) {
        where.suspectsBankAccount = { [Op.like]: `%${suspectsBankAccount}%` };
      }
      if (orgId) {
        where.orgId = orgId;
      }
      where.isDelete = 0;
      try {
        const offset = page < 1 ? 1 : (page - 1) * limit;
        const total = await this.count({ where });
        const last = Math.ceil(total / limit);
        const list =
          total === 0
            ? []
            : await this.findAll({
                raw: true,
                where,
                order: [
                  ['createTime', 'DESC'],
                  ['updateTime', 'DESC'],
                ],
                offset,
                limit,
                attributes: {
                  exclude: ['isDelete'],
                },
              });
        logger.info(this.getAllLimit, page, limit, where, list);
        return {
          page,
          pageSize: limit,
          list,
          total,
          last,
        };
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async get(id) {
      const where = { id, isDelete: 0 };
      try {
        const ret = await this.findOne({
          raw: true,
          where,
        });
        logger.info(this.get, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async add(
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
    ) {
      const field = {
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
        yiGeId,
        createTime: utils.date.now(),
        updateTime: utils.date.now(),
      };
      try {
        let ret = await this.create(field, { raw: true });
        ret = ret.toJSON();
        logger.info(this.add, field, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async set(
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
      const field = {
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
        yiGeId,
        updateTime: utils.date.now(),
      };
      const where = { id };
      try {
        const ret = await this.update(field, { where });
        logger.info(this.set, field, where, ret);
        return ret[0];
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async hasYiGeId(yiGeId) {
      const where = { yiGeId };
      try {
        const ret = await this.count({ where });
        logger.info(this.hasYiGeId, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async getByYiGeId(yiGeId) {
      const where = { yiGeId };
      try {
        const ret = await this.findOne({
          raw: true,
          where,
        });
        logger.info(this.getByYiGeId, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }
  }

  AlarmModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      alarmNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      alarmCategory: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      alarmProp: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      crimeCity: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      crimeAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantIdCard: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantGender: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      informantAge: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 0,
      },
      informantMobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantJob: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantBankAccount: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      informantOtherConcact: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      suspectsAccountOrganization: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      suspectsAccount: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      suspectsMobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      suspectsWebSite: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      suspectsOtherConcact: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fraudAmount: {
        type: DataTypes.DOUBLE(11),
        allowNull: true,
      },
      alarmDescribe: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      inputer: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reviewer: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      alarmStatus: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      affix: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      alarmAuditOption: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      orgId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rejectReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      yiGeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      crimeTime: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      isDelete: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 0,
      },
      createTime: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      updateTime: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      sequelize: app.model,
      tableName: 't_alarm',
    }
  );

  return AlarmModel;
};
