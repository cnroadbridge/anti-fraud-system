'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    if (ctx.session.userinfo) {
      const { role: userRole } = ctx.session.userinfo;
      if (userRole !== 'admin') {
        ctx.throw('无权限操作');
      }
    } else {
      ctx.throw('无权限操作');
    }
    const { username, role, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.user.getAllLimit(
      username,
      role,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role: userRole } = ctx.session.userinfo;
      let btnList = [];
      if (userRole === 'admin') {
        btnList = ['detail', 'modify', 'delete'];
      }
      return {
        btnList,
        ...item,
      };
    });
    ctx.success({ list: data, ...rest });
  }

  async create() {
    const { ctx, service } = this;
    const { username, password, mobile, role, orgId, nickname } =
      ctx.request.body;
    ctx.validate(
      {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
        mobile: { type: 'string', required: true },
        role: { type: 'string', required: true },
        orgId: { type: 'string', required: true },
      },
      { username, password, mobile, role, orgId }
    );
    const result = await service.user.add(
      username,
      password,
      mobile,
      role,
      orgId,
      nickname
    );
    ctx.success(result);
  }

  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const result = await service.user.find(username, password);
    ctx.session.userinfo = result;
    ctx.success({ token: result.id });
  }

  async logout() {
    const { ctx } = this;
    ctx.session.userinfo = null;
    ctx.success({ data: 1 });
  }

  async getUserInfo() {
    const { ctx } = this;
    const { token } = ctx.request.body;
    if (ctx.session.userinfo && ctx.session.userinfo.id === token) {
      const { role, ...rest } = ctx.session.userinfo;
      const roles = role.split(',');
      ctx.success({ roles, ...rest });
    } else {
      ctx.throw('请先登录');
    }
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { username, password, mobile, role, orgId, isDelete, nickname } =
      ctx.request.body;
    const result = await service.user.set(
      id,
      username,
      password,
      mobile,
      role,
      orgId,
      isDelete,
      nickname
    );
    ctx.success(result);
  }
}

module.exports = UserController;
