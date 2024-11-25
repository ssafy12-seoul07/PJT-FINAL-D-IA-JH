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
  startAt: string | Date // "2024-11-11T00:00:00.000Z" 형식
  dueAt: string | Date
  doneAt?: string | Date // nullable
}
