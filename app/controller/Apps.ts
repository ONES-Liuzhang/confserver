import { Controller } from 'egg'
import { v4 as uuidv4 } from 'uuid'

export default class AppsController extends Controller {
  /**
   * 添加项目
   */
  public async addNewApp() {
    const { ctx } = this
    try {
      const { name, remark = '', pid = 0, app_id = '' } = ctx.request.body
      if (!name) {
        ctx.body = {
          code: 'ZC001',
          msg: '请传入项目名称',
          data: null,
        }
        return
      }

      // TODO: 先生成随机数当做appid，后期必传
      let appId = app_id
      if (!app_id) {
        appId = uuidv4().replace(/-/g, '').slice(0, 5)
      }

      const appInfo = await ctx.service.apps.findOneApp({ name })
      if (appInfo) {
        ctx.body = {
          code: 'ZC002',
          msg: '项目已存在',
          data: null,
        }
        return
      }

      const result = await ctx.service.apps.addNewApp({
        name,
        remark,
        pid,
        app_id: appId,
      })

      ctx.body = {
        code: '00000',
        msg: '创建成功',
        data: result,
      }
    } catch (err) {
      ctx.body = {
        code: '00000',
        msg: '创建失败',
        data: null,
      }
    }
  }

  public async delApp() {
    const { ctx } = this
    try {
      const { app_id } = ctx.request.body
      if (!app_id) {
        ctx.body = {
          code: 'ZC001',
          msg: '请传入app_id',
          data: null,
        }
        return
      }

      const result = await ctx.service.apps.delAppByAppId(app_id)

      ctx.body = {
        code: '00000',
        msg: '删除成功',
        data: result,
      }
    } catch (e) {
      ctx.body = {
        code: 'ZC999',
        msg: '系统错误',
        data: null,
      }
    }
  }

  public async editApp() {
    const { ctx } = this
    try {
      const { name, remark = '', app_id = '', id } = ctx.request.body

      if (!id) {
        ctx.body = {
          code: 'ZC001',
          msg: '请传入项目id',
          data: null,
        }
        return
      }

      const result = await ctx.service.apps.editAppInfo({
        name,
        remark,
        app_id,
        id,
      })
      if (result.ok) {
        ctx.body = {
          code: '00000',
          msg: '修改成功',
          data: 'ok',
        }
      } else {
        ctx.body = {
          code: 'ZC002',
          msg: '修改失败',
          data: null,
        }
      }
    } catch (e) {
      ctx.body = {
        code: 'ZC999',
        msg: '系统错误',
        data: null,
      }
    }
  }

  /** 查询app列表 */
  public async list() {
    const { ctx } = this
    try {
      const { page = 1, limit = 10 } = ctx.request.body
      const result = await ctx.service.apps.list(page - 1, limit)
      ctx.body = {
        code: '00000',
        msg: '请求成功',
        data: result,
      }
    } catch (e) {
      ctx.body = {
        code: 'ZC999',
        msg: '系统错误',
        data: null,
      }
    }
  }

  public async searchApp() {
    const { ctx } = this
    try {
      const { name, app_id, id } = ctx.request.body
      if (!name || !app_id || !id) {
        ctx.body = {
          code: 'ZC001',
          msg: '请输入查询条件',
          data: null,
        }
        return
      }
      const result = await ctx.service.apps.findOneApp({ name, app_id, id })
      ctx.body = {
        code: '00000',
        msg: '请求成功',
        data: result,
      }
    } catch (e) {
      ctx.body = {
        code: 'ZC999',
        msg: '系统错误',
        data: null,
      }
    }
  }
}
