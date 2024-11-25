import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { useHouseworkAPI } from '@/modules/housework-calendar/service/HouseworkAPI'
import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'

export const useHouseworkCalendarStore = defineStore('housework-calendar', () => {
  const houseworkAPI = useHouseworkAPI()

  const selectedDate = ref(new Date())
  const getSelectedDate = () => selectedDate.value
  const setSelectedDate = (date: Date) => {
    selectedDate.value = date
  }

  const startDate = ref(getFirstDayOfWeek())
  const endDate = ref(getLastDayOfWeek())

  const before = async () => {
    startDate.value = prevWeek(startDate.value)
    endDate.value = prevWeek(endDate.value)
    houseworks.value = await houseworkAPI.getHousework(startDate.value, endDate.value)
  }

  const after = async () => {
    startDate.value = nextWeek(startDate.value)
    endDate.value = nextWeek(endDate.value)
    houseworks.value = await houseworkAPI.getHousework(startDate.value, endDate.value)
  }

  const houseworks = ref<HouseworkInterface[]>([])
  const getHouseworks = async () => {
    houseworks.value = await houseworkAPI.getHousework(startDate.value, endDate.value)
  }

  return {
    selectedDate,
    getSelectedDate,
    setSelectedDate,
    startDate,
    endDate,
    before,
    after,
    houseworks,
    getHouseworks,
  }
})


// utils
const getFirstDayOfWeek = () => {
  const dayOfWeek = dayjs().day()
  return dayOfWeek === 0 ? dayjs().subtract(6, 'day').toDate() : dayjs().day(1).toDate()
}

const getLastDayOfWeek = () => {
  const dayOfWeek = dayjs().day()
  return dayOfWeek === 0 ? dayjs().toDate() : dayjs().day(7).toDate()
}

const prevWeek = (date: Date) => {
  return dayjs(date).subtract(7, 'day').toDate()
}

const nextWeek = (date: Date) => {
  return dayjs(date).add(7, 'day').toDate()
}
