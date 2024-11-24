<template>
  <div class="activity-ring-container">
    <div class="activity-container">
      <div>
        <ProfileContainer
          :key="userInfo?.id"
          :name="userInfo?.name"
          :profileImageName="userInfo?.profileImageName"
        />
      </div>
      <div class="stat-row workout">
        <span>운동하기</span
        ><span>{{ calculatePercentage(burnedKcal, goalKcal) }}%</span
        ><span>{{ burnedKcal }}/{{ goalKcal }}CAL</span>
      </div>
      <div class="stat-row housework">
        <span>집안일하기</span
        ><span>{{ calculatePercentage(burnedKcal, goalKcal) }}%</span
        ><span>{{ doneHouseworkCnt }}/{{ totalHouseworkCnt }}개</span>
      </div>
    </div>
    <div class="ring-container">Ring</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import type { workoutStatInterface } from '../interface/WorkoutStatInterface'
  import { useUserStore } from '@/modules/authentication/store/user'
  import type { familyListInteface } from '@/modules/authentication/interface/UserInfomationInterface'
  import ProfileContainer from './ProfileContainer.vue'
  import usePercentageCalculator from '../composables/usePercentageCalculator'
  const userStore = useUserStore()
  const props = defineProps<workoutStatInterface>()
  const calculatePercentage = usePercentageCalculator

  onMounted(async () => {
    await userStore.getFamilyInfo()
  })

  const userInfo = computed(
    () =>
      userStore.familyInfo?.members.find(
        (el: familyListInteface) => el.id === props.userId
      ) || null
  )
</script>

<style scoped>
  div.activity-ring-container {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    padding: 16px;
    gap: 42px;
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
    background-color: aqua;
  }
</style>
