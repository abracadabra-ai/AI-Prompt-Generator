<!-- 分组弹框 -->
<template>
  <!-- 分组弹框 -->
  <el-dialog
    title="新增分组"
    v-model="groupDialogVisible"
    width="400px"
    :before-close="groupHandleClose"
  >
    <el-input class="input" v-model="groupName" placeholder="输入分组名称" />
    <template #footer>
      <el-button class="footerBtn" color="#626aef" :disabled="!groupName" type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'


// 弹框控制
const groupDialogVisible = ref(false)

// 分组名称
const groupName = ref('')

// 添加分组
const openGroup = () => {
  groupDialogVisible.value = true
}

// 关闭分组弹框
const groupHandleClose = () => {
  groupDialogVisible.value = false
  groupName.value = ''
}

// 确定
const submit = () => {
  groupHandleClose()
}

// 暴露方法给父组件
defineExpose({
  openGroup,
})
</script>

<style lang='less' scoped>
.input {
  width: 100%;
  height: 42px;
}
.footerBtn {
  width: 100%;
  height: 42px;
}
</style>
