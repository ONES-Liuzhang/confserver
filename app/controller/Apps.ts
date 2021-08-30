import { Controller } from 'egg'
import { v4 as uuidv4 } from 'uuid'

export default class AppsController extends Controller {
  /**
   * 添加项目
   */
  public async addNewApp() {
    const { ctx } = this
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
      appId = uuidv4().replace(/-/g, '')
    }

    const appInfo = await ctx.service.apps.findAppByName(name)
    if (appInfo._id) {
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

    if (result) {
      ctx.body = {
        code: '00000',
        msg: '创建成功',
        data: null,
      }
    } else {
      ctx.body = {
        code: '00000',
        msg: '创建失败',
        data: null,
      }
    }
  }
}
