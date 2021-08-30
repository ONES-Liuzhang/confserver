import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629727722943_5926'

  // add your egg config in here
  config.middleware = ['errorHandler']

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

  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,POST,PUT,DELETE,PATCH,PUT,HEAD',
  }

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '项目配置接口文档',
      description: '获取各个项目的环境配置',
      version: '1.0.0',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
