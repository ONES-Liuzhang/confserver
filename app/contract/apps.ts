const BaseAppInfo = {
  name: { require: false, type: 'string', example: 'het' },
  app_id: {
    require: false,
    type: 'string',
    example: '612c4f54fe562bd69af79d76',
  },
  remark: { require: false, type: 'string', example: '哈哈哈' },
  pid: { require: false, type: 'string', example: 0 },
}

const AddAppJsonInfo = {
  ...BaseAppInfo,
  name: { require: true, type: 'string' },
}

const DelAppJsonInfo = {
  app_id: {
    require: true,
    type: 'string',
    example: '612c4f54fe562bd69af79d76',
  },
}

const EditAppJsonInfo = {
  ...BaseAppInfo,
  id: { require: true, type: 'string' },
}

export { AddAppJsonInfo, DelAppJsonInfo, EditAppJsonInfo }
