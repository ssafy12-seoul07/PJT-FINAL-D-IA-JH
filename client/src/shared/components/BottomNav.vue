<template>
  <RouterLink :to="navigationMenu.navTo" :style="color">
    <font-awesome-icon :icon="navigationMenu.icon" />
    <span>
      {{ navigationMenu.navName }}
    </span>
    <div :style="barColor" />
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router'
  import { computed } from 'vue'
  import type { BottomNavProps } from '../interface/NavigationInterface.ts'

  const navigationMenu = defineProps<BottomNavProps>()
  const route = useRoute()
  const isActive = computed(() => {
    return route.path.includes(navigationMenu.navTo)
  })

  const color = computed(() => ({
    color: isActive.value ? navigationMenu.activeColor : '#757575',
  }))

  const barColor = computed(() => ({
    'background-color': isActive.value ? navigationMenu.activeColor : 'inherit',
  }))
</script>

<style scoped>
  a {
    text-decoration: none;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
      background-color: white;
      transition: 0.1s ease-in-out;
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
    }

    svg {
      font-size: 24px;
      margin-bottom: 4px;
    }

    span {
      white-space: nowrap;
      font-size: 12px;
    }

    > div {
      position: absolute;
      width: inherit;
      height: 4px;
      left: 0;
      top: 0;
    }
  }
</style>
