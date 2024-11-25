// export interface WeekSelectorProps {
//   startDate: Date
//   endDate: Date
// }

// export interface WeekCalendarProps {
//   selectedDate: string
// }

export interface WeekHouseworkInterface {
  [startDate: string]: HouseworkInterface[]
}

export interface HouseworkInterface {
  id: number
  name: string
  description: string
  color: string
  calorieAmount: number
  startAt: string | Date // "2024-11-11T00:00:00" 형식
  dueAt: string | Date
  doneAt?: string | Date // nullable
}

export interface HouseworkFormProps {
  assignedUserId: number
  name: string
  description: string
  color: string
  calorieAmount: number
  timeRange?: [Date, Date]
  startAt?: Date | string
  dueAt?: Date | string
}
