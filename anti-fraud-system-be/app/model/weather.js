'use strict';

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class WeatherModel extends Model {
    static async add(
      date,
      high,
      low,
      wendu,
      fengli,
      fengxiang,
      type,
      ganmao,
      city,
      weatherDate
    ) {
      const field = {
        date,
        high,
        low,
        wendu,
        fengli,
        fengxiang,
        type,
        ganmao,
        city,
        weatherDate,
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
      date,
      high,
      low,
      wendu,
      fengli,
      fengxiang,
      type,
      ganmao,
      city,
      weatherDate
    ) {
      const field = {
        date,
        high,
        low,
        wendu,
        fengli,
        fengxiang,
        type,
        ganmao,
        city,
        weatherDate,
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

    static async getWeather(weatherDate, city) {
      const where = { weatherDate, city };
      try {
        const ret = await this.findOne({ raw: true, where });
        logger.info(this.getWeather, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }
  }

  WeatherModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      high: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      low: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      wendu: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fengli: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fengxiang: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ganmao: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      weatherDate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updateTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize: app.model,
      tableName: 't_weather',
    }
  );

  return WeatherModel;
};
