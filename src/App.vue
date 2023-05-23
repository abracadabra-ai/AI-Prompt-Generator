<script setup>
import pageTop from '@/components/pageTop.vue'
</script>

<template>
  <page-top />
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.page {
  padding-top: 200px;
  text-align: center;
}
</style>
