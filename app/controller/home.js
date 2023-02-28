'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { path = '' } = ctx.params;

    const webhookUrl = process.env[`WEBHOOK_URL_${path ? path.toUpperCase() : 'DEFAULT'}`];
    if (!webhookUrl) {
      ctx.logger.error(`webhook url not found for path: ${path}`);
      ctx.body = {
        error: `webhook url not found for path: ${path}`,
      };
      return;
    }

    const message = await ctx.service.webhook.translateMsg(ctx.request.body, path);
    if (!message) {
      ctx.logger.info('====> message is empty, suppressed.');
      ctx.body = { msg: 'message is empty or not supported, suppressed.' };
      return;
    }

    const result = await ctx.curl(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,

      data: message,
    });

    ctx.body = {
      webhook_url: webhookUrl,
      webhook_message: message,
      status: result.status,
      headers: result.headers,
      package: result.data,
    };

    ctx.logger.info('response body: ', ctx.body);
  }
}

module.exports = HomeController;

