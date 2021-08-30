import { AppInfo } from './../model/apps'
import { Controller } from 'egg'
import { v4 as uuidv4 } from 'uuid'

export default class AppsController extends Controller {
  /**
   * @router post /api/app/add
   * @summary 添加项目
   * @description 添加项目
   * @request query string *name 项目名称
   * @request query string app_id appid
   * @request query string remark 备注
   * @request query string pid 父项目_id
   * @response 200 indexJsonBody
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
  }

  /**
   * @router post /api/app/del
   * @summary 删除项目
   * @description 删除项目
   * @request query string *app_id appid
   * @response 200 indexJsonBody
   */
  public async delApp() {
    const { ctx } = this
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
  }

  /**
   * @router post /api/app/edit
   * @summary 修改项目
   * @description 修改项目
   * @request query string *id 项目id
   * @request query string *name 项目名称
   * @request query string app_id appid
   * @request query string remark 备注
   * @request query string pid 父项目_id
   * @response 200 indexJsonBody
   */
  public async editApp() {
    const { ctx } = this
    const { name, remark = '', app_id, id } = ctx.request.body

    if (!id) {
      ctx.body = {
        code: 'ZC001',
        msg: '请传入项目id',
        data: null,
      }
      return
    }

    if (!name) {
      ctx.body = {
        code: 'ZC001',
        msg: '请传入项目名称',
        data: null,
      }
      return
    }

    const appInfo = await ctx.service.apps.findOneApp({ _id: id })
    const editInfo: Partial<AppInfo> = {}
    const { name: iName, app_id: appId } = appInfo

    // name和app_id有修改才传
    if (iName !== name) editInfo.name = name
    if (appId !== app_id) editInfo.app_id = app_id

    const checkInfo = await ctx.service.apps.findOneAppByOr([
      { name: editInfo.name },
      { app_id: editInfo.app_id },
    ])

    if (checkInfo) {
      if (checkInfo.app_id) {
        ctx.body = {
          code: 'ZC002',
          msg: 'app_id已存在',
          data: null,
        }
        return
      }
      if (checkInfo.name) {
        ctx.body = {
          code: 'ZC002',
          msg: '项目名称已存在',
          data: null,
        }
        return
      }
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
  }

  /** 查询app列表 */
  public async list() {
    const { ctx } = this
    const { page = 1, limit = 10 } = ctx.request.body
    const result = await ctx.service.apps.list(page - 1, limit)
    ctx.body = {
      code: '00000',
      msg: '请求成功',
      data: result,
    }
  }

  public async searchApp() {
    const { ctx } = this
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
  }
}
