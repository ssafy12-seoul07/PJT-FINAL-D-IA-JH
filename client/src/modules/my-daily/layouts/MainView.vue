<template>
  <div class="my-daily-view">
    <MyDailyHeader />
    <main>
      <div class="main-container">
        <h3>{{ myName }}님의 활동링</h3>
        <template v-if="myWorkoutStat && myWorkoutStat.userId">
          <ActivityRing
            v-show="myWorkoutStat && myWorkoutStat.userId"
            :key="myWorkoutStat?.userId"
            v-bind="myWorkoutStat"
          />
        </template>
        <div style="min-height: 16px" />
        <h3>{{ myName }}님의 일정 (시작시간 빠른순)</h3>
        <template v-if="myHousework?.length">
          <HouseworkTask
            v-show="myHousework.length"
            v-for="task in myHousework"
            :key="task.id"
            v-bind="task"
          />
        </template>
        <template v-else>
          <h3>아직 저장된 일정이 없습니다</h3>
        </template>
      </div>
    </main>
    <BottomNavBar />
  </div>
</template>

<script setup lang="ts">
  import MyDailyHeader from '../components/MyDailyHeader.vue'
  import BottomNavBar from '@/shared/components/BottomNavBar.vue'
  import ActivityRing from '@/shared/components/ActivityRing.vue'
  import HouseworkTask from '@/shared/components/HouseworkTask.vue'

  import useMyDaily from '../composables/useMyDaily'
  import { onMounted } from 'vue'

  const {
    myName,
    myWorkoutStat,
    myHousework,
    getMyName,
    getMyWorkoutStat,
    getMyTodayHousework,
  } = useMyDaily()
  onMounted(async () => {
    await getMyName()
    await getMyWorkoutStat()
    await getMyTodayHousework()
  })
</script>

<style scoped>
  div.my-daily-view {
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
