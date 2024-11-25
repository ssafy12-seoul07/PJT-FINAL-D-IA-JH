<template>
  <div class="week-calendar">
    <div class="week-calendar-day" v-for="(weekday, index) in weekdayList" :key="index">
      <!-- WeekDay -->
      <div class="weekday" :class="weekDayClass(weekday.date)">
        <span>{{ weekday.letter }}</span>
      </div>
      <!-- Date -->
      <div :class="{future : isFuture(weekday.date)}">
        <span>{{ weekday.date.getDate() }}</span>
        <br>
        <span>done count: {{ data[useCalendarKeyOfDate(weekday.date)]?.doneCnt ?? 0 }}</span>
        <br>
        <span>total count: {{ data[useCalendarKeyOfDate(weekday.date)]?.totalCnt ?? 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { useHouseworkCalendarStore } from '@/modules/housework-calendar/store/housework-calendar'
  import { useWeekdayList, type Weekday } from '@/modules/housework-calendar/composables/useWeekdayList'
  import { useHouseworksPerDate } from '@/modules/housework-calendar/composables/useHouseworksPerDate'
  import { useCalendarKeyOfDate } from '../composables/useCalendarKeyOfDate'

  const { startDate, houseworks } = useHouseworkCalendarStore()
  const weekdayList: Weekday[] = useWeekdayList(startDate)

  const weekDayClass = (date: Date) => {
    switch (date.getDay()) {
      case 0:
        return 'sunday'
      case 6:
        return 'saturday'
      default:
        return ''
    }
  }

  const isFuture = (date: Date) => {
    const today = new Date()
    return date > today
  }

  console.log("in weekCalendar ", houseworks)
  const data = computed(() => useHouseworksPerDate(houseworks))
  console.log("in weekCalendar ", data)

</script>

<style scoped>
  .week-calendar {
    margin: 24px 0;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  .weekday {
    margin: 8px 0;
  }

  .saturday {
    color: var(--blue);
  }

  .sunday {
    color: var(--red);
  }

  .future {
    color: var(--gray);
  }
</style>
