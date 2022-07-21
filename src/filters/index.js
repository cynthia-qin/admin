import dayjs from 'dayjs'
export const formatDate = (time) => {
  return dayjs.unix(time).format('YYYY-MM-DD')
}
