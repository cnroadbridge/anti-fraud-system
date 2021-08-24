'use strict';

const { Service } = require('egg');

class OrganizationService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Organization = this.ctx.model.Organization;
  }

  async add(name, code, type) {
    const { ctx, Organization } = this;
    let result = await Organization.hasCode(code);
    if (result) {
      ctx.throw('机构代码已存在');
    }
    result = await Organization.add(name, code, type);
    if (!result) {
      ctx.throw('添加机构失败');
    }
    return result;
  }

  async getAllLimit(name, code, type, page, limit) {
    const { ctx, Organization } = this;
    const result = await Organization.getAllLimit(name, code, type, {
      page,
      limit,
    });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async getAllByType(type, page, limit) {
    const { ctx, Organization } = this;
    const result = await Organization.getAllByType(type, { page, limit });
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(id, name, code, type, isDelete) {
    const { ctx, Organization } = this;
    const result = await Organization.set(id, name, code, type, isDelete);
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async get(id) {
    const { ctx, Organization } = this;
    const result = await Organization.get(id);
    if (!result) {
      ctx.throw('获取机构详情失败');
    }
    return result;
  }

  async getByName(name) {
    const { Organization } = this;
    const result = await Organization.getByName(name);
    return result;
  }
}

module.exports = OrganizationService;
