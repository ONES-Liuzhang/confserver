const JsonBody = {
  code: { type: 'number', required: true, example: 0 },
  msg: { type: 'string', required: true, example: 'success' },
  data: { type: 'string', required: true, example: 'ok' },
}

const indexJsonBody = {
  ...JsonBody,
}

const uploadJsonBody = {
  ...JsonBody,
}

const ListJsonInfo = {
  page: { require: false, type: 'number', example: 1 },
  limit: { require: false, type: 'number', example: 10 },
}

export { JsonBody, uploadJsonBody, indexJsonBody, ListJsonInfo }
