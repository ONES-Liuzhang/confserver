export default (options) => {
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      const { app } = ctx
      app.emit('err', err, ctx)

      const status = err.status || 500
      const msg = options.msg || '系统错误'
      // 生产环境不回返给客户敏感信息
      const error =
        status === 500 && app.config.env === 'prod' ? msg : err.message

      ctx.status = status
      ctx.body = {
        code: 'ZC999',
        msg: '系统错误',
        data: error,
      }
    }
  }
}
