<!-- 卡片列表 -->
<template>
  <!-- 分类 -->
  <div class="tags">
    <div class="tags__list">
      <div class="tags__list--item" v-for="item in tags" :key="item.id">
        <img :src="demoIcon" alt="">
        {{ item.text }}
      </div>
    </div>
    <div class="tags__add" @click="addTag">+</div>
  </div>

  <!-- 内容 -->
  <div class="cardList">
    <div class="cardList__item" v-for="item in cardList" :key="item.id">
      <div class="cardList__item--img"></div>
      <div class="cardList__item--title">{{ item.text }}</div>
    </div>
    <div class="cardList__item" v-for="item in cardList" :key="item.id">
      <div class="cardList__item--img"></div>
      <div class="cardList__item--title">{{ item.text }}</div>
    </div>
  </div>

  <!-- 添加弹框 -->
  <add-tag-dialog ref="addTagDialog" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import AddTagDialog from './addTagDialog/index.vue'


const demoIcon = ref(new URL('./icon.png', import.meta.url).href)

const tags = reactive([
  {
    "id": 1,
    "image": "https://example.com/image1.jpg",
    "text": "这是文案1。"
  },
  {
    "id": 2,
    "image": "https://example.com/image2.jpg",
    "text": "这是文案2。"
  },
  {
    "id": 3,
    "image": "https://example.com/image3.jpg",
    "text": "这是文案3。"
  },
  {
    "id": 4,
    "image": "https://example.com/image4.jpg",
    "text": "这是文案4。"
  },
  {
    "id": 5,
    "image": "https://example.com/image5.jpg",
    "text": "这是文案5。"
  },
  {
    "id": 6,
    "image": "https://example.com/image6.jpg",
    "text": "这是文案6。"
  },
  {
    "id": 7,
    "image": "https://example.com/image7.jpg",
    "text": "这是文案7。"
  },
  {
    "id": 8,
    "image": "https://example.com/image8.jpg",
    "text": "这是文案8。"
  },
  {
    "id": 9,
    "image": "https://example.com/image9.jpg",
    "text": "这是文案9。"
  },
  {
    "id": 10,
    "image": "https://example.com/image10.jpg",
    "text": "这是文案10。"
  }
]
)
const cardList = reactive([
  {
    "id": 1,
    "image": "https://example.com/image1.jpg",
    "text": "这是文案1。"
  },
  {
    "id": 2,
    "image": "https://example.com/image2.jpg",
    "text": "这是文案2。"
  },
  {
    "id": 3,
    "image": "https://example.com/image3.jpg",
    "text": "这是文案3。"
  },
  {
    "id": 4,
    "image": "https://example.com/image4.jpg",
    "text": "这是文案4。"
  },
  {
    "id": 5,
    "image": "https://example.com/image5.jpg",
    "text": "这是文案5。"
  },
  {
    "id": 6,
    "image": "https://example.com/image6.jpg",
    "text": "这是文案6。"
  },
  {
    "id": 7,
    "image": "https://example.com/image7.jpg",
    "text": "这是文案7。"
  },
  {
    "id": 8,
    "image": "https://example.com/image8.jpg",
    "text": "这是文案8。"
  },
  {
    "id": 9,
    "image": "https://example.com/image9.jpg",
    "text": "这是文案9。"
  },
  {
    "id": 10,
    "image": "https://example.com/image10.jpg",
    "text": "这是文案10。"
  }
]
)

// 添加分类
const addTagDialog = ref(null)
const addTag = () => {
  addTagDialog.value.open()
}
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
      img {
        vertical-align: middle;
        height: 18px;
        width: 18px;
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
      background: url('./icon.png');
      background-size: contain;
    }
    &--title {
      padding-top: 10px;
    }
  }
}
</style>
