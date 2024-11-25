import dayjs from 'dayjs'

const useIsFullDay = (startAt: string | Date, dueAt: string | Date) => {
  const start = dayjs(startAt)
  const due = dayjs(dueAt)

  return (
    start.hour() === 0 &&
    start.minute() === 0 &&
    start.second() === 0 &&
    due.hour() === 23 &&
    due.minute() === 59 &&
    due.second() === 59
  )
}

export default useIsFullDay
