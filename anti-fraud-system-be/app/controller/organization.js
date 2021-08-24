'use strict';

const { Controller } = require('egg');

class OrganizationController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { name, code, type, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.organization.getAllLimit(
      name,
      code,
      Number(type),
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      let btnList = [];
      if (role === 'admin') {
        btnList = ['detail', 'modify', 'delete'];
      }
      return {
        btnList,
        ...item,
      };
    });
    ctx.success({ list: data, ...rest });
  }

  async getAllByType() {
    const { ctx, service } = this;
    const { type, page, pageSize } = ctx.request.body;
    const { list, ...rest } = await service.organization.getAllByType(
      type,
      Number(page),
      Number(pageSize)
    );
    const data = list.map(item => {
      const { role } = ctx.session.userinfo;
      let btnList = [];
      if (role === 'admin') {
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
    const { name, code, type } = ctx.request.body;
    const result = await service.organization.add(name, code, type);
    ctx.success(result);
  }

  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const result = await service.organization.get(id);
    ctx.success(result);
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { name, code, type, isDelete } = ctx.request.body;
    const result = await service.organization.set(
      id,
      name,
      code,
      type,
      isDelete
    );
    ctx.success(result);
  }
}

module.exports = OrganizationController;
