<template>
  <nav>
    <BottomNav v-for="menu in menuList" :key="menu.navTo" v-bind="menu" />
  </nav>
</template>

<script setup lang="ts">
  import BottomNav from './BottomNav.vue'
  import { ref } from 'vue'
  import type { BottomNavProps } from '../interface/NavigationInterface'
  import { MENU_LIST } from '@/shared/constants/NavigationConstants';

  const menuList = ref<BottomNavProps[]>(MENU_LIST)
</script>

<style scoped>
  nav {
    display: flex;
    justify-content: space-around;
  }
</style>
