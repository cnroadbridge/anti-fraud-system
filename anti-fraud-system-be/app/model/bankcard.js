'use strict';

const OrganizationModel = require('./organization');

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;
  class BankcardModel extends Model {
    static associate() {
      const { Organization } = app.model;
      BankcardModel.belongsTo(Organization, {
        foreignKey: 'bankId',
        targetKey: 'id',
        as: 'bank',
      });
    }

    static async getAllLimit(name, prefix, bankId, { page = 0, limit = 10 }) {
      let where = {};
      if (name) {
        where = { name: { [Op.like]: `%${name}%` } };
      }
      if (prefix) {
        where.prefix = { [Op.like]: `%${prefix}%` };
      }
      if (bankId) {
        where.bankId = bankId;
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
                attributes: [
                  'id',
                  'name',
                  'prefix',
                  'bankId',
                  [Sequelize.col('bank.name'), 'bankName'],
                ],
                include: {
                  model: app.model.Organization,
                  as: 'bank',
                  attributes: [],
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

    static async hasPrefix(prefix) {
      const where = { prefix };
      try {
        const ret = await this.count({ where });
        logger.info(this.hasPrefix, where, ret);
        return ret;
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

    static async add(name, prefix, bankId) {
      const field = {
        name,
        prefix,
        bankId,
        createTime: utils.date.now(),
        updateTime: utils.date.now(),
      };
      try {
        let ret = await this.create(field, { raw: true });
        ret = ret.toJSON;
        logger.info(this.add, field, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async set(id, name, prefix, bankId, isDelete) {
      const field = {
        name,
        prefix,
        bankId,
        isDelete,
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

  BankcardModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      prefix: {
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
      tableName: 't_bankcard',
    }
  );

  return BankcardModel;
};
