import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.post('/app/add', controller.apps.addNewApp)
  router.post('/app/del', controller.apps.delApp)
  router.post('/app/edit', controller.apps.editApp)
  router.post('/app/list', controller.apps.list)

  router.post('/conf/add', controller.conf.addConf)
  router.post('/conf/del', controller.conf.delConf)
  router.post('/conf/edit', controller.conf.editConf)
  router.post('/conf/list', controller.conf.getConfListByApp)
}
