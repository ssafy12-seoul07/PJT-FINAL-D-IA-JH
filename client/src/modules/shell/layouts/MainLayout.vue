<template>
  <div class="mobile-container">
    <PhoneHeader class="phone-header" />
    <h1>MainLayout</h1>
    <RouterView />
    <BottomNavBar />
  </div>
</template>

<script setup lang="ts">
  import BottomNavBar from '../components/BottomNavBar.vue'
  import PhoneHeader from '../components/PhoneHeader.vue'
</script>

<style scoped>
  .mobile-container {
    /* mobile phone size */
    width: 430px;
    height: 932px;
    background-color: var(--background-color);
    box-shadow: 0px 0px 40px 10px rgba(78, 88, 121, 0.5);
    border-radius: 24px;
  }

  @media (max-width: 430px) {
    .mobile-container {
      /* mobile phone size */
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
    .phone-header {
      display: none;
    }
  }
</style>
