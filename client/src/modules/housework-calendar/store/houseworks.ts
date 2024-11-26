import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
import { useHouseworkAPI } from '../service/HouseworkAPI'

export const useHouseworkStore = defineStore('housework', () => {
  const getMonday = (date: dayjs.Dayjs) => {
    const day = date.day()
    return day === 0 ? date.subtract(6, 'day') : date.subtract(day - 1, 'day')
  }

  const currentMonday = getMonday(dayjs())
  const startDate = ref(currentMonday.format('YYYY-MM-DD'))
  const endDate = ref(currentMonday.add(6, 'day').format('YYYY-MM-DD'))
  const weekTaskList = ref<HouseworkInterface[]>([])
  const selectedDate = ref(dayjs().format('YYYY-MM-DD'))

  const fetchHouseworkData = async () => {
    try {
      const houseworkAPI = useHouseworkAPI()
      const formattedStartDate = new Date(`${startDate.value}T00:00:00`)
      const formattedEndDate = new Date(`${endDate.value}T23:59:59`)

      const response = await houseworkAPI.getHousework(
        formattedStartDate,
        formattedEndDate
      )
      weekTaskList.value = response
    } catch (error) {
      console.error('Failed to fetch housework:', error)
    }
  }

  const changeWeek = (action: string) => {
    const current = dayjs(startDate.value)
    switch (action) {
      case 'prev':
        startDate.value = current.subtract(7, 'day').format('YYYY-MM-DD')
        endDate.value = current.subtract(1, 'day').format('YYYY-MM-DD')
        break
      case 'next':
        startDate.value = current.add(7, 'day').format('YYYY-MM-DD')
        endDate.value = current.add(13, 'day').format('YYYY-MM-DD')
        break
    }
    fetchHouseworkData()
  }

  const selectDate = (dateStr: string) => {
    selectedDate.value = dateStr
  }

  return {
    startDate,
    endDate,
    weekTaskList,
    selectedDate,
    fetchHouseworkData,
    changeWeek,
    selectDate,
  }
})
