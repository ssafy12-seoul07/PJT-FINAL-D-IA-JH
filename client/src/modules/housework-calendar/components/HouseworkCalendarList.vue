<template>
  <main>
    <WeekSelector
      :startDate="houseworkStore.startDate"
      :endDate="houseworkStore.endDate"
      @change-week="houseworkStore.changeWeek"
    />
    <WeekCalendar
      v-if="calendarList.length"
      :selectedDate="houseworkStore.selectedDate"
      :calendarData="calendarList"
      @select-date="houseworkStore.selectDate"
    />
    <HouseworkList :selectedDateTaskList="selectedDateTaskList" />
  </main>
</template>

<script setup lang="ts">
  import WeekSelector from './WeekSelector.vue'
  import WeekCalendar from './WeekCalendar.vue'
  import HouseworkList from './HouseworkList.vue'
  import { useHouseworkStore } from '../store/houseworks'
  import { computed, onMounted, watch } from 'vue'
  import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
  import dayjs from 'dayjs'
  import type { CalendarData } from '../interface/HouseworkCalendarInterface'

  const houseworkStore = useHouseworkStore()
  const { fetchHouseworkData } = houseworkStore

  onMounted(async () => {
    await fetchHouseworkData()
  })

  const calendarList = computed((): CalendarData[] => {
    const tasks = houseworkStore.weekTaskList
    return createCalendarData(
      houseworkStore.startDate,
      houseworkStore.endDate,
      groupTasksByDate(tasks)
    )
  })

  const selectedDateTaskList = computed(() => {
    const tasks = houseworkStore.weekTaskList
    const groupedTasks = groupTasksByDate(tasks)
    const selectedDateStr = houseworkStore.selectedDate
    return groupedTasks[selectedDateStr] || []
  })

  watch(
    () => houseworkStore.weekTaskList,
    () => {
      // computed 속성들이 자동으로 재계산됨
    },
    { deep: true, immediate: true }
  )

  function groupTasksByDate(tasks: HouseworkInterface[]) {
    return (
      tasks.reduce(
        (acc, task) => {
          const date = dayjs(task.startAt).format('YYYY-MM-DD')
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(task)
          return acc
        },
        {} as { [key: string]: HouseworkInterface[] }
      ) || {}
    )
  }

  function createCalendarData(
    startDate: string | Date,
    endDate: string | Date,
    weekTaskList: { [key: string]: HouseworkInterface[] }
  ): CalendarData[] {
    const result: CalendarData[] = []
    let currentDate = dayjs(startDate)
    const endDateObj = dayjs(endDate)

    while (currentDate.isSame(endDateObj) || currentDate.isBefore(endDateObj)) {
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
  }
</script>

<style scoped></style>
