<template>
  <div class="activity-ring-container">
    <div class="activity-container">
      <div>
        <ProfileContainer :key="userId" :userId="userId" />
      </div>
      <div class="stat-row workout">
        <span>운동하기</span
        ><span>{{ calculatePercentage(burnedKcal, goalKcal) }}%</span
        ><span>{{ burnedKcal }}/{{ goalKcal }}CAL</span>
      </div>
      <div class="stat-row housework">
        <span>집안일하기</span
        ><span
          >{{ calculatePercentage(doneHouseworkCnt, totalHouseworkCnt) }}%</span
        ><span>{{ doneHouseworkCnt }}/{{ totalHouseworkCnt }}개</span>
      </div>
    </div>
    <div class="ring-container">
      <CircleProgressComponent
        :width="84"
        :height="84"
        :color="RING_COLOR['red']"
        text=""
        :active="false"
        backgroundColor="none"
        :progress="calculateProgressPercentage(burnedKcal, goalKcal)"
        :key="calculateProgressPercentage(burnedKcal, goalKcal)"
      />
      <CircleProgressComponent
        :width="70"
        :height="70"
        :color="RING_COLOR['green']"
        backgroundColor="none"
        text=""
        :active="false"
        :progress="
          calculateProgressPercentage(doneHouseworkCnt, totalHouseworkCnt)
        "
        :key="calculateProgressPercentage(doneHouseworkCnt, totalHouseworkCnt)"
        :top="7.5"
        :left="6.5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { workoutStatInterface } from '../interface/WorkoutStatInterface'
  import ProfileContainer from './ProfileContainer.vue'
  import usePercentageCalculator from '../composables/usePercentageCalculator'
  import CircleProgressComponent from './CircleProgressComponent.vue'
  import { RING_COLOR } from '../constants/HouseworkConstants'

  defineProps<workoutStatInterface>()
  const calculatePercentage = usePercentageCalculator

  const calculateProgressPercentage = (
    value: number,
    maxValue: number
  ): number => {
    if (maxValue === 0 || value === 0) return 1
    return (value / maxValue) * 100
  }
</script>

<style scoped>
  div.activity-ring-container {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    padding: 16px;
    justify-content: space-between;
  }

  div.activity-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      width: 70px;
    }

    span:nth-child(2),
    span:nth-child(3) {
      font-weight: bold;
    }

    span:nth-child(2) {
      font-size: 22px;
    }
  }

  .stat-row.workout {
    span:nth-child(2),
    span:nth-child(3) {
      color: var(--red);
    }
  }

  .stat-row.housework {
    span:nth-child(2),
    span:nth-child(3) {
      color: var(--green);
    }
  }

  div.ring-container {
    width: 84px;
    height: 84px;
    position: relative;
  }
</style>
