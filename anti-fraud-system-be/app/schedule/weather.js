const { Subscription } = require('egg');

const URL_PREFIX = 'http://wthrcdn.etouch.cn/weather_mini?city=';
const CITYS = [
  '杭州',
  '北京',
  '南京',
  '上海',
  '广州',
  '深圳',
  '成都',
  '武汉',
  '郑州',
  '哈尔滨',
  '海口',
  '三亚',
  '乌鲁木齐',
  '呼和浩特',
  '拉萨',
  '大理',
  '丽江',
];
const DAY_TIMESTAMP = 86400000;

class WeatherSchedule extends Subscription {
  static get schedule() {
    return {
      interval: '12h',
      type: 'worker',
    };
  }

  async refreshWeatherData(
    date,
    high,
    low,
    wendu = null,
    fengli,
    fengxiang,
    type,
    ganmao = null,
    city,
    weatherDate
  ) {
    const weather = await this.service.weather.getWeather(weatherDate, city);
    if (weather) {
      const { id, wendu: oldWendu, ganmao: oldGanmao } = weather;
      const newWendu = oldWendu || wendu;
      const newGanmao = oldGanmao || ganmao;
      await this.service.weather.set(
        id,
        date,
        high,
        low,
        newWendu,
        fengli,
        fengxiang,
        type,
        newGanmao,
        city,
        weatherDate
      );
    } else {
      await this.service.weather.add(
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
    }
  }

  async fetchData(queryCity) {
    const res = await this.ctx.curl(`${URL_PREFIX}${queryCity}`, {
      dataType: 'json',
    });
    const {
      data: { city, forecast = [], ganmao, wendu },
    } = res.data;
    const result = [];
    const now = this.ctx.app.utils.date.now() * 1000;
    for (let i = 0; i < forecast.length; i++) {
      const { date, high, fengli, low, fengxiang, type } = forecast[i];
      const weatherDate = this.ctx.app.utils.date.format2Date(
        now + i * DAY_TIMESTAMP
      );
      if (i === 0) {
        result.push(
          this.refreshWeatherData(
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
          )
        );
      } else {
        result.push(
          this.refreshWeatherData(
            date,
            high,
            low,
            null,
            fengli,
            fengxiang,
            type,
            null,
            city,
            weatherDate
          )
        );
      }
    }
    await Promise.all(result);
  }

  async subscribe() {
    try {
      const result = [];
      for (const city of CITYS) {
        result.push(this.fetchData(city));
      }
      await Promise.all(result);
    } catch (e) {
      this.ctx.app.logger.error(e);
    }
  }
}

module.exports = WeatherSchedule;
