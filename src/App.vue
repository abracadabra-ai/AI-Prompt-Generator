<script setup>
import pageTop from '@/components/pageTop/index.vue'
</script>

<template>
  <page-top />
  <div class="routelist">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style>
body {
  background-color: #F5F6F7;
}
</style>
<style scoped>
.routelist {
  padding-top: 64px;
  text-align: center;
  min-height: calc(100vh - 64px);
}
</style>
