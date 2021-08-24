'use strict';

const { Service } = require('egg');

class WeatherService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Weather = this.ctx.model.Weather;
  }

  async add(
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
    const { ctx, Weather } = this;
    const result = await Weather.add(
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
    );
    if (!result) {
      ctx.throw('添加天气失败');
    }
    return result;
  }

  async set(
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
    const { ctx, Weather } = this;
    const result = await Weather.set(
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
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async getWeather(weatherDate, city) {
    const { Weather } = this;
    const result = await Weather.getWeather(weatherDate, city);
    return result;
  }
}

module.exports = WeatherService;
