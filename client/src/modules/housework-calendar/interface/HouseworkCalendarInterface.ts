import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
import type { Dayjs } from 'dayjs'
export interface WeekSelectorProps {
  startDate: string
  endDate: string
}

export interface WeekCalendarProps {
  selectedDate: string
  calendarData: CalendarData[]
}

export interface WeekTaskListInterface {
  [startDate: string]: HouseworkInterface[]
}
export interface HouseworkFormProps {
  id?: number
  assignedUserId: number
  name: string
  description: string
  color: string
  calorieAmount: number
  timeRange?: [Date, Date]
  startAt?: Date | string
  dueAt?: Date | string
}

export interface CalendarData {
  date: string
  totalCnt: number
  doneCnt: number
}

export interface HouseworkFormStateProps {
  id?: number
  name: string
  description: string
  color: string
  calorieAmount: string | number
  timeRange: [Dayjs | null, Dayjs | null]
  isAllDay: boolean
  doneAt?: string | Date
  assignedUserId: number | null
}
