<template>
  <div class="profile-container">
    <Profile :profileImageName="user?.profileImageName" />
    <span>{{ user?.name }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import Profile from './ProfileImg.vue'

  const props = defineProps<{ userId: number }>()

  import { useUserStore } from '@/modules/authentication/store/user'
  import type { familyListInteface } from '@/modules/authentication/interface/UserInfomationInterface'
  const userStore = useUserStore()
  onMounted(async () => {
    await userStore.getFamilyInfo()
  })

  const user = computed(
    () =>
      userStore.familyInfo?.members.find(
        (el: familyListInteface) => el.id === props.userId
      ) || null
  )
</script>

<style scoped>
  div.profile-container {
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      margin-left: 8px;
      text-decoration: none !important;
    }
  }
</style>
