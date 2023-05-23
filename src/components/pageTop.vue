<!-- 页面顶部导航 -->
<template>
  <div class="pageTop">
    <div class="logo"></div>
    <div class="list">
      <div
        class="list__item"
        v-for="item in routerList"
        :key="item.id"
        @click="toPage(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const routerList = reactive([
  {
    id: 0,
    name: '魔法书',
    to: '/book',
  },
  {
    id: 0,
    name: '案例展示',
    to: '/case',
  },
])

// 跳转页面
const toPage = (item) => {
  console.log(item)
  router.push({
    path: item.to,
  })
}
</script>

<style lang='less' scoped>
.pageTop {
  height: 100px;
  display: flex;
  line-height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .logo {
    background-color: red;
    width: 200px;
    height: 100%;
  }

  .list {
    display: flex;
    &__item {
      padding: 0 40px;
      cursor: pointer;
    }
  }
}
</style>
