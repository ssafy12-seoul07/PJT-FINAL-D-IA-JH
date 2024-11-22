<template>
  <div class="family-daily-view">
    <BaseHeader>
      <template #left>
        <HeaderActionButton icon="people-roof" />
        <HeaderTitle title="가족의 하루" />
      </template>
      <template #right>
        <HeaderActionButton
          icon="gear"
          action="setting"
          @on-click="handleAction"
        />
      </template>
    </BaseHeader>
    <main>
      <div class="main-container">
        <h3>{{ formattedDate }}</h3>
        <ActivityRing />
        <ActivityRing />
        <ActivityRing />
        <ActivityRing />
        <ActivityRing />
        <ActivityRing />
        <ActivityRing />
      </div>
    </main>
    <BottomNavBar />
  </div>
</template>

<script setup lang="ts">
  import ActivityRing from '@/shared/components/ActivityRing.vue'
  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import BottomNavBar from '@/shared/components/BottomNavBar.vue'
  import HeaderActionButton from '@/shared/components/HeaderActionButton.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const handleAction = (action: string) => {
    switch (action) {
      case 'back':
        router.back()
        break
      case 'setting':
        router.push({ name: 'Setting' })
    }
  }

  const today = new Date()
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${getDayKorean(today.getDay())}) 오늘`

  function getDayKorean(day: number) {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[day]
  }
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
