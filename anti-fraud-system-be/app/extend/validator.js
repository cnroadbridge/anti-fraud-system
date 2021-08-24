/* eslint-disable consistent-return */

'use strict';

module.exports = app => {
  const { addRule } = app.validator;

  addRule('mobile', (rule, value) => {
    app.logger.info(rule, value);
    if (!/^1\d{10}$/.test(value)) {
      return '错误的手机号码';
    }
  });

  addRule('loginname', (rule, value) => {
    app.logger.info(rule, value);
    if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
      return '账号必须为6-20位字母和数字组合';
    }
  });

  addRule('number', (rule, value) => {
    app.logger.info(rule, value);
    if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
      return '数字格式不正确';
    }
  });

  addRule('chinese', (rule, value) => {
    app.logger.info(rule, value);
    if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
      return '输入字符不是中文';
    }
  });

  addRule('password', (rule, value) => {
    app.logger.info(rule, value);
    if (
      !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(
        value
      )
    ) {
      return '请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种';
    }
  });
};
