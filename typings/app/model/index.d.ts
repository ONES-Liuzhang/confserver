// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/model/apps';
import ExportConf from '../../../app/model/conf';
import ExportIndex from '../../../app/model/index';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Apps: ReturnType<typeof ExportApps>;
    Conf: ReturnType<typeof ExportConf>;
    Index: ReturnType<typeof ExportIndex>;
    User: ReturnType<typeof ExportUser>;
  }
}
