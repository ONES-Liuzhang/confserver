import { Service } from 'egg'

/**
 * Apps Service
 */
export default class AppsService extends Service {
  /**
   * 添加一个项目
   *  name - 项目名称
   *  remark - 备注
   *  pid - 父id
   *  app_id - appid
   */
  public async addNewApp({ name, remark, pid, app_id }) {
    try {
      const { ctx } = this
      const result = await ctx.model.Apps.create({
        name,
        remark,
        pid,
        app_id,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   *
   * @param name 名称
   * @return
   */
  public async findOneApp(filterInfo) {
    try {
      const filter = {}
      for (const k in filterInfo) {
        if (filterInfo[k]) filter[k] = filterInfo[k]
      }
      const { ctx } = this
      const result = await ctx.model.Apps.findOne(filter)
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   *  修改项目信息
   *  name - 项目名称
   *  remark - 备注
   *  pid - 父id
   *  app_id - appid
   */
  public async editAppInfo(appInfo) {
    try {
      const { name, remark, app_id, id } = appInfo
      const { ctx } = this
      const result = await ctx.model.Apps.updateOne(
        {
          _id: id,
        },
        {
          name,
          remark,
          app_id,
        }
      )
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   *  删除项目信息
   *  app_id - appid
   */
  public async delAppByAppId(app_id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Apps.deleteOne({
        app_id,
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  public async list(page, limit) {
    try {
      const { ctx } = this
      const result = await ctx.model.Apps.find()
        .skip(page * limit)
        .limit(limit)
        .sort({ _id: -1 })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }
}
