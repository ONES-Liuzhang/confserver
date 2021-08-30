import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629727722943_5926'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  // mongodb
  config.mongoose = {
    url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
    options: {
      poolSize: 40,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  }

  // 开发环境关闭csrf
  config.security = {
    csrf: {
      enable: false,
      igonreJSON: true,
    },
    domainWhiteList: ['*'],
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
