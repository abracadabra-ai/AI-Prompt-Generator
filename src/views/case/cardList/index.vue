<!-- 瀑布流列表 -->
<template>
  <div>
    <!-- 导航 -->
    <div class="tags">
      <div class="tags__list">
        <div class="tags__list--item" v-for="item in tags" :key="item.id">
          <img :src="demoIcon" alt="">
          {{ item.text }}
        </div>
      </div>
      <div class="tags__add" @click="addCase">
        <img src="./img/up.png" alt="" />
        上传案例
      </div>
    </div>

    <!-- 瀑布流 -->
    <div class="cardList">
      <div class="cardList__item" v-for="item in cardList" :key="item.id">
        <div class="cardList__item--img"></div>
        <div class="cardList__item--title">{{ item.text }}</div>
        <div class="cardList__item--btnList">
          <div class="btn">
            <img src="./img/edit.png" alt="">
            编辑提示词
          </div>
          <div class="btn">
            <img src="./img/copy.png" alt="">
            复制
          </div>
        </div>
      </div>
    </div>

    <add-case-Dialog ref="addCaseDialog" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AddCaseDialog from './addCaseDialog/index.vue'

const addCaseDialog = ref(null)

const addCase = () => {
  console.log(9999, addCaseDialog)
  addCaseDialog.value.open()
}

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
]
)
const cardList = reactive([
  {
    "id": 1,
    "image": "https://example.com/image1.jpg",
    "text": "这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。这是文案1。"
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
</script>

<style lang='less' scoped>
.tags {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: sticky;
  top: 64px;
  background: #EFEFFF;
  padding: 10px 0 0;

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
    height: 34px;
    background: #1B16FF;
    border-radius: 2px;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 34px;
    cursor: pointer;
    padding: 0 12px;
    img {
      vertical-align: middle;
      height: 18px;
      width: 18px;
    }
  }
}

.cardList {
  width: 100%;
  columns: 4;
  column-gap: 13px;
  margin-top: 20px;

  &__item {
    padding: 10px;
    background-color: #FFFFFF;
    margin-bottom: 16px;
    overflow: auto;

    &--img {
      width: 120px;
      height: 120px;
      background: url('./icon.png');
      background-size: contain;
    }

    &--title {
      padding-top: 10px;
      text-align: left;
    }

    &--btnList {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      .btn {
        background: #F7F8FF;
        padding: 9px 0;
        border-radius: 2px;
        font-size: 14px;
        width: 134px;
        text-align: center;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>