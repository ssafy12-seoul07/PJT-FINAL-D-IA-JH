import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const useDateTime = () => {
  const formatToKrISOString = (date: Date | null | undefined) => {
    if (!date) {
      return dayjs()
        .tz('Asia/Seoul')
        .startOf('day')
        .format('YYYY-MM-DDTHH:mm:ss')
    }
    return dayjs(date).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss')
  }

  const getStartOfDay = () => {
    return dayjs().tz('Asia/Seoul').startOf('day').format('YYYY-MM-DDTHH:mm:ss')
  }

  const getEndOfDay = () => {
    return dayjs().tz('Asia/Seoul').endOf('day').format('YYYY-MM-DDTHH:mm:ss')
  }

  return {
    formatToKrISOString,
    getStartOfDay,
    getEndOfDay,
  }
}
