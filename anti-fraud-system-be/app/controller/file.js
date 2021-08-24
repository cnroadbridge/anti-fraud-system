'use strict';

const fs = require('fs');
const path = require('path');
const { Controller } = require('egg');
const mkdirp = require('mz-modules/mkdirp');
const pump = require('mz-modules/pump');

class FileController extends Controller {
  // https://eggjs.github.io/zh/guide/upload.html
  // eslint-disable-next-line consistent-return
  async upload() {
    const { ctx, service } = this;
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    // const filename = path.extname(file.filename).toLowerCase();
    const { filename } = file;
    const type = path.extname(filename).toLowerCase();
    const { username, nickname } = ctx.session.userinfo;
    const createBy = nickname || username;
    const uuid = ctx.app.utils.generator.generateUUID();
    const targetPathPrefix = path.join(this.config.baseDir, 'app/public', uuid);
    const targetPath = path.join(
      this.config.baseDir,
      'app/public',
      uuid,
      filename
    );
    const source = fs.createReadStream(file.filepath);
    await mkdirp(targetPathPrefix);
    const target = fs.createWriteStream(targetPath);
    let result = '';
    try {
      await pump(source, target);
      const stats = fs.statSync(targetPath);
      const size = ctx.app.utils.compute.bytesToSize(stats.size);
      const url = `public/${uuid}/${filename}`;
      result = await service.file.add(filename, type, size, url, createBy);
      ctx.logger.info('save %s to %s', file.filepath, targetPath, stats, size);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
    ctx.success(result);
  }

  async getAllByIds() {
    const { ctx, service } = this;
    const { ids } = ctx.request.body;
    const result = await service.file.getAllByIds(ids);
    ctx.success(result);
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {
      filename,
      type,
      size,
      path: url,
      createBy,
      isDelete,
    } = ctx.request.body;
    const result = await service.file.set(
      id,
      filename,
      type,
      size,
      url,
      createBy,
      isDelete
    );
    ctx.success(result);
  }
}

module.exports = FileController;
