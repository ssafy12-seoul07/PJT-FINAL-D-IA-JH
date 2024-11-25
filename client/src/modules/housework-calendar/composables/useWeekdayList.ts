import dayjs from 'dayjs'

export interface Weekday {
  letter: string,
  date: Date
}

const weekdayStringList: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export const useWeekdayList = (date: Date) => {
  const weekDateList: Weekday[] = []
  for (let i = 0; i < 7; i++) {
    weekDateList.push({
      letter: weekdayStringList[i],
      date: dayjs(date).day(i + 1).toDate(),
    })
  }

  return weekDateList
}
