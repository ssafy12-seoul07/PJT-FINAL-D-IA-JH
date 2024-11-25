// stores/housework.ts
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
import type {
  CalendarData,
  WeekTaskListInterface,
} from '../interface/HouseworkCalendarInterface'
import { useHouseworkAPI } from '../service/HouseworkAPI'

const getMonday = (date: dayjs.Dayjs) => {
  const day = date.day()
  const monday =
    day === 0 ? date.subtract(6, 'day') : date.subtract(day - 1, 'day')
  return monday
}

export const useHouseworkStore = defineStore('housework', {
  state: () => {
    const currentMonday = getMonday(dayjs())
    return {
      startDate: currentMonday.format('YYYY-MM-DD'),
      endDate: currentMonday.add(6, 'day').format('YYYY-MM-DD'),
      weekTaskList: {} as WeekTaskListInterface,
      selectedDate: dayjs().format('YYYY-MM-DD'),
      calendarData: [] as CalendarData[],
    }
  },

  getters: {
    getWeekTaskList(): WeekTaskListInterface {
      return { ...this.weekTaskList }
    },

    getCalendarData(): CalendarData[] {
      return [...this.calendarData]
    },

    selectedDateTaskList(): HouseworkInterface[] {
      if (!this.selectedDate || !this.getWeekTaskList) return []

      const tasks = this.getWeekTaskList[this.selectedDate] ?? []
      return [...tasks].sort((a, b) => {
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      })
    },
  },

  actions: {
    setWeekTaskList(newList: WeekTaskListInterface) {
      this.weekTaskList = { ...newList } // 새로운 참조를 생성하여 반응성 보장
    },

    updateCalendarData() {
      this.calendarData = this.createCalendarData(
        this.startDate,
        this.endDate,
        this.weekTaskList
      )
    },

    // CRUD 관련 액션 추가
    addTask(task: HouseworkInterface) {
      const dateKey = dayjs(task.startAt).format('YYYY-MM-DD')
      if (!this.weekTaskList[dateKey]) {
        this.weekTaskList[dateKey] = []
      }
      this.weekTaskList = {
        ...this.weekTaskList,
        [dateKey]: [...(this.weekTaskList[dateKey] || []), task],
      }
      this.updateCalendarData()
    },

    updateTask(task: HouseworkInterface) {
      const dateKey = dayjs(task.startAt).format('YYYY-MM-DD')
      if (!this.weekTaskList[dateKey]) return

      const index = this.weekTaskList[dateKey].findIndex(
        (t) => t.id === task.id
      )
      if (index !== -1) {
        this.weekTaskList[dateKey][index] = { ...task }
        this.updateCalendarData()
      }
    },

    async fetchHouseworkData() {
      try {
        const houseworkAPI = useHouseworkAPI()
        const formattedStartDate = new Date(`${this.startDate}T00:00:00`)
        const formattedEndDate = new Date(`${this.endDate}T23:59:59`)

        const response = await houseworkAPI.getHousework(
          formattedStartDate,
          formattedEndDate
        )
        this.weekTaskList = this.groupTasksByDate(response)
        this.calendarData = this.createCalendarData(
          this.startDate,
          this.endDate,
          this.weekTaskList
        )
      } catch (error) {
        console.error('Failed to fetch housework:', error)
      }
    },

    createCalendarData(
      startDate: string | Date,
      endDate: string | Date,
      weekTaskList: { [key: string]: HouseworkInterface[] }
    ): CalendarData[] {
      const result: CalendarData[] = []
      let currentDate = dayjs(startDate)
      const endDateObj = dayjs(endDate)

      while (
        currentDate.isSame(endDateObj) ||
        currentDate.isBefore(endDateObj)
      ) {
        const dateStr = currentDate.format('YYYY-MM-DD')
        const tasksForDate = weekTaskList[dateStr] || []

        result.push({
          date: dateStr,
          totalCnt: tasksForDate.length,
          doneCnt: tasksForDate.filter((task) => task.doneAt).length,
        })

        currentDate = currentDate.add(1, 'day')
      }

      return result
    },

    groupTasksByDate(tasks: HouseworkInterface[]) {
      return tasks.reduce(
        (acc: { [key: string]: HouseworkInterface[] }, task) => {
          const date = dayjs(task.startAt).format('YYYY-MM-DD')
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(task)
          return acc
        },
        {}
      )
    },

    changeWeek(action: string) {
      const current = dayjs(this.startDate)
      switch (action) {
        case 'prev':
          this.startDate = current.subtract(7, 'day').format('YYYY-MM-DD')
          this.endDate = current.subtract(1, 'day').format('YYYY-MM-DD')
          break
        case 'next':
          this.startDate = current.add(7, 'day').format('YYYY-MM-DD')
          this.endDate = current.add(13, 'day').format('YYYY-MM-DD')
          break
      }
      this.fetchHouseworkData()
    },

    selectDate(dateStr: string) {
      this.selectedDate = dateStr
    },
  },
})
