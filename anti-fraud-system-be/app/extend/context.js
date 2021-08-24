'use strict';

module.exports = {
  success(data, message = 'success') {
    const res = {
      status: 200,
      message,
      data,
    };

    this.app.logger.info(JSON.stringify(res));

    this.body = res;
  },
};
