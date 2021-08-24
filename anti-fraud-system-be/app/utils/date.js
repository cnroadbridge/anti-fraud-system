const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/ShangHai');

exports.now = () => dayjs().unix();

exports.formatDate = time => dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');

exports.formatMonth = time => dayjs(time).format('YYYY-MM');

exports.transformDate = function (date) {
  return dayjs(date).unix();
};

exports.getMonthArr = function (start, end) {
  // 传入的格式YYYY-MM
  const result = [];
  const s = start.split('-');
  const e = end.split('-');
  const min = new Date();
  const max = new Date();
  let value;
  min.setFullYear(s[0], s[1] * 1 - 1, 1); // 开始日期
  max.setFullYear(e[0], e[1] * 1 - 1, 1); // 结束日期
  const curr = min;
  while (curr <= max) {
    value = dayjs(curr).format('YYYY-MM');
    const month = curr.getMonth();
    const year = curr.getFullYear();

    let str = `${curr.getFullYear()}-${month}`;
    const str2 = `${curr.getFullYear()}-0`;
    if (str === str2) {
      str = `${curr.getFullYear()}-1`;
    }
    const m = month + 1;
    result.push({
      value,
      name: `${year}年${m}月`,
    });
    curr.setMonth(month + 1);
  }
  return result;
};
