import { Schema, model } from 'mongoose';
import baseModel from './base_model';

export interface User {
  name: string;
  loginname: string;
  password: string;
  avatar: string;
  create_at: Date;
  update_at: Date;
}

/** 用户表 */
const UserSchema = new Schema<User>({
  name: String,
  loginname: String,
  password: String,
  avatar: String,
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() },
  accessToken: String,
});

UserSchema.plugin(baseModel);

UserSchema.index({ loginname: 1 }, { unique: true });
UserSchema.index({ accessToken: 1 });

UserSchema.pre('save', function (next) {
  const date = new Date();
  this.update_at = date;
  next();
});

export default model('User', UserSchema);
