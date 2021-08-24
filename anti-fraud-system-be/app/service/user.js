'use strict';

const { Service } = require('egg');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.User = this.ctx.model.User;
  }

  async add(username, password, mobile, role, orgId, nickname) {
    const { ctx, User } = this;
    let result = await User.hasName(username);
    if (result) {
      ctx.throw('用户名已存在');
    }
    result = await User.add(username, password, mobile, role, orgId, nickname);
    if (!result) {
      ctx.throw('添加用户失败');
    }
    return result;
  }

  async getAllLimit(username, role, page, limit) {
    const { ctx, User } = this;
    const result = await User.getAllLimit(username, role, { page, limit });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async find(username, password) {
    const { ctx, User } = this;
    const result = await User.find(username, password);
    if (!result) {
      ctx.throw('用户不存在');
    } else if (password !== result.password) {
      ctx.throw('密码错误');
    }
    return result;
  }

  async set(id, username, password, mobile, role, orgId, isDelete, nickname) {
    const { ctx, User } = this;
    const result = await User.set(
      id,
      username,
      password,
      mobile,
      role,
      orgId,
      isDelete,
      nickname
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }
}

module.exports = UserService;
