import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
import { useCalendarKeyOfDate } from '@/modules/housework-calendar/composables/useCalendarKeyOfDate'

interface HouseworksPerDate {
  [key: string]: {
    houseworks: HouseworkInterface[]
    doneCnt: number
    totalCnt: number
  }
}

export const useHouseworksPerDate = (houseworks: HouseworkInterface[]) => {
  const obj: HouseworksPerDate = {};

  houseworks.forEach((housework) => {
    const key = useCalendarKeyOfDate(housework.startAt)
    if (!obj[key]) {
      obj[key] = {
        houseworks: [],
        doneCnt: 0,
        totalCnt: 0,
      }
    }

    obj[key].houseworks.push(housework)
    obj[key].totalCnt++
    if (!!housework.doneAt) {
      obj[key].doneCnt++
    }
  })

  return obj;
}
