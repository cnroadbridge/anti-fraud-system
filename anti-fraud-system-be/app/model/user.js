'use strict';

const OrganizationModel = require('./organization');

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class UserModel extends Model {
    static associate() {
      const { Organization } = app.model;
      UserModel.belongsTo(Organization, {
        foreignKey: 'orgId',
        targetKey: 'id',
        as: 'org',
      });
    }

    static async getAllLimit(username, role, { page = 0, limit = 10 }) {
      let where = {};
      if (username) {
        where = { username: { [Op.like]: `%${username}%` } };
      }
      if (role) {
        where.role = { [Op.like]: `%${role}%` };
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
                  'username',
                  'nickname',
                  'password',
                  'mobile',
                  'role',
                  'orgId',
                  [Sequelize.col('org.name'), 'orgName'],
                  [Sequelize.col('org.code'), 'orgCode'],
                  [Sequelize.col('org.type'), 'orgType'],
                ],
                include: {
                  model: app.model.Organization,
                  as: 'org',
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

    static async hasName(username) {
      const where = { username };
      try {
        const ret = await this.count({ where });
        logger.info(this.hasName, where, ret);
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

    static async find(username, password) {
      const where = { username, password };
      try {
        const ret = await this.findOne({
          raw: true,
          where,
        });
        logger.info(this.find, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async add(username, password, mobile, role, orgId, nickname) {
      const field = {
        username,
        password,
        mobile,
        role,
        orgId,
        nickname,
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
      username,
      password,
      mobile,
      role,
      orgId,
      isDelete,
      nickname
    ) {
      const field = {
        username,
        password,
        mobile,
        role,
        orgId,
        isDelete,
        nickname,
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

  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 123456,
      },
      mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      orgId: {
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
      tableName: 't_user',
    }
  );

  return UserModel;
};
