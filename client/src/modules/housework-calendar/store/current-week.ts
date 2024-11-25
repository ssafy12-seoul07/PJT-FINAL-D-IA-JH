import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

interface WeekDates {
  startDate: Date,
  endDate: Date,
}

export const useCurrentWeekStore = defineStore('current-week', () => {
  const dayOfWeek = dayjs().day()

  const currentWeek = ref<WeekDates>({
    startDate: dayOfWeek === 0 ? dayjs().subtract(6, 'day').toDate() : dayjs().day(1).toDate(),
    endDate: dayOfWeek === 0 ? dayjs().toDate() : dayjs().day(7).toDate(),
  })

  const getCurrentWeek = () => currentWeek.value

  const before = () => {
    currentWeek.value = {
      startDate: dayjs(currentWeek.value.startDate).subtract(7, 'day').toDate(),
      endDate: dayjs(currentWeek.value.endDate).subtract(7, 'day').toDate()
    }
  }

  const after = () => {
    currentWeek.value = {
      startDate: dayjs(currentWeek.value.startDate).add(7, 'day').toDate(),
      endDate: dayjs(currentWeek.value.endDate).add(7, 'day').toDate()
    }
  }

  return { currentWeek, getCurrentWeek, before, after }
})
