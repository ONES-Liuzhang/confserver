import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.post('/api/app/add', controller.apps.addNewApp)
  router.post('/api/app/del', controller.apps.delApp)
  router.post('/api/app/edit', controller.apps.editApp)
  router.post('/api/app/list', controller.apps.list)

  router.post('/api/conf/add', controller.conf.addConf)
  router.post('/api/conf/del', controller.conf.delConf)
  router.post('/api/conf/edit', controller.conf.editConf)
  router.post('/api/conf/list', controller.conf.getConfListByApp)
}
