'use strict';

const { Service } = require('egg');

class FileService extends Service {
  constructor(ctx) {
    super(ctx);
    this.File = this.ctx.model.File;
  }

  async add(filename, type, size, path, createBy) {
    const { ctx, File } = this;
    const result = await File.add(filename, type, size, path, createBy);
    if (!result) {
      ctx.throw('添加文件失败');
    }
    return result;
  }

  async getAllByIds(ids) {
    const { ctx, File } = this;
    const result = await File.getAllByIds(ids);
    if (!result) {
      ctx.throw('暂无数据');
    }
    return result;
  }

  async set(id, filename, type, size, path, createBy, isDelete) {
    const { ctx, File } = this;
    const result = await File.set(
      id,
      filename,
      type,
      size,
      path,
      createBy,
      isDelete
    );
    if (result === null) {
      ctx.throw('更新失败');
    }
    return result;
  }

  async get(id) {
    const { ctx, File } = this;
    const result = await File.get(id);
    if (!result) {
      ctx.throw('获取机构详情失败');
    }
    return result;
  }
}

module.exports = FileService;
