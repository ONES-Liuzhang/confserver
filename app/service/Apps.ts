import { Service } from 'egg';

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
      const { ctx } = this;
      const result = await ctx.model.Apps.create({
        name,
        remark,
        pid,
        app_id,
      });
      return result;
    } catch (e) {
      console.log('[SERVICE ERROR] addNewApp', e);
      return;
    }
  }

  /**
   *
   * @param name 名称
   * @return
   */
  public async findAppByName(name: string) {
    try {
      const { ctx } = this;
      const result = await ctx.model.Apps.findOne({
        name,
      });
      return result;
    } catch (e) {
      console.log('[SERVICE ERROR] findAppByName', e);
      return;
    }
  }

  /**
   *
   * @param appId appid
   * @return
   */
  public async findAppByAppId(appId: string) {
    try {
      const { ctx } = this;
      const result = await ctx.model.Apps.findOne({
        app_id: appId,
      });
      return result;
    } catch (e) {
      console.log('[SERVICE ERROR] findAppByName', e);
      return;
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
      const { name, remark, app_id } = appInfo;
      const { ctx } = this;
      const result = await ctx.model.Apps.update(
        {
          app_id,
        },
        {
          name,
          remark,
          app_id,
        },
      );
      return result;
    } catch (e) {
      console.log('[SERVICE ERROR] addNewApp', e);
      return;
    }
  }

  /**
   *  删除项目信息
   *  app_id - appid
   */
  public async delApp(app_id) {
    try {
      const { ctx } = this;
      const result = await ctx.model.Apps.deleteOne({
        app_id,
      });
      return result;
    } catch (e) {
      console.log('[SERVICE ERROR] addNewApp', e);
      return;
    }
  }
}
