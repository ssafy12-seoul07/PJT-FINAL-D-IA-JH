<template>
  <div>
    <WeekSelector
      :startDate="startDate"
      :endDate="endDate"
      @change-week="handleChangeWeek"
    />
    <WeekCalendar :selectedDate="selectedDate" />
    <HouseworkList :selectedDateTaskList="selectedDateTaskList" />
  </div>
</template>

<script setup lang="ts">
  import WeekSelector from './WeekSelector.vue'
  import WeekCalendar from './WeekCalendar.vue'
  import HouseworkList from './HouseworkList.vue'
  import { computed, ref } from 'vue'
  import type {
    TaskListInterface,
    WeekTaskListInterface,
  } from '../interface/HouseworkCalendarInterface'

  const startDate = ref('')
  const endDate = ref('')
  const weekTaskList = ref<WeekTaskListInterface>()
  const selectedDate = ref('')

  // weekTaskList가 ref이므로 .value 필요
  const selectedDateTaskList = computed<TaskListInterface[]>(
    () => weekTaskList.value?.[selectedDate.value] ?? []
  )

  const handleChangeWeek = (action: string) => {
    switch (action) {
      case 'prev':
        break
      case 'next':
        break
    }
  }
</script>

<style scoped></style>
