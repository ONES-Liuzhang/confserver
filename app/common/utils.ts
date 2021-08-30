import moment from 'moment'

/**
 * 格式化日期
 * @param date 要格式化的日期
 * @param friendly 是否使用fromNow
 * @return 格式化的日期
 */
export const formatDate = (date, friendly = false) => {
  date = moment(date)
  if (friendly) {
    return date.fromNow()
  }
  return date.format('YYYY-MM-DD HH:mm')
}

/**
 * 验证id是否规范
 */
export const validateId = (id: string) => {
  return /^[a-zA-Z0-9-_]+$/i.test(id)
}
