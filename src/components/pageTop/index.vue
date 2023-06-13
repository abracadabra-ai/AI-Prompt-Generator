<!-- 页面顶部导航 -->
<template>
  <div class="pageTop">
    <div class="logo">
      <img src="@/assets/img/pageTop/logo.png" alt="">
    </div>
    <div class="list">
      <div
        :class="`list__item ${selId === item.id && 'sel'}`"
        v-for="item in routerList"
        :key="item.id"
        @click="toPage(item)"
      >
        <img class="list__item--logo" v-show="selId !== item.id" :src="item.icon" alt="">
        <img class="list__item--logo" v-show="selId === item.id"  :src="item.iconSel" alt="">
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <el-dropdown :max-height="340" trigger="click">
        <img class="right__menu" src="@/assets/img/pageTop/menu.png" alt="">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in menuList"
              :key="item.id"
              @click="toPage(item)"
              class="dropdown"
            >
              <img :src="item.icon" alt="">
              <span>{{ item.name }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const routerList = reactive([
  {
    id: 0,
    name: '魔法书',
    to: '/book',
    icon: new URL('@/assets/img/pageTop/book.png', import.meta.url).href,
    iconSel: new URL('@/assets/img/pageTop/book_sel.png', import.meta.url).href,
  },
  {
    id: 1,
    name: '案例展示',
    to: '/case',
    icon: new URL('@/assets/img/pageTop/case.png', import.meta.url).href,
    iconSel: new URL('@/assets/img/pageTop/case_sel.png', import.meta.url).href,
  },
])

// 编辑导航
const menuList = reactive([
  {
    id: 1,
    name: '魔法书管理',
    icon: new URL('@/assets/img/pageTop/book_icon.png', import.meta.url).href,
    to: '/edit',
    query: {
      type: 'book'
    }
  },
  {
    id: 2,
    name: '案例管理',
    icon: new URL('@/assets/img/pageTop/case_icon.png', import.meta.url).href,
    to: '/edit',
    query: {
      type: 'case'
    }
  },
])

// 跳转页面
const toPage = (item) => {
  router.push({
    path: item.to,
    query: item.query
  })
}

// 当前路由id
const selId = computed(() => {
  // 当前选中路由
  let id = 0
  if (route.path === '/') {
    id = routerList.filter((item) => item.to === '/book')[0]?.id
  } else if (route.query?.type) {
    id = routerList.filter((item) => item.to.includes(route.query?.type))[0]?.id
  } else {
    id = routerList.filter((item) => item.to === route.path)[0]?.id
  }
  return id
})

</script>

<style lang='less' scoped>
.pageTop {
  height: 64px;
  display: flex;
  line-height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  min-width: 1080px;
  background-color: #fff;
  overflow: hidden;
  z-index: 999;
  .logo {
    height: 44px;
    margin-left: 20px;
    margin-right: 40px;
    img {
      width: 160px;
      height: 44px;
    }
  }

  .list {
    display: flex;
    flex: 1;
    &__item {
      // padding: 0 30px;
      margin-right: 60px;
      cursor: pointer;
      font-family: 'Source Han Sans SC';
      &.sel {
        position: relative;
        &:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -24px;
          content: '';
          height: 3px;
          width: 48px;
          display: block;
          background-color: #1B16FF;
          border-radius: 3px;
        }
      }

      &--logo {
        width: 20px;
        height: 20px;
        vertical-align: sub;
        margin-right: 4px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    padding-right: 14px;
    &__menu {
      width: 32px;
      height: 32px;
    }
  }
}
.dropdown {
  span {
    color: #000;
    font-size: 14px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
