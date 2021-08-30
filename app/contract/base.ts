const JsonBody = {
  code: { type: 'number', required: true, example: 0 },
  msg: { type: 'string', required: true, example: 'success' },
  data: { type: 'object', required: true, example: [] },
}

const indexJsonBody = {
  ...JsonBody,
}

const uploadJsonBody = {
  ...JsonBody,
}

export { JsonBody, uploadJsonBody, indexJsonBody }
