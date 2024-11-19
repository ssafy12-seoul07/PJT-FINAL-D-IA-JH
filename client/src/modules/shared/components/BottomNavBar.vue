<template>
  <nav>
    <BottomNav v-for="menu in menuList" :key="menu.navTo" v-bind="menu" />
  </nav>
</template>

<script setup lang="ts">
import BottomNav from './BottomNav.vue';
import { ref } from 'vue'
import type { BottomNavProps } from '../interface/navigation';
import { MENU_LIST } from '../constants/navigation';

const menuList = ref<BottomNavProps[]>(MENU_LIST)
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
}
</style>
