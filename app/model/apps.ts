import { Application } from 'egg'
import { Schema } from 'mongoose'
import baseModel from '../common/db_module'

export interface App {
  app_id: string
  name: string
  pid: number
  create_at: Date
  update_at: Date
  remark: string
}

/** 项目表 一个项目 -> 多个配置项 */
const AppSchema = new Schema<App>({
  // id: { type: Number, default: 0 },
  app_id: { type: String, unique: true },
  name: String,
  pid: Number, // 微前端 会有父app
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() },
  remark: String,
})

AppSchema.plugin(baseModel)

// TODO: 增加app_id unique
AppSchema.index({ name: 1 }, { unique: true })

AppSchema.pre('save', function (next) {
  const date = new Date()
  this.update_at = date
  next()
})

export default (app: Application) => {
  const mongoose = app.mongoose

  return mongoose.model('Apps', AppSchema)
}
