'use strict';

const AlarmModel = require('./alarm');
const OrganizationModel = require('./organization');

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class BankModel extends Model {
    static associate() {
      const { Alarm, Organization } = app.model;
      BankModel.belongsTo(Alarm, {
        foreignKey: 'alarmId',
        targetKey: 'id',
        as: 'alarm',
      });
      BankModel.belongsTo(Organization, {
        foreignKey: 'bankId',
        targetKey: 'id',
        as: 'org',
      });
    }

    static async getTotal(start, end) {
      const where = {
        crimeTime: {
          [Op.between]: [start, end],
        },
      };
      try {
        const ret = await this.count({ where });
        logger.info(this.getTotal, start, end, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async getAllByCrimeTime(start, end) {
      const where = {
        crimeTime: {
          [Op.between]: [start, end],
        },
      };
      try {
        const ret = await this.findAll({
          raw: true,
          attributes: ['id', 'stopPaymentAmount', 'crimeTime'],
          where,
        });
        logger.info(this.getAllByCrimeTime, start, end, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async getAllLimit(
      alarmNo,
      account,
      bankId,
      accountType,
      { page = 0, limit = 10 }
    ) {
      let where = {};
      if (alarmNo) {
        where = {
          alarmNo: { [Op.like]: `%${alarmNo}%` },
        };
      }
      if (account) {
        where.account = { [Op.like]: `%${account}%` };
      }
      if (bankId) {
        where.bankId = bankId;
      }
      if (accountType) {
        where.accountType = accountType;
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
                include: [
                  {
                    model: app.model.Organization,
                    as: 'org',
                    attributes: [],
                  },
                  {
                    model: app.model.Alarm,
                    as: 'alarm',
                    attributes: [],
                  },
                ],
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
    ) {
      const field = {
        account,
        bankId,
        alarmNo,
        crimeTime,
        accountType,
        stopPaymentAmount,
        operate,
        remark,
        status,
        alarmId,
        affix,
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
    ) {
      const field = {
        account,
        bankId,
        alarmNo,
        accountType,
        stopPaymentAmount,
        operate,
        remark,
        status,
        alarmId,
        isDelete,
        affix,
        crimeTime,
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
  }
  BankModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      account: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bankId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: OrganizationModel,
          key: 'id',
        },
      },
      alarmNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      accountType: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      stopPaymentAmount: {
        type: DataTypes.DOUBLE(11),
        allowNull: true,
      },
      crimeTime: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      operate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 0,
      },
      affix: {
        type: DataTypes.STRING(255),
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
      alarmId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: AlarmModel,
          key: 'id',
        },
      },
    },
    {
      sequelize: app.model,
      tableName: 't_bank',
    }
  );

  return BankModel;
};
