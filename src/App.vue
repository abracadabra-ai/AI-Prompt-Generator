<script setup>
import pageTop from '@/components/pageTop/index.vue'
</script>

<template>
  <page-top />
  <div class="routelist">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.routelist {
  padding-top: 64px;
  text-align: center;
  background-color: #F5F6F7;
  min-height: calc(100vh - 64px);
}
</style>
