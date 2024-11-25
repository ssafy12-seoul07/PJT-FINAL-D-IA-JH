<template>
  <main>
    <WeekSelector
      :startDate="houseworkStore.startDate"
      :endDate="houseworkStore.endDate"
      @change-week="houseworkStore.changeWeek"
    />
    <WeekCalendar
      v-if="houseworkStore.calendarData.length"
      :selectedDate="houseworkStore.selectedDate"
      :calendarData="houseworkStore.calendarData"
      @select-date="houseworkStore.selectDate"
    />
    <HouseworkList :selectedDateTaskList="computedSelectedDateTaskList" />
  </main>
</template>

<script setup lang="ts">
  import WeekSelector from './WeekSelector.vue'
  import WeekCalendar from './WeekCalendar.vue'
  import HouseworkList from './HouseworkList.vue'
  import { useHouseworkStore } from '../store/houseworks'
  import { computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  const houseworkStore = useHouseworkStore()
  const { fetchHouseworkData } = houseworkStore
  // storeToRefs를 사용해서 반응성 유지
  const { selectedDateTaskList } = storeToRefs(houseworkStore)

  onMounted(async () => {
    await fetchHouseworkData()
  })

  const computedSelectedDateTaskList = computed(
    () => selectedDateTaskList.value
  )
</script>

<style scoped></style>
