<template>
  <div class="profile-container">
    <Profile :profileImageName="profileImageName" />
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
  import Profile from './ProfileImg.vue'

  defineProps({
    name: {
      type: [String, null],
      default: null,
    },
    profileImageName: {
      type: [String, null],
      default: null,
    },
  })
</script>

<style scoped>
  div.profile-container {
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      margin-left: 8px;
    }
  }
</style>
