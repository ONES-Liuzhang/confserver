const BaseConfInfo = {
  app: {
    require: false,
    type: 'string',
    example: '612c4f54fe562bd69af79d76',
  },
  env_name: { require: false, type: 'string', example: 'fat1' },
  ip_address: {
    require: false,
    type: 'string',
    example: 'http://29.11.11.33:4000',
  },
  domain_name: {
    require: false,
    type: 'string',
    example: 'http://het.fat2.com.cn/',
  },
  backend: {
    require: false,
    type: 'string',
    example: 'http://29.3.253.222:6014/',
  },
  remark: { require: false, type: 'string', example: '哈哈哈' },
}

const AddConfJsonInfo = {
  ...BaseConfInfo,
  app: { require: true, type: 'string', example: '612c4f54fe562bd69af79d76' },
  env_name: { require: true, type: 'string', example: 'fat1' },
}

const DelConfJsonInfo = {
  id: {
    require: true,
    type: 'string',
    example: '612c4f54fe562bd69af79d76',
  },
}

const EditConfJsonInfo = {
  ...BaseConfInfo,
  id: { require: true, type: 'string', example: '612c4f54fe562bd69af79d76' },
}

const SearchConfJsonInfo = {
  app: { require: true, type: 'string', example: '612c4f54fe562bd69af79d76' },
}

export {
  AddConfJsonInfo,
  DelConfJsonInfo,
  EditConfJsonInfo,
  SearchConfJsonInfo,
}
