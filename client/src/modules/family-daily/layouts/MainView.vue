<template>
  <div class="family-daily-view">
    <FamilyDailyHeader />
    <main>
      <div class="main-container">
        <h3>{{ formattedDate }}</h3>
        <ActivityRing
          v-for="member in familyWorkoutStat"
          :key="member.userId"
          v-bind="member"
        />
      </div>
    </main>
    <BottomNavBar />
  </div>
</template>

<script setup lang="ts">
  import ActivityRing from '@/shared/components/ActivityRing.vue'
  import BottomNavBar from '@/shared/components/BottomNavBar.vue'
  import FamilyDailyHeader from '../components/FamilyDailyHeader.vue'
  import useFormatDate from '../composables/useFormatDate'
  const { getTodayFormatted } = useFormatDate()
  const formattedDate = getTodayFormatted()

  import useFamilyDaily from '../composables/useFamilyDaily'
  import { onMounted } from 'vue'
  const { familyWorkoutStat, getFamilyWorkoutStat } = useFamilyDaily()
  onMounted(async () => {
    await getFamilyWorkoutStat()
  })
</script>

<style scoped>
  div.family-daily-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;

    main {
      flex: 1;
      width: 100%;
      background-color: #f0f0f0;
      padding: 12px;

      .main-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        overflow: scroll;
        -ms-overflow-style: none; /* IE, Edge */
        scrollbar-width: none; /* Firefox */
        h3 {
          color: #757575;
          margin: 8px;
        }

        height: 725px; /* 가로가 430 이상일때 */
        @media (max-width: 430px) {
          height: calc(100vh - 160px); /* 가로가 430 이하일때 */
        }
      }
    }
  }
</style>
