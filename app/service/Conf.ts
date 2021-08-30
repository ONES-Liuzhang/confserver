import { Service } from 'egg'

/**
 * Config Service
 */
export default class ConfigService extends Service {
  /**
   * 添加一条config
   * @param env_name
   * @return
   */
  public async addConfig(info) {
    try {
      const { ctx } = this
      const { app, env_name, ip_address, domain_name, remark, backend } = info

      const result = await ctx.model.Conf.create({
        app,
        env_name,
        ip_address,
        domain_name,
        remark,
        backend,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * 获取app下的config配置
   * @param app
   * @return
   */
  public async getConfList(app: string) {
    try {
      const { ctx } = this
      const result = await ctx.model.Conf.find({
        app,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  public async editConf(info) {
    try {
      const { ctx } = this
      const {
        app,
        env_name,
        ip_address = '',
        domain_name = '',
        remark = '',
        id,
      } = info

      const result = await ctx.model.Conf.updateOne(
        {
          _id: id,
        },
        {
          app,
          env_name,
          ip_address,
          domain_name,
          remark,
        }
      )
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  public async delConf(id: string) {
    try {
      const { ctx } = this
      const result = await ctx.model.Conf.deleteOne({
        _id: id,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  public async getConfByEnvName(envName: string, app: string) {
    try {
      const { ctx } = this
      const result = await ctx.model.Conf.findOne({
        env_name: envName,
        app,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }
}
