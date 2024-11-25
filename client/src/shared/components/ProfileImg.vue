<template>
  <img
    v-if="profileImageName"
    :src="`/src/assets/images/${profileImageName}`"
  />
  <img v-else src="/src/assets/images/defaultImg.jpg" />
</template>

<script setup lang="ts">
  defineProps<{
    profileImageName?: string | null
  }>()
</script>

<style scoped>
  img {
    box-shadow: 0px 0px 4px 0px gray;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
</style>
