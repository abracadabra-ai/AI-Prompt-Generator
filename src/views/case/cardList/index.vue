<!-- 瀑布流列表 -->
<template>
  <div>
    <!-- 导航 -->
    <div class="type">
      <div class="type__list">
        <div :class="`type__list--item ${typeId === 0 && 'sel'}`" @click="selType(0)">
          <img src="@/assets/img/case/all.png" v-show="typeId !== 0" alt="">
          <img src="@/assets/img/case/all_sel.png" v-show="typeId === 0" alt="">
          全部
        </div>
        <div :class="`type__list--item ${typeId === item.id && 'sel'}`" @click="selType(item.id)" v-for="item in type" :key="item.id">
          {{ item.name }}
        </div>
      </div>
      <div class="type__add" @click="addCase">
        <img src="@/assets/img/case/up.png" alt="" />
        上传案例
      </div>
    </div>

    <!-- 瀑布流 -->
    <div class="cardList" v-if="caseList.length">
      <div class="cardList__item" v-for="item in caseList" :key="item.id">
        <div class="cardList__item--img">
          <img :src="item.imageEx" :onerror="imgError" />
        </div>
        <div class="cardList__item--title">{{ item.name }}</div>
        <div class="cardList__item--btnList">
          <div class="btn" @click="edit(item)">
            <img src="@/assets/img/case/edit.png" alt="">
            编辑提示词
          </div>
          <div class="btn" @click="copyName(item)">
            <img src="@/assets/img/case/copy.png" alt="">
            复制
          </div>
        </div>
      </div>
    </div>
    <div class="noneTips" v-else>
      当前分组未上传案例
    </div>

    <add-case-Dialog ref="addCaseDialog" :typeList="type" @saveSuc="getCaseList" />
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import AddCaseDialog from './addCaseDialog/index.vue'
import { Get } from '@/utils/apis.js'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'

// 复制
const { copy } = useClipboard()

// 服务器静态资源目录
const nodeFilePath = import.meta.env.VITE_NODE_PUBLIC_PATH
const addCaseDialog = ref(null)

console.log(999, import.meta.env, import.meta.env.VITE_NODE_PUBLIC_PATH)
const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

// 分组刷新
$bus.on('initTypelist', () => {
  getTypeList()
})

const addCase = () => {
  addCaseDialog.value.open()
}

// 图片加载有问题
const imgError = computed(() => {
  return `this.src="${new URL('@/assets/img/case/none.png', import.meta.url).href}"`
})

// 分类数据
const type = ref([])

// 当前分类id
const typeId = ref(0)

// 获取分类
const getTypeList = async () => {
  const res = await Get('/type/list')
  if (res.code === 0) {
    type.value = res.data
    getCaseList()
  }
}

// 选择分类
const selType = (id) => {
  typeId.value = id
  getCaseList()
}

// 案例列表
const caseList = ref([])

// 获取案例数据
const getCaseList = async () => {
  const res = await Get('/case/list', {
    id: typeId.value,
  })
  if (res.code === 0) {
    caseList.value = res.data.map((item) => {
      item.imageEx = `${nodeFilePath}${item.image}`
      return item
    })
    console.log('案例列表', caseList.value)
  }
}

// 编辑卡片提示词
const edit = async (item) => {
  addCaseDialog.value.open(item)
}

// 复杂功能
const copyName = (item) => {
  copy(item.name)
  ElMessage({
    type: 'success',
    message: '复制成功'
  })
}

getTypeList()
</script>

<style lang='less' scoped>
.type {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: sticky;
  top: 64px;
  background: #F5F6F7;
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

      &.sel {
        border-color: #1B16FF;
        background: #EFEFFF;
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
      width: 100%;
      img {
        width: 100%;
      }
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
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
    }
  }
}
.noneTips {
  text-align: center;
  width: 100%;
  margin-top: 30vh;
  font-size: 28px;
}
</style>