<!-- 魔法书 -->
<template>
  <div class="box">
    <translation />
    <card-list />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import translation from './translation/index.vue'
import cardList from './cardList/index.vue'

</script>

<style lang='less' scoped>
.box {
  width: 1080px;
  margin: 40px auto 0;
}

</style>
