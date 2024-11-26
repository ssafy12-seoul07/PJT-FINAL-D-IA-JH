<template>
  <div>
    <BaseHeader>
      <template #left>
        <HeaderActionButton
          icon="chevron-left"
          action="back"
          @on-click="handleAction"
        />
        <HeaderTitle title="설정" />
      </template>
    </BaseHeader>
    <main>
      <li class="setting-list" @click="handleLogout">
        <span>로그아웃</span>
        <font-awesome-icon icon="chevron-right" />
      </li>
    </main>
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import HeaderActionButton from '@/shared/components/HeaderActionButton.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/modules/authentication/store/auth'
  const { deleteAccessToken } = useAuthStore()
  import { useMyDailyStore } from '@/modules/my-daily/store/my-daily'
  import { useFamilyDailyStore } from '@/modules/family-daily/store/family-daily'
  import { useHouseworkStore } from '@/modules/housework-calendar/store/houseworks'
  import { useUserStore } from '@/modules/authentication/store/user'

  const { resetFamilyWorkoutStat } = useFamilyDailyStore()
  const { resetHousework } = useHouseworkStore()
  const { resetMyDaily } = useMyDailyStore()
  const { resetUserStore } = useUserStore()

  const router = useRouter()
  const handleAction = (action: string) => {
    switch (action) {
      case 'back':
        router.back()
        break
    }
  }

  const handleLogout = () => {
    deleteAccessToken()
    resetFamilyWorkoutStat()
    resetHousework()
    resetMyDaily()
    resetUserStore()
    router.push({ name: 'Login' })
  }
</script>

<style scoped>
  main {
    li {
      list-style: none;
      padding: 16px 32px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
