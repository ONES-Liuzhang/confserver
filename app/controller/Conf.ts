import { Controller } from 'egg'

export default class ConfigController extends Controller {
  /**
   * 增加一项配置
   */
  public async addConf() {
    const { ctx } = this
    const {
      app,
      env_name,
      ip_address = '',
      domain_name = '',
      backend = '',
      remark = '',
    } = ctx.request.body
    if (!app) {
      ctx.body = {
        code: 'ZC001',
        msg: '请传入app',
        data: null,
      }
      return
    }
    if (!env_name) {
      ctx.body = {
        code: 'ZC001',
        msg: '环境名称不能为空',
        data: null,
      }
      return
    }

    // 同一个项目下env_name不能重复
    const confInfo = await ctx.service.conf.getConfByEnvName(env_name, app)

    if (confInfo) {
      ctx.body = {
        code: 'ZC002',
        msg: '环境名称重复',
        data: null,
      }
      return
    }

    const appInfo = await ctx.service.apps.findOneApp({ _id: app })

    if (!appInfo) {
      ctx.body = {
        code: 'ZC002',
        msg: '传入的项目id错误',
        data: null,
      }
      return
    }

    const result = await ctx.service.conf.addConfig({
      app,
      env_name,
      remark,
      ip_address,
      domain_name,
      backend,
    })

    ctx.body = {
      code: '00000',
      msg: '创建成功',
      data: result,
    }
  }

  public async editConf() {
    const { ctx } = this
    const {
      app,
      env_name,
      ip_address = '',
      domain_name = '',
      remark = '',
      id,
    } = ctx.request.body
    if (!id || !app || !env_name) {
      ctx.body = {
        code: 'ZC001',
        msg: '传参错误，请检查入参',
        data: null,
      }
      return
    }

    const appInfo = await ctx.service.apps.findOneApp({ id: app })

    if (!appInfo) {
      ctx.body = {
        code: 'ZC002',
        msg: '传入的项目id错误',
        data: null,
      }
      return
    }

    const result = await ctx.service.conf.editConf({
      id,
      app,
      env_name,
      remark,
      ip_address,
      domain_name,
    })

    ctx.body = {
      code: '00000',
      msg: '创建成功',
      data: result,
    }
  }

  /** 获取app下的config */
  public async getConfListByApp() {
    const { ctx } = this
    const { app } = ctx.request.body
    if (!app) {
      ctx.body = {
        code: 'ZC001',
        msg: '请传入项目_id',
        data: null,
      }
      return
    }

    const appInfo = await ctx.service.apps.findOneApp({ _id: app })

    if (!appInfo) {
      ctx.body = {
        code: 'ZC002',
        msg: '传入的项目id错误',
        data: null,
      }
      return
    }

    const result = await ctx.service.conf.getConfList(app)
    ctx.body = {
      code: '00000',
      msg: '请求成功',
      data: result,
    }
  }

  /**
   * 删除配置项
   * @return
   */
  public async delConf() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (!id) {
      ctx.body = {
        code: 'ZC001',
        msg: '请传入id',
        data: null,
      }
      return
    }

    const result = await ctx.service.conf.delConf(id)

    if (result && result.ok && result.deletedCount) {
      ctx.body = {
        code: '00000',
        msg: '删除成功',
        data: 'ok',
      }
    } else {
      ctx.body = {
        code: '00000',
        msg: '删除失败',
        data: null,
      }
    }
  }
}
