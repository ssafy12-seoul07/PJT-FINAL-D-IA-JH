<template>
  <div class="calendar-container">
    <div
      v-for="date in calendarData"
      :key="date.date"
      :class="[
        getDayClass(date.date),
        { past: isPastDate(date.date) },
        { future: isFutureDate(date.date) },
        { active: date.date === selectedDate },
      ]"
      :disabled="isFutureDate(date.date)"
      @click="handleSelectDate(date.date)"
    >
      <span>{{ getDayOfWeek(date.date) }}</span>
      <span
        >{{ getDayOfMonth(date.date) }}
        <CircleProgressComponent
          :width="31"
          :height="31"
          color="#4CAF50"
          backgroundColor="none"
          text=""
          :active="false"
          :progress="calculateProgressPercentage(date.doneCnt, date.totalCnt)"
          :top="-8"
          :left="-5"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CircleProgressComponent from '@/shared/components/CircleProgressComponent.vue'
  import type { WeekCalendarProps } from '../interface/HouseworkCalendarInterface'
  import dayjs from 'dayjs'

  defineProps<WeekCalendarProps>()

  const getDayOfWeek = (dateStr: string) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const dayIndex = dayjs(dateStr).day()
    return days[dayIndex]
  }

  const getDayOfMonth = (dateStr: string) => {
    return dayjs(dateStr).date() // 일(day of month)만 반환
  }

  const getDayClass = (dateStr: string) => {
    const dayIndex = dayjs(dateStr).day()
    return {
      sunday: dayIndex === 0,
      saturday: dayIndex === 6,
    }
  }
  const isPastDate = (dateStr: string) => {
    const today = dayjs().startOf('day')
    return dayjs(dateStr).isBefore(today)
  }

  const isFutureDate = (dateStr: string) => {
    const today = dayjs().startOf('day')
    return dayjs(dateStr).isAfter(today)
  }

  const emit = defineEmits(['selectDate'])

  const handleSelectDate = (dateStr: string) => {
    if (!isFutureDate(dateStr)) {
      emit('selectDate', dateStr)
    }
  }

  const calculateProgressPercentage = (
    value: number,
    maxValue: number
  ): number => {
    if (maxValue === 0) return 0
    return (value / maxValue) * 100
  }
</script>

<style scoped>
  .sunday {
    > span:first-child {
      color: var(--red);
    }
  }
  .saturday {
    > span:first-child {
      color: var(--blue);
    }
  }
  div.calendar-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 8px;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--background-color);
      padding: 8px 16px;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
        filter: brightness(95%);
      }
      > span {
        font-weight: bold;
        &:first-child {
          margin-bottom: 12px;
        }
        &:nth-child(2) {
          width: 20px;
          text-align: center;
          position: relative;
        }
      }
    }
    div.past {
      > span:nth-child(2) {
        color: #757575;
      }
    }
    div.future {
      > span:nth-child(2) {
        color: #d8d8d8;
      }
      &:hover {
        cursor: default;
      }
    }
    div.active {
      background-color: white;
      box-shadow: 0px 0px 10px 1px inset rgb(170, 170, 170);
    }
  }
</style>
