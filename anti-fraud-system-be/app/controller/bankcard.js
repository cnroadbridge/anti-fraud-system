'use strict';

const { Controller } = require('egg');

class BankCardController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { name, prefix, bankId, page, pageSize } = ctx.request.query;
    const { list, ...rest } = await service.bankcard.getAllLimit(
      name,
      prefix,
      bankId,
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
    const { name, prefix, bankId } = ctx.request.body;
    ctx.validate(
      {
        name: { type: 'string', required: true },
        prefix: { type: 'string', required: true },
        bankId: { type: 'string', required: true },
      },
      { name, prefix, bankId }
    );
    const result = await service.bankcard.add(name, prefix, bankId);
    ctx.success(result);
  }

  // async destory() {
  //   const { ctx, service } = this;
  //   const { method } = ctx;
  //   this.ctx.body = '删除';
  // }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { name, prefix, bankId, isDelete } = ctx.request.body;
    const result = await service.bankcard.set(
      id,
      name,
      prefix,
      bankId,
      isDelete
    );
    ctx.success(result);
  }

  async show() {
    const { ctx, service } = this;
    const { method } = ctx;
    this.ctx.body = '查询';
  }

  async new() {
    const { ctx, service } = this;
    const { method } = ctx;
    this.ctx.body = '创建页面';
  }

  async edit() {
    const { ctx, service } = this;
    const { method } = ctx;
    this.ctx.body = '修改页面';
  }
}

module.exports = BankCardController;
