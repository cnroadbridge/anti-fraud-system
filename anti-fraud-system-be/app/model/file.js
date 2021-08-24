'use strict';

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class FileModel extends Model {
    static async getAllByIds(ids = []) {
      console.log('ids: ', ids);
      const where = {
        id: ids,
        isDelete: 0,
      };
      try {
        const ret = await this.findAll({
          raw: true,
          where,
          order: [
            ['createTime', 'DESC'],
            ['updateTime', 'DESC'],
          ],
        });
        logger.info(this.getAllByIds, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async get(id) {
      const where = { id };
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

    static async add(filename, type, size, path, createBy) {
      const field = {
        filename,
        type,
        size,
        path,
        createBy,
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

    static async set(id, filename, type, size, path, createBy, isDelete) {
      const field = {
        filename,
        type,
        size,
        path,
        createBy,
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

  FileModel.init(
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      filename: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createBy: {
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
    },
    {
      sequelize: app.model,
      tableName: 't_file',
    }
  );

  return FileModel;
};
