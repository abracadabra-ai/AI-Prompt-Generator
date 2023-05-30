<!-- 案例展示 -->
<template>
  <div class="box">
    <card-list />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import cardList from './cardList/index.vue'

</script>

<style lang='less' scoped>
.box {
  width: 1280px;
  margin: 20px auto 0;
}
</style>
