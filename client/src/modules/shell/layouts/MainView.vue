<template>
  <div class="mobile-container">
    <PhoneHeader class="phone-header" />
    <RouterView />
    <div class="router-view"></div>
  </div>
</template>

<script setup lang="ts">
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
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 430px) {
    .mobile-container {
      /* mobile phone size */
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      box-shadow: none;
    }
    .phone-header {
      display: none;
    }
  }
</style>
