import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  // 跨域配置
  cors: {
    enable: true,
    package: 'egg-cors',
  },
}

export default plugin
