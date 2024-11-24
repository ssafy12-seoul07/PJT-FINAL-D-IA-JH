<template>
  <div class="mobile-container">
    <PhoneHeader class="phone-header" />
    <RouterView />
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
    position: relative;
  }

  @media (max-width: 430px) {
    .mobile-container {
      /* mobile phone size */
      width: 100vw;
      min-width: 360px;
      height: 100vh;
      border-radius: 0;
      box-shadow: none;
    }
    .phone-header {
      display: none;
    }
  }
</style>
