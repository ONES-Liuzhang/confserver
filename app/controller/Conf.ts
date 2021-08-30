import { Controller } from 'egg'

export default class ConfigController extends Controller {
  /**
   * 增加一项配置
   */
  public async addConf() {
    const { ctx } = this
    ctx.body = await ctx.service.conf.addConfig('egg')
  }
}
