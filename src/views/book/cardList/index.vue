<!-- 卡片列表 -->
<template>
  <!-- 分类 -->
  <div class="tags">
    <div class="tags__list">
      <div
        :class="`tags__list--item ${tagsId === item.id && 'sel'}`"
        v-for="item in tags"
        :key="item.id"
        @click="selTag(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="tags__add" @click="addTag">+</div>
  </div>

  <!-- 内容 -->
  <div class="cardList">
    <div class="cardList__item" v-for="item in cardList" :key="item.id">
      <div class="cardList__item--img">
        <img :src="item.imageEx" :onerror="imgError" />
      </div>
      <div class="cardList__item--title">{{ item.name }}</div>
    </div>
  </div>

  <!-- 添加弹框 -->
  <add-tag-dialog ref="addTagDialog" :categoryList="tags" @saveSuc="getCardList" />
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import AddTagDialog from './addTagDialog/index.vue'
import { Get } from '@/utils/apis.js'
const nodeFilePath = 'http://127.0.0.1:3000'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

$bus.on('initCategorylist', () => {
  getTagsList()
})

// 图片加载有问题
const imgError = computed(() => {
  return `this.src="${new URL('./addTagDialog/none.png', import.meta.url).href}"`
})

// 分类数据
const tags = ref([])

// 当前分类id
const tagsId = ref(0)

// 获取分类
const getTagsList = async () => {
  const res = await Get('/category/list')
  if (res.code === 0) {
    tags.value = res.data
    tagsId.value = tags.value[0].id
    getCardList(tagsId.value)
  }
}

// 选择分类
const selTag = (item) => {
  tagsId.value = item.id
  getCardList()
}

// 卡片列表
const cardList = ref([])
// 获取卡片数据
const getCardList = async () => {
  const res = await Get('/card/list', {
    id: tagsId.value,
  })
  if (res.code === 0) {
    cardList.value = res.data.map((item) => {
      item.imageEx = `${nodeFilePath}${item.image}`
      return item
    })
  }
}


// 添加分类
const addTagDialog = ref(null)
const addTag = () => {
  addTagDialog.value.open()
}


// 页面初始化
getTagsList()
</script>

<style lang='less' scoped>
.tags {
  padding-top: 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;

  &__list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    &--item {
      background: #FFFFFF;
      border: 1px solid #E7E7F2;
      border-radius: 2px;
      padding: 8px 12px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;

      &.sel {
        border-color: #1B16FF;
        background: #EFEFFF;
      }
    }
  }

  &__add {
    width: 34px;
    height: 34px;
    background: #1B16FF;
    border-radius: 2px;
    color: #FFFFFF;
    font-size: 30px;
    line-height: 34px;
    cursor: pointer;
  }
}

.cardList {
  width: 1096px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  &__item {
    padding: 10px;
    background-color: #FFFFFF;
    margin-right: 16px;
    margin-bottom: 16px;

    &--img {
      width: 120px;
      height: 120px;
      line-height: 120px;
      img {
        max-width: 120px;
        max-height: 120px;
      }
    }

    &--title {
      padding-top: 10px;
      text-align: left;
    }
  }
}</style>
