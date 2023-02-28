/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576723863361_2114';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your middleware config here
  config.middleware = [];
  // 添加 dingtalkRobot 配置
  config.webhook = {
    ...config.webhook,
    dingtalkRobot: {
      url: 'https://oapi.dingtalk.com/robot/send?access_token=36c4f38e03d9b98f1ca136d7e6fe854078440981c5f4e14824561353a5fad259',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
