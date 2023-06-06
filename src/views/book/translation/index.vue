<!-- 翻译组件 -->
<template>
  <div class="inputList">
    <div class="inputList__q">
      <el-input
        v-model="inputTxt"
        :rows="6"
        type="textarea"
        placeholder="请输入中文"
        :resize="'none'"
        @change="getEN"
        class="inputList__q--txt"
        ref="inputTxtRef"
      />
      <div class="inputList__q--x" v-show="inputTxt" @click="clearInput"></div>
    </div>
    <div class="inputList__a">
      <el-input
        v-model="outputTxt"
        :rows="6"
        type="textarea"
        placeholder="英文翻译"
        :resize="'none'"
      />
      <div class="inputList__a--copy" v-show="outputTxt" @click="copyOutput">复制</div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { getMp3Url } from './youdao.js'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

$bus.on('selCard', (item) => {
  inputTxt.value += `${item.name},`
})

// 复制
const { copy } = useClipboard()
const inputTxt = ref('')
const outputTxt = ref('')

const getEN = async () => {
  outputTxt.value = await getMp3Url(inputTxt.value)
}


const inputTxtRef = ref(null)
// 清空
const clearInput = () => {
  inputTxtRef.value.clear()
}

// 复制
const copyOutput = () => {
  copy(outputTxt.value)
  ElMessage({
    type: 'success',
    message: '复制成功'
  })
}

</script>

<style lang='less' scoped>
.inputList {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__q {
    width: 530px;
    height: 163px;
    position: relative;
    &--x {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 36px;
      height: 25px;
      width: 25px;
      background: url(@/assets/img/book/close.png);
      background-size: 100% 100%;
    }
    &:deep(.el-textarea__inner) {
      padding: 20px 45px 20px 20px;
    }
  }

  &__a {
    width: 530px;
    height: 163px;
    position: relative;
    &:deep(.el-textarea__inner) {
      padding: 20px;
    }
    &--copy {
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 14px;
      width: 50px;
      height: 36px;
      line-height: 36px;
      background-image: url(@/assets/img/case/copy.png);
      background-color: #F7F8FF;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: 10px 10px;
      padding-left: 24px;
      border-radius: 2px;
    }
  }
}
</style>
