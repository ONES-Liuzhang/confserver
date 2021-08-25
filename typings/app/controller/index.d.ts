// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/controller/Apps';
import ExportConf from '../../../app/controller/Conf';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    apps: ExportApps;
    conf: ExportConf;
    home: ExportHome;
  }
}
