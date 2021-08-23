import { Schema, model, Types } from 'mongoose';
import baseModel from './base_model';

export interface Application {
  name: string;
  pid: Types.ObjectId;
  create_at: Date;
  update_at: Date;
  remark: string;
}

/** 项目表 一个项目 -> 多个配置项 */
const AppSchema = new Schema<Application>({
  name: String,
  pid: Types.ObjectId, // 微前端 会有父app
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() },
  remark: String,
});

AppSchema.plugin(baseModel);

AppSchema.index({ name: 1 }, { unique: true });

AppSchema.pre('save', function (next) {
  const date = new Date();
  this.update_at = date;
  next();
});

export default model('Apps', AppSchema);
