<!-- 翻译组件 -->
<template>
  <div class="inputList">
    <div class="inputList__q">
      <el-input
        v-model="inputTxt"
        :rows="8"
        type="textarea"
        placeholder="请输入中文"
        :resize="'none'"
        @change="getEN"
      />
    </div>
    <div class="inputList__a">
      <el-input
        v-model="outputTxt"
        :rows="8"
        type="textarea"
        placeholder="英文翻译"
        :resize="'none'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMp3Url } from './youdao.js'

const inputTxt = ref('')
const outputTxt = ref('')

const getEN = async () => {
  outputTxt.value = await getMp3Url(inputTxt.value)
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
  }

  &__a {
    width: 530px;
    height: 163px;
  }
}
</style>
