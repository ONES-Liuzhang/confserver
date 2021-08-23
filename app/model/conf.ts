import { Schema, Types } from 'mongoose';
import baseModel from './base_model';

/** 环境配置项表 */
export interface Configuration {
  app_id: Types.ObjectId;
  name: string;
  ip_address: string;
  domain_name: string;
  remark: string;
  create_at: Date;
  update_at: Date;
}

const ConfigSchema = new Schema<Configuration>({
  app_id: Types.ObjectId,
  name: String,
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() },
  remark: String,
});

ConfigSchema.plugin(baseModel);

ConfigSchema.index({ app_id: 1 }, { unique: true });

ConfigSchema.pre('save', function (next) {
  const date = new Date();
  this.update_at = date;
  next();
});

export default (app) => {
  const mongoose = app.mongoose;

  return mongoose.model('Conf', ConfigSchema);
};
