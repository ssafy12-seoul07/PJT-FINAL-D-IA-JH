// export interface WeekSelectorProps {
//   startDate: string
//   endDate: string
// }

export interface WeekCalendarProps {
  selectedDate: string
}

export interface WeekTaskListInterface {
  [startDate: string]: TaskListInterface[]
}

export interface TaskListInterface {
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
