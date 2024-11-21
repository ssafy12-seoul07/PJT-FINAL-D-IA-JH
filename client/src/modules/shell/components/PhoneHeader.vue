<template>
  <div>
    <div>
      <span>{{ hours }}:{{ formattedMinutes }}</span>
      <font-awesome-icon icon="comment-dots" />
    </div>
    <div>
      <font-awesome-icon icon="fa-brands fa-bluetooth-b" />
      <font-awesome-icon icon="wifi" />
      <font-awesome-icon icon="battery-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue'

  const hours = ref(new Date().getHours())
  const minutes = ref(new Date().getMinutes())
  const formattedMinutes = computed(() => {
    return minutes.value.toString().padStart(2, '0')
  })

  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    timer = setInterval(() => {
      const now = new Date()
      hours.value = now.getHours()
      minutes.value = now.getMinutes()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
</script>

<style scoped>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    height: 48px;
    svg {
      margin-left: 8px;
    }
  }
</style>
