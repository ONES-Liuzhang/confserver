import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  // 开发环境关闭csrf
  config.security = {
    csrf: {
      enable: false,
      igonreJSON: true,
    },
    domainWhiteList: ['*'],
  }

  return config
}
